'use client';

import Link from 'next/link';
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
  faEnvelope,
  faEye,
  faMinus,
  faRightLeft,
  faTrashCan,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function PeopleTab({ user, course, teacherIDs, assistantIDs, studentIDs, peopleByID, setPeopleByID }:
  { user: any, course: any, teacherIDs: string[], assistantIDs: string[], studentIDs: string[], peopleByID: any, setPeopleByID: any }) {
  const teachers = teacherIDs.map((teacherID) => ({ id: teacherID, ...peopleByID[teacherID] }));
  const assistants = assistantIDs.map((assistantID) => ({ id: assistantID, ...peopleByID[assistantID] }));
  const students = studentIDs.map((studentID) => ({ id: studentID, ...peopleByID[studentID] }));
  
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
                        leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                      >
                        email selected
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
                  <Text fw={700}>{teacher.name}</Text>
                  <Text hiddenFrom="md">{teacher.email}</Text>
                </Table.Td>
                <Table.Td visibleFrom="md">{teacher.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {teacher.sections.map((section: string) => <Badge
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
                          leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                        >
                          email teacher
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
                        leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                      >
                        email selected
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
                <Table.Td>
                  <Text fw={700}>{assistant.name}</Text>
                  <Text hiddenFrom="md">{assistant.email}</Text>
                </Table.Td>
                <Table.Td visibleFrom="md">{assistant.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {assistant.sections.map((section: string) => <Badge
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
                          leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                        >
                          email assistant
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
                        leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                      >
                        email selected
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
                <Table.Td>
                  <Text fw={700}>{student.name}</Text>
                  <Text hiddenFrom="md">{student.email}</Text>
                </Table.Td>
                <Table.Td visibleFrom="md">{student.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {student.sections.map((section: string) => <Badge
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
                          leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                        >
                          email student
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
