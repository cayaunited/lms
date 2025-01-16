'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ActionIcon,
  Button,
  Checkbox,
  Grid,
  Group,
  Paper,
  rem,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCloudArrowDown, faEye, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import RichViewer from '@/components/RichViewer';
import useDyslexic from '@/lib/useDyslexic';

export default function ArticlesTab() {
  const articles = [
    {
      id: '1',
      name: 'Example Article 1',
      content: '<p>This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here.</p>',
      approved: false,
    },
    {
      id: '2',
      name: 'Example Article 2',
      content: '<p>This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here. This is a whole lot of content right here.</p>',
      approved: true,
    },
  ];
  
  const pathname = usePathname();
  const { headerFont } = useDyslexic();
  
  return <Tabs.Panel value="articles">
    <Group
      justify="center"
      mb="md"
    >
      <Button
        component={Link}
        href={`${pathname}/article/new`}
        target="_blank"
        leftSection={<FontAwesomeIcon icon={faPlus} />}
      >create article</Button>
      <form
        onSubmit={(event) => event.preventDefault()}
        style={{ flexGrow: 1 }}
      >
        <TextInput
          radius="xl"
          size="md"
          placeholder="the basics of..."
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
    </Group>
    <Grid align="stretch">
      {articles.map((article) => <Grid.Col
        key={article.id}
        span={{ base: 12, sm: 6, md: 4 }}
      >
        <Paper
          withBorder
          p="md"
          h="100%"
          className="hover-card"
        >
          <Text
            size="xl"
            fw={500}
            ff={headerFont}
            mb="md"
          >{article.name}</Text>
          <RichViewer
            content={article.content}
            plainText={true}
          />
          <Group
            mt="md"
            justify="space-between"
          >
            <Button
              component={Link}
              href={`${pathname}/article/${article.id}`}
              target="_blank"
              color="blue"
              leftSection={<FontAwesomeIcon icon={faEye} />}
            >read</Button>
            <Checkbox
              label={article.approved ? 'approved' : 'work in progress'}
              labelPosition="left"
              checked={article.approved}
              onChange={() => {}}
              readOnly={true}
              icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
              className="approval-check"
              c={article.approved ? 'var(--mantine-color-green-text)' : 'var(--mantine-color-orange-text)'}
            />
          </Group>
        </Paper>
      </Grid.Col>)}
    </Grid>
    <Group
      justify="center"
      mt="md"
    >
      <Button
        color="pink"
        leftSection={<FontAwesomeIcon icon={faCloudArrowDown} />}
      >load more</Button>
    </Group>
  </Tabs.Panel>;
}
