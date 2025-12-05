import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ReactNode } from "react";

type EditorProps = {
  className?: string;
  source: string;
  label: ReactNode;
  resource?: string;
};

const Editor = () => {
  return <SimpleEditor />;
};

export default Editor;
