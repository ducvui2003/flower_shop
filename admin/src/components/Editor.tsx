import { cn } from "@/lib/utils";
import CodeTool from "@editorjs/code";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";

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
        // image: {
        //   class: ImageTool,
        //   config: {
        //     uploader: {
        //       /**
        //        * Upload file to the server and return an uploaded image data
        //        * @param {File} file - file selected from the device or pasted by drag-n-drop
        //        * @return {Promise.<{success, file: {url}}>}
        //        */
        //       uploadByFile(file: File) {
        //         return MyAjax.upload(file).then(() => {
        //           return {
        //             success: 1,
        //             file: {
        //               url: "https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg",
        //               // any other image data you want to store, such as width, height, color, extension, etc
        //             },
        //           };
        //         });
        //       },
        //     },
        //   },
        // },
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
