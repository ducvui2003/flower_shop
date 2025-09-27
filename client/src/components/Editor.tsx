'use client';
import { cn } from '@/lib/utils';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

import { forwardRef, useEffect } from 'react';

type EditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  classNameContainer?: string;
};

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ value = '', onChange, classNameContainer, ...props }, ref) => {
    const { quill, quillRef } = useQuill();

    useEffect(() => {
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(value);
        quill.on('text-change', () => {
          onChange?.(quill.root.innerHTML);
        });
      }
    }, [quill]);

    return (
      <div className={cn('overflow-y-auto', classNameContainer)}>
        <div ref={quillRef} {...props} />
      </div>
    );
  },
);

export default Editor;
