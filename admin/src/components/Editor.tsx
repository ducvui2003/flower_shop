import { FormControl, FormField, FormLabel } from "@/components/admin";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { FieldTitle, useInput } from "ra-core";
import { ReactNode } from "react";

type EditorProps = {
  className?: string;
  source: string;
  label: ReactNode;
  resource?: string;
};

const Editor = ({ className, source, label, resource }: EditorProps) => {
  const { id, field } = useInput({
    source: source,
  });
  return (
    <div className="tiptap-editor">
      <FormField id={id} className={className} name={field.name}>
        {label !== false && (
          <FormLabel>
            <FieldTitle label={label} source={source} resource={resource} />
          </FormLabel>
        )}
        <FormControl>
          <SimpleEditor />
        </FormControl>
      </FormField>
    </div>
  );
};

export default Editor;
