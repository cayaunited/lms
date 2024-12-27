'use client';

import { useEffect } from 'react';
import { rem } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { createLowlight } from 'lowlight';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import js from 'highlight.js/lib/languages/javascript';

const lowlight = createLowlight();
lowlight.register({ c, cpp, python, java, js });

export default function RichViewer({ content = '', plainText = false }:{ content?: any, plainText?: boolean }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'c' }),
      Image,
      Link.configure({ openOnClick: false }),
      Subscript,
      Superscript,
      Table.configure({ resizable: true, }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Youtube.configure({ modestBranding: true, nocookie: true }),
    ],
    editable: false,
    content,
    immediatelyRender: false,
  });
  
  useEffect(() => {
    if (!plainText || !editor) return;
    let newContent = editor.getText();
    newContent = newContent.slice(0, 300) + (newContent.length > 300 ? '...' : '');
    editor.commands.setContent(newContent);
  }, [editor]);
  
  return (<>
    <RichTextEditor
      editor={editor}
      style={{ borderWidth: 0 }}
      m={rem(-16)}
    >
      <RichTextEditor.Content bg="transparent" />
    </RichTextEditor>
  </>);
}
