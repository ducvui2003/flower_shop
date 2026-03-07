import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { cn } from "@/lib/utils";
import CodeTool from "@editorjs/code";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface Props {
  value?: OutputData;
  onChange?: (data: OutputData) => void;
  className?: string;
}

const Editor = ({ value, onChange, className }: Props) => {
  const editorRef = useRef<EditorJS | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (editorRef.current || isReadyRef.current) return;

    isReadyRef.current = true;
    const editor = new EditorJS({
      holder: "editorjs",
      data: value,
      autofocus: true,
      tools: {
        list: { class: List, inlineToolbar: true },
        quote: { class: Quote, inlineToolbar: true },
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                try {
                  const presignRes = await httpService.post<
                    ResponseApi<{ url: string; key: string }>,
                    { key: string }
                  >("/media/sign-url", { key: file.name });

                  const { url, key } = presignRes.data.data;
                  const uploadRes = await httpService.manual().put(url, file, {
                    headers: {},
                    withCredentials: false,
                  });

                  if (uploadRes.status !== 200 && uploadRes.status !== 204) {
                    throw new Error(`Upload failed: ${uploadRes.status}`);
                  }

                  const response = await httpService.post<
                    ResponseApi<{ url: string }>,
                    { key: string; metadata: object }
                  >("/media", {
                    key: key,
                    metadata: { place: "description" },
                  });

                  toast.success("Upload success", {
                    description: presignRes.data.data.key,
                  });

                  return { success: 1, file: { url: response.data.data.url } };
                } catch (error) {
                  return {
                    success: 0,
                    message:
                      error instanceof Error ? error.message : "Upload failed",
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
        if (!editorRef.current) return;
        const data = await api.saver.save();
        onChange?.(data);
      },
    });

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
      }
      editorRef.current = null;
      isReadyRef.current = false;
    };
  }, []); // Keep empty - initialization only

  useEffect(() => {
    if (!editorRef.current || !value) return;

    const updateContent = async () => {
      const currentData = await editorRef.current!.save();
      if (JSON.stringify(currentData) !== JSON.stringify(value)) {
        await editorRef.current!.render(value);
      }
    };

    updateContent();
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
