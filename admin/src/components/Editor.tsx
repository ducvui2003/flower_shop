import CodeTool from "@editorjs/code";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";

interface Props {
  value?: OutputData;
  onChange?: (data: OutputData) => void;
}

const Editor = ({ value, onChange }: Props) => {
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
      <div id="editorjs" className="max-h-[200px] overflow-y-auto"></div>
    </div>
  );
};

export default Editor;
