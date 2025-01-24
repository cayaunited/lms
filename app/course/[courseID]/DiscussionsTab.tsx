'use client';

import { useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  em,
  Grid,
  Group,
  MultiSelect,
  Paper,
  rem,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCloudArrowDown, faComment, faEye, faPencil, faPlus, faReply, faSearch, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import discussionTypes from '@/lib/discussionTypes';
import { formatDate, formatDateWithTime } from '@/lib/formatDate';
import RichEditor from '@/components/RichEditor';
import discussionValidation from '@/lib/validation/discussion';
import RichViewer from '@/components/RichViewer';

export default function DiscussionsTab() {
  const discussions = [
    {
      id: '1',
      type: 'announcement',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      title: 'This is an announcement! With big text oh no!',
      content: '<p><strong>Imagine</strong> a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here.</p>',
      comments: [
        {
          id: '1',
          parent: '',
          fromStudent: false,
          dateCreated: new Date(),
          anonymous: false,
          content: 'This is a comment',
        },
      ],
    },
    {
      id: '2',
      type: 'note',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      title: 'This is a note! With big text oh no!',
      content: '<p><strong>Imagine</strong> a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here.</p>',
      comments: [
        {
          id: '1',
          parent: '',
          fromStudent: false,
          dateCreated: new Date(),
          anonymous: false,
          content: 'This is a comment',
        },
      ],
    },
    {
      id: '3',
      type: 'question',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      title: 'Is this a question? With big text oh no!',
      content: '<p><strong>Imagine</strong> a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here.</p>',
      answers: [
        {
          id: '1',
          parent: '',
          fromStudent: false,
          dateCreated: new Date(),
          anonymous: false,
          content: 'This is an answer',
        },
      ],
      comments: [
        {
          id: '1',
          parent: '',
          fromStudent: false,
          dateCreated: new Date(),
          anonymous: false,
          content: 'This is a comment',
        },
      ],
    },
    {
      id: '4',
      type: 'poll',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      title: 'This is a poll! With big text oh no!',
      content: '<p><strong>Imagine</strong> a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here. Imagine a lot of content here.</p>',
      comments: [
        {
          id: '1',
          parent: '',
          fromStudent: false,
          dateCreated: new Date(),
          anonymous: false,
          content: 'This is a comment',
        },
      ],
    },
  ];
  
  const isMobile = useMediaQuery(`(max-width: ${em(992)})`);
  const [filter, setFilter] = useState<string[]>([]);
  const [selectedDiscussion, setDiscussion] = useState<any | null>();
  const visibleDiscussion = selectedDiscussion ? discussions.find((d) => d.id === selectedDiscussion) : null;
  const canEdit = true;
  const [editable, setEditable] = useState(false);
  const [discussionEditor, setDiscussionEditor] = useState<any>(null);
  
  const selectDiscussion = (discussionID: string) => {
    setDiscussion(discussionID);
    discussionEditor.commands.setContent(discussions.find((d) => d.id === discussionID)?.content);
  };
  
  const toggleEditable = () => {
    setEditable(!editable);
    discussionEditor.setEditable(!editable);
    if (!visibleDiscussion) return;
    if (editable) discussionEditor.commands.setContent(visibleDiscussion.content);
  };
  
  return <Tabs.Panel value="discussions">
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Paper
          withBorder
          p="md"
          mah={isMobile ? 300 : undefined}
          h={isMobile ? undefined : `calc(100vh - ${rem(196)})`}
          style={{ overflowY: 'auto' }}
        >
          <Group justify="center">
            <Button
              leftSection={<FontAwesomeIcon icon={faPlus} />}
              mb="md"
            >post discussion</Button>
          </Group>
          <form
            onSubmit={(event) => event.preventDefault()}
          >
            <TextInput
              radius="xl"
              placeholder="how do I...?"
              rightSectionWidth={rem(42)}
              rightSection={
                <ActionIcon
                  radius="xl"
                  color="green"
                  variant="filled"
                  type="submit"
                  aria-label="search button"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </ActionIcon>
              }
            />
          </form>
          <MultiSelect
            value={filter}
            onChange={setFilter}
            label="filter"
            data={discussionTypes.map((type) => `${type.name}s`)}
            mt="md"
            mb={discussions.length ? 'xl' : 0}
          />
          <Stack>
            {discussions.filter((d) => !filter.length || filter.includes(`${d.type}s`)).map((discussion) => {
              const type = discussionTypes.find((d) => d.name === discussion.type) || discussionTypes[0];
              
              return <Grid key={discussion.id}>
                <Grid.Col
                  w={40}
                  c={type.color}
                  span="content"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <FontAwesomeIcon
                    icon={type.icon}
                    size="xl"
                  />
                </Grid.Col>
                <Grid.Col span="auto">
                  <Text><strong>{formatDateWithTime(discussion.dateUpdated)}</strong></Text>
                  <Text>{discussion.title}</Text>
                </Grid.Col>
                <Grid.Col
                  span="content"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <ActionIcon
                    color="blue"
                    size="lg"
                    aria-label={`view ${discussion.type}`}
                    title={`view ${discussion.type}`}
                    disabled={selectedDiscussion === discussion.id}
                    onClick={() => selectDiscussion(discussion.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>;
            })}
          </Stack>
          <Group
            justify="center"
            mt="md"
          >
            <Button
              color="pink"
              leftSection={<FontAwesomeIcon icon={faCloudArrowDown} />}
            >load more</Button>
          </Group>
        </Paper>
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 8 }}
        my={rem(-8)}
        py={0}
      >
        <Stack
          h={isMobile ? undefined : `calc(100vh - ${rem(164)})`}
          style={{ overflowY: 'auto' }}
          gap={0}
          py="md"
        >
          <Box display={selectedDiscussion ? 'none' : 'block'}>
            <Text hiddenFrom="md">Select a discussion above to view</Text>
            <Text visibleFrom="md">Select a discussion on the left to view</Text>
          </Box>
          <Box display={selectedDiscussion ? 'block' : 'none'}>
            <Title
              order={2}
              className="theme-text"
              mb="md"
            >
              {visibleDiscussion?.title}
            </Title>
            <Text
              hiddenFrom="md"
              mb="md"
            >
              created on {formatDate(visibleDiscussion?.dateCreated ?? new Date())},
              last updated on {formatDateWithTime(visibleDiscussion?.dateUpdated ?? new Date())}
            </Text>
            <Group
              justify="space-between"
              mb={(isMobile && !canEdit) ? 0 : 'md'}
            >
              <Text visibleFrom="md">
                created on {formatDate(visibleDiscussion?.dateCreated ?? new Date())},
                last updated on {formatDateWithTime(visibleDiscussion?.dateUpdated ?? new Date())}
              </Text>
              {
                canEdit && visibleDiscussion?.id && <Group>
                  <Button
                    color="blue"
                    variant="outline"
                    leftSection={<FontAwesomeIcon icon={editable ? faXmark : faPencil} />}
                    onClick={toggleEditable}
                  >{editable ? 'cancel editing' : `edit ${visibleDiscussion?.type}`}</Button>
                  <Button
                    color="red"
                    variant="outline"
                    leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                  >delete {visibleDiscussion?.type}</Button>
                </Group>
              }
            </Group>
            <form onSubmit={(event) => event.preventDefault()}>
              <TextInput
                label="title"
                placeholder="How do I...?"
                display={editable ? 'block' : 'none'}
                mb="md"
              />
              <RichEditor
                defaultContent={visibleDiscussion?.content}
                characterLimit={discussionValidation.contentCharacterLimit}
                showControls={editable}
                setEditor={setDiscussionEditor}
              />
              <Button
                color="green"
                type="submit"
                leftSection={<FontAwesomeIcon icon={faPencil} />}
                display={editable ? 'block' : 'none'}
                mt="md"
              >save article</Button>
            </form>
          </Box>
          
          <Box display={visibleDiscussion?.type === 'question' ? 'block' : 'none'}>
            <Group
              justify="space-between"
              mt="md"
            >
              <Title
                order={2}
                className="theme-text"
              >
                answers
              </Title>
              <Button
                hiddenFrom="md"
                color="green"
                leftSection={<FontAwesomeIcon icon={faCheck} />}
              >post answer</Button>
            </Group>
            <Group>
              <Button
                visibleFrom="md"
                color="green"
                mt="md"
                leftSection={<FontAwesomeIcon icon={faCheck} />}
              >post answer</Button>
            </Group>
            
            {visibleDiscussion?.answers?.map((answer: any, i: number) => <Paper
              key={answer.id}
              withBorder
              p="md"
              mt="md"
              ml={answer.parent ? 'xl' : 0}
              style={{ borderColor: answer.fromStudent ? undefined : 'var(--mantine-color-pink-outline)' }}
            >
              <Text fw={700}>answered {answer.anonymous ? 'anonymously' : 'by Example Person'}</Text>
              <Text mb="md">on {formatDateWithTime(answer.dateCreated)}</Text>
              <RichViewer content={answer.content} />
              <Button
                mt="md"
                color="blue"
                leftSection={<FontAwesomeIcon icon={faReply} />}
              >reply</Button>
            </Paper>)}
          </Box>
          
          <Group
            justify="space-between"
            mt="md"
          >
            <Title
              order={2}
              className="theme-text"
            >
              comments
            </Title>
            <Button
              hiddenFrom="md"
              color="green"
              leftSection={<FontAwesomeIcon icon={faComment} />}
            >post comment</Button>
          </Group>
          <Group>
            <Button
              visibleFrom="md"
              color="green"
              mt="md"
              leftSection={<FontAwesomeIcon icon={faComment} />}
            >post comment</Button>
          </Group>
          
          {visibleDiscussion?.comments.map((comment: any, i: number) => <Paper
            key={comment.id}
            withBorder
            p="md"
            mt="md"
            ml={comment.parent ? 'xl' : 0}
            style={{ borderColor: comment.fromStudent ? undefined : 'var(--mantine-color-pink-outline)' }}
          >
            <Text fw={700}>commented {comment.anonymous ? 'anonymously' : 'by Example Person'}</Text>
            <Text mb="md">on {formatDateWithTime(comment.dateCreated)}</Text>
            <RichViewer content={comment.content} />
            <Button
              mt="md"
              color="blue"
              leftSection={<FontAwesomeIcon icon={faReply} />}
            >reply</Button>
          </Paper>)}
        </Stack>
      </Grid.Col>
    </Grid>
  </Tabs.Panel>;
}
