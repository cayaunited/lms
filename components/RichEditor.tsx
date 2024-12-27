'use client';

import { useEffect, useState } from 'react';
import { Button, Group, Menu, Modal, rem, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
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
import { IconArrowMerge, IconArrowsSplit, IconBrandYoutube, IconColumnInsertLeft, IconColumnInsertRight, IconColumnRemove, IconPhoto, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconTable, IconTableColumn, IconTablePlus, IconTableRow } from '@tabler/icons-react';
import { createLowlight } from 'lowlight';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import js from 'highlight.js/lib/languages/javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import useDyslexic from '@/lib/useDyslexic';
import { useForm } from '@mantine/form';

const lowlight = createLowlight();
lowlight.register({ c, cpp, python, java, js });

export default function RichEditor({ setEditor, characterLimit, defaultContent = '', showControls = true, autoFocus = false }:
  { setEditor: Function, characterLimit: number, defaultContent?: any, showControls?: boolean, autoFocus?: boolean }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({ limit: characterLimit }),
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
    editable: showControls,
    content: defaultContent,
    immediatelyRender: false,
    autofocus: autoFocus ? 'start' : undefined,
  });
  
  useEffect(() => {
    setEditor(editor);
  }, [editor]);
  
  const { headerFont } = useDyslexic();
  const metCharacterLimit = editor?.storage.characterCount.characters() === characterLimit;
  const [imageOpened, { toggle: toggleImage, close: closeImage }] = useDisclosure(false);
  const [youtubeOpened, { toggle: toggleYouTube, close: closeYouTube }] = useDisclosure(false);
  
  const imageForm = useForm({
    mode: 'controlled',
    initialValues: { src: '', alt: '' },
    validate: {
      src: (value) => (/^https\:\/\//.test(value) ? null : 'Must be https')
        || (/\.(png|jpg|jpeg|gif)$/.test(value) ? null : 'Must be png, jpg, jpeg, or gif'),
    },
  });
  
  const youtubeForm = useForm({
    mode: 'controlled',
    initialValues: { src: '' },
    validate: {
      src: (value) => (/^https\:\/\/www\.youtube\.com\/watch/.test(value) ? null : 'Must start with https://www.youtube.com/watch'),
    },
  });
  
  const insertImage = () => {
    const invalid = imageForm.validate().hasErrors;
    if (invalid) return;
    const { src, alt } = imageForm.getValues();
    editor?.commands.setImage({ src, alt });
    closeImage();
  };
  
  const insertYouTube = () => {
    const invalid = youtubeForm.validate().hasErrors;
    if (invalid) return;
    const { src } = youtubeForm.getValues();
    editor?.commands.setYoutubeVideo({ src });
    closeYouTube();
  };
  
  return (<>
    <RichTextEditor
      editor={editor}
      style={{ borderWidth: rem(4), borderColor: metCharacterLimit ? 'var(--mantine-color-orange-outline)' : undefined }}
    >
      {
        showControls && <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
        >
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold w={32} h={32} />
            <RichTextEditor.Italic w={32} h={32} />
            <RichTextEditor.Underline w={32} h={32} />
            <RichTextEditor.Strikethrough w={32} h={32} />
            <RichTextEditor.CodeBlock w={32} h={32} />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H2 w={32} h={32} />
            <RichTextEditor.H3 w={32} h={32} />
            <RichTextEditor.H4 w={32} h={32} />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Hr w={32} h={32} />
            <RichTextEditor.BulletList w={32} h={32} />
            <RichTextEditor.OrderedList w={32} h={32} />
            <RichTextEditor.Subscript w={32} h={32} />
            <RichTextEditor.Superscript w={32} h={32} />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft w={32} h={32} />
            <RichTextEditor.AlignCenter w={32} h={32} />
            <RichTextEditor.AlignRight w={32} h={32} />
            <RichTextEditor.AlignJustify w={32} h={32} />
          </RichTextEditor.ControlsGroup>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link w={32} h={32} />
            <RichTextEditor.Unlink w={32} h={32} />
            <RichTextEditor.Control
              title="Insert image"
              aria-label="Insert image"
              w={32}
              h={32}
              onClick={toggleImage}
            >
              <IconPhoto stroke={1.5} size="1rem" />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              title="Insert YouTube video"
              aria-label="Insert YouTube video"
              w={32}
              h={32}
              onClick={toggleYouTube}
            >
              <IconBrandYoutube stroke={1.5} size="1rem" />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
          
          <Menu>
            <Menu.Target>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control
                  title="Table controls"
                  aria-label="Table controls"
                  w={32}
                  h={32}
                >
                  <IconTable stroke={1.5} size="1rem" />
                </RichTextEditor.Control>
              </RichTextEditor.ControlsGroup>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Table Controls</Menu.Label>
              <Menu.Item
                leftSection={<IconTablePlus style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              >
                Insert table
              </Menu.Item>
              <Menu.Item
                leftSection={<IconColumnInsertLeft style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().addColumnBefore().run()}
              >
                Insert column before
              </Menu.Item>
              <Menu.Item
                leftSection={<IconColumnInsertRight style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                Insert column after
              </Menu.Item>
              <Menu.Item
                leftSection={<IconColumnRemove style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                Delete column
              </Menu.Item>
              <Menu.Item
                leftSection={<IconRowInsertTop style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().addRowBefore().run()}
              >
                Insert row before
              </Menu.Item>
              <Menu.Item
                leftSection={<IconRowInsertBottom style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                Insert row after
              </Menu.Item>
              <Menu.Item
                leftSection={<IconRowRemove style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                Delete row
              </Menu.Item>
              <Menu.Item
                leftSection={<IconArrowMerge style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().mergeCells().run()}
              >
                Merge cells
              </Menu.Item>
              <Menu.Item
                leftSection={<IconArrowsSplit style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().splitCell().run()}
              >
                Split cells
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTableColumn style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
              >
                Toggle header column
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTableRow style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
              >
                Toggle header row
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo w={32} h={32} />
            <RichTextEditor.Redo w={32} h={32} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
      }
      
      <RichTextEditor.Content />
    </RichTextEditor>
    
    <Text
      display={metCharacterLimit ? 'block' : 'none'}
      c="orange"
      size="calc(var(--mantine-font-size-md) - calc(0.125rem * var(--mantine-scale)))"
      mt={rem(4)}
    >{characterLimit} / {characterLimit} characters</Text>
    
    <Modal
      opened={imageOpened}
      onClose={closeImage}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >insert an image</Text>
      }
      size="xl"
    >
      <TextInput
        key={imageForm.key('src')}
        {...imageForm.getInputProps('src')}
        label="src"
        data-autofocus
      />
      <TextInput
        key={imageForm.key('alt')}
        {...imageForm.getInputProps('alt')}
        label="alt"
        mt="md"
      />
      <Group
        mt="md"
        justify="space-between"
      >
        <Button
          color="blue"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faXmark} />}
          onClick={closeImage}
        >cancel</Button>
        <Button
          leftSection={<FontAwesomeIcon icon={faImage} />}
          onClick={insertImage}
        >insert</Button>
      </Group>
    </Modal>
    
    <Modal
      opened={youtubeOpened}
      onClose={closeYouTube}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >insert a YouTube video</Text>
      }
      size="xl"
    >
      <TextInput
        key={youtubeForm.key('src')}
        {...youtubeForm.getInputProps('src')}
        label="src"
        data-autofocus
      />
      <Group
        mt="md"
        justify="space-between"
      >
        <Button
          color="blue"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faXmark} />}
          onClick={closeYouTube}
        >cancel</Button>
        <Button
          leftSection={<FontAwesomeIcon icon={faYoutube} />}
          onClick={insertYouTube}
        >insert</Button>
      </Group>
    </Modal>
  </>);
}
