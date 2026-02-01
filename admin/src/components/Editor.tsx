import { cn } from "@/lib/utils";
import CodeTool from "@editorjs/code";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface Props {
  value?: OutputData;
  onChange?: (data: OutputData) => void;
  className?: string;
}

const Editor = ({ value, onChange, className }: Props) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (editorRef.current) return;
    const editor = new EditorJS({
      holder: "editorjs",
      data: value,
      autofocus: true,
      tools: {
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              async uploadByFile(file: File) {
                try {
                  // 1️⃣ Get presigned URL
                  const presignRes = await httpService.post<
                    ResponseApi<{ url: string; key: string }>,
                    {
                      key: string;
                    }
                  >("/media/sign-url", {
                    key: file.name,
                  });

                  const { url, key } = presignRes.data.data;

                  // 2️⃣ Upload to R2
                  const uploadRes = await httpService.manual().put(url, file, {
                    headers: {},
                    withCredentials: false,
                  });

                  if (uploadRes.status !== 200 && uploadRes.status !== 204) {
                    throw new Error(
                      "Upload CloudFlare failed with status " +
                        uploadRes.status,
                    );
                  }

                  // 3️⃣ Notify backend
                  const response = await httpService.post<
                    ResponseApi<{ url: string }>,
                    {
                      key: string;
                      metadata: object;
                    }
                  >("/media", {
                    key: key,
                    metadata: {
                      place: "description",
                    },
                  });
                  toast.success("Upload file success", {
                    description: presignRes.data.data.key,
                  });
                  return {
                    success: 1,
                    file: { url: response.data.data.url },
                  };
                } catch (error) {
                  if (isAxiosError(error)) {
                    return {
                      success: 0,
                      message: error.message,
                    };
                  }
                  return {
                    success: 0,
                    message:
                      error instanceof Error
                        ? error.message
                        : "Image upload failed",
                  };
                }
              },
            },
          },
        },
      },
      onReady: () => {
        editorRef.current = editor;
      },
      async onChange(api) {
        const data = await api.saver.save();
        onChange?.(data); // JSON output
      },
    });

    return () => {
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !value) return;
    editorRef.current.render(value);
  }, [value]);

  return (
    <div className="border-2 rounded-xl p-2">
      <div
        id="editorjs"
        className={cn("max-h-[200px] overflow-y-auto", className)}
      ></div>
    </div>
  );
};

export default Editor;
