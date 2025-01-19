'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Container,
  Group,
  Menu,
  rem,
  ScrollArea,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEllipsis,
  faEye,
  faMinus,
  faRightLeft,
  faTrashCan,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function PeopleTab() {
  const teachers = [
    {
      id: '1',
      name: 'Example Teacher 1',
      email: 'teacher1@cayaunited.app',
      avatar: 0,
      sections: ['1', '2'],
    },
    {
      id: '2',
      name: 'Example Teacher 2',
      email: 'teacher2@cayaunited.app',
      avatar: 1,
      sections: ['1'],
    },
  ];
  
  const assistants = [
    {
      id: '1',
      name: 'Example Assistant 1',
      email: 'assistant1@cayaunited.app',
      avatar: 0,
      sections: ['1', '2'],
    },
    {
      id: '2',
      name: 'Example Assistant 2',
      email: 'assistant2@cayaunited.app',
      avatar: 1,
      sections: ['1'],
    },
  ];
  
  const students = [
    {
      id: '1',
      name: 'Example Student 1',
      email: 'student1@cayaunited.app',
      avatar: 0,
      sections: ['1', '2'],
    },
    {
      id: '2',
      name: 'Example Student 2',
      email: 'student2@cayaunited.app',
      avatar: 1,
      sections: ['1'],
    },
  ];
  
  return <Tabs.Panel value="people">
    <Container>
      <Group justify="space-between">
        <Title
          order={2}
          className="theme-text"
        >teachers</Title>
        <Button
          leftSection={<FontAwesomeIcon icon={faUserPlus} />}
        >add teacher</Button>
      </Group>
      <ScrollArea mt="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  icon={(props) => <FontAwesomeIcon icon={props.indeterminate ? faMinus : faCheck} className={props.className} />}
                />
              </Table.Th>
              <Table.Th style={{ width: rem(60) }}></Table.Th>
              <Table.Th hiddenFrom="md">name and email</Table.Th>
              <Table.Th visibleFrom="md">name</Table.Th>
              <Table.Th visibleFrom="md">email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        color="pink"
                        size="lg"
                        aria-label={`view actions`}
                        title={`view actions`}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>actions</Menu.Label>
                      <Menu.Item
                        color="blue"
                        leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                      >
                        move to section
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                      >
                        remove selected
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {teachers.map((teacher) => {
              const selected = 0;
              
              return <Table.Tr
                key={teacher.id}
                bg={selected ? 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))' : 'transparent'}
              >
                <Table.Td>
                  <Checkbox
                    icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
                  />
                </Table.Td>
                <Table.Td>
                  <Avatar size={rem(40)} src={`/avatars/${teacher.avatar}.png`} radius={rem(40)} />
                </Table.Td>
                <Table.Td>
                  <Text>{teacher.name}</Text>
                  <Text hiddenFrom="md">{teacher.email}</Text>
                </Table.Td>
                <Table.Td visibleFrom="md">{teacher.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {teacher.sections.map((section) => <Badge
                      key={section}
                      color="blue"
                      px={rem(6)}
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <Menu>
                      <Menu.Target>
                        <ActionIcon
                          color="pink"
                          size="lg"
                          aria-label={`view actions`}
                          title={`view actions`}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>actions</Menu.Label>
                        <Menu.Item
                          color="blue"
                          leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                        >
                          move to section
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={`/profile/${teacher.id}`}
                          style={{ textDecoration: 'none', color: 'var(--mantine-color-pink-text)', verticalAlign: 'middle' }}
                          target="_blank"
                          leftSection={<FontAwesomeIcon icon={faEye} />}
                        >
                          view profile
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                        >
                          remove teacher
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>;
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
    <Container mt="xl">
      <Group justify="space-between">
        <Title
          order={2}
          className="theme-text"
        >assistants</Title>
        <Button
          leftSection={<FontAwesomeIcon icon={faUserPlus} />}
        >add assistant</Button>
      </Group>
      <ScrollArea mt="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  icon={(props) => <FontAwesomeIcon icon={props.indeterminate ? faMinus : faCheck} className={props.className} />}
                />
              </Table.Th>
              <Table.Th style={{ width: rem(60) }}></Table.Th>
              <Table.Th hiddenFrom="md">name and email</Table.Th>
              <Table.Th visibleFrom="md">name</Table.Th>
              <Table.Th visibleFrom="md">email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        color="pink"
                        size="lg"
                        aria-label={`view actions`}
                        title={`view actions`}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>actions</Menu.Label>
                      <Menu.Item
                        color="blue"
                        leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                      >
                        move to section
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                      >
                        remove selected
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assistants.map((assistant) => {
              const selected = 0;
              
              return <Table.Tr
                key={assistant.id}
                bg={selected ? 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))' : 'transparent'}
              >
                <Table.Td>
                  <Checkbox
                    icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
                  />
                </Table.Td>
                <Table.Td>
                  <Avatar size={rem(40)} src={`/avatars/${assistant.avatar}.png`} radius={rem(40)} />
                </Table.Td>
                <Table.Td>{assistant.name}</Table.Td>
                <Table.Td>{assistant.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {assistant.sections.map((section) => <Badge
                      key={section}
                      color="blue"
                      px={rem(6)}
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <Menu>
                      <Menu.Target>
                        <ActionIcon
                          color="pink"
                          size="lg"
                          aria-label={`view actions`}
                          title={`view actions`}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>actions</Menu.Label>
                        <Menu.Item
                          color="blue"
                          leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                        >
                          move to section
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={`/profile/${assistant.id}`}
                          style={{ textDecoration: 'none', color: 'var(--mantine-color-pink-text)', verticalAlign: 'middle' }}
                          target="_blank"
                          leftSection={<FontAwesomeIcon icon={faEye} />}
                        >
                          view profile
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                        >
                          remove assistant
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>;
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
    <Container mt="xl">
      <Group justify="space-between">
        <Title
          order={2}
          className="theme-text"
        >students</Title>
        <Button
          leftSection={<FontAwesomeIcon icon={faUserPlus} />}
        >add student</Button>
      </Group>
      <ScrollArea mt="md">
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  icon={(props) => <FontAwesomeIcon icon={props.indeterminate ? faMinus : faCheck} className={props.className} />}
                />
              </Table.Th>
              <Table.Th style={{ width: rem(60) }}></Table.Th>
              <Table.Th hiddenFrom="md">name and email</Table.Th>
              <Table.Th visibleFrom="md">name</Table.Th>
              <Table.Th visibleFrom="md">email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        color="pink"
                        size="lg"
                        aria-label={`view actions`}
                        title={`view actions`}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>actions</Menu.Label>
                      <Menu.Item
                        color="blue"
                        leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                      >
                        move to section
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                      >
                        remove selected
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {students.map((student) => {
              const selected = 0;
              
              return <Table.Tr
                key={student.id}
                bg={selected ? 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))' : 'transparent'}
              >
                <Table.Td>
                  <Checkbox
                    icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
                  />
                </Table.Td>
                <Table.Td>
                  <Avatar size={rem(40)} src={`/avatars/${student.avatar}.png`} radius={rem(40)} />
                </Table.Td>
                <Table.Td>{student.name}</Table.Td>
                <Table.Td>{student.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {student.sections.map((section) => <Badge
                      key={section}
                      color="blue"
                      px={rem(6)}
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <Menu>
                      <Menu.Target>
                        <ActionIcon
                          color="pink"
                          size="lg"
                          aria-label={`view actions`}
                          title={`view actions`}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>actions</Menu.Label>
                        <Menu.Item
                          color="blue"
                          leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                        >
                          move to section
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={`/profile/${student.id}`}
                          style={{ textDecoration: 'none', color: 'var(--mantine-color-pink-text)', verticalAlign: 'middle' }}
                          target="_blank"
                          leftSection={<FontAwesomeIcon icon={faEye} />}
                        >
                          view profile
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                        >
                          remove student
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>;
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  </Tabs.Panel>;
}
