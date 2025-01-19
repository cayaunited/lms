'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Container,
  Group,
  rem,
  ScrollArea,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faMinus, faRightLeft, faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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
              <Table.Th>name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <ActionIcon
                    color="red"
                    variant="outline"
                    size="lg"
                    aria-label={`remove selected teacher from course`}
                    title={`remove selected teacher from course`}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </ActionIcon>
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {teachers.map((teacher) => {
              const selected = teacher.id === '1';
              
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
                <Table.Td>{teacher.name}</Table.Td>
                <Table.Td>{teacher.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {teacher.sections.map((section) => <Badge
                      key={section}
                      color="blue"
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <ActionIcon
                      color="blue"
                      size="lg"
                      aria-label={`move teacher to section`}
                      title={`move teacher to section`}
                    >
                      <FontAwesomeIcon icon={faRightLeft} />
                    </ActionIcon>
                    <ActionIcon
                      component={Link}
                      href={`/profile/${teacher.id}`}
                      style={{ textDecoration: 'none', color: 'var(--mantine-color-green-text)', verticalAlign: 'middle' }}
                      target="_blank"
                      color="pink"
                      c="black"
                      size="lg"
                      aria-label={`view teachers's profile`}
                      title={`view teacher's profile`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="outline"
                      size="lg"
                      aria-label={`remove teacher from course`}
                      title={`remove teacher from course`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </ActionIcon>
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
              <Table.Th>name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <ActionIcon
                    color="red"
                    variant="outline"
                    size="lg"
                    aria-label={`remove selected assistant from course`}
                    title={`remove selected assistant from course`}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </ActionIcon>
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
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <ActionIcon
                      color="blue"
                      size="lg"
                      aria-label={`move teacher to section`}
                      title={`move teacher to section`}
                    >
                      <FontAwesomeIcon icon={faRightLeft} />
                    </ActionIcon>
                    <ActionIcon
                      component={Link}
                      href={`/profile/${assistant.id}`}
                      style={{ textDecoration: 'none', color: 'var(--mantine-color-green-text)', verticalAlign: 'middle' }}
                      target="_blank"
                      color="pink"
                      c="black"
                      size="lg"
                      aria-label={`view assistant's profile`}
                      title={`view assistant's profile`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="outline"
                      size="lg"
                      aria-label={`remove assistant from course`}
                      title={`remove assistant from course`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </ActionIcon>
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
              <Table.Th>name</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <ActionIcon
                    color="red"
                    variant="outline"
                    size="lg"
                    aria-label={`remove selected student from course`}
                    title={`remove selected student from course`}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </ActionIcon>
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
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <ActionIcon
                      color="blue"
                      size="lg"
                      aria-label={`move teacher to section`}
                      title={`move teacher to section`}
                    >
                      <FontAwesomeIcon icon={faRightLeft} />
                    </ActionIcon>
                    <ActionIcon
                      component={Link}
                      href={`/profile/${student.id}`}
                      style={{ textDecoration: 'none', color: 'var(--mantine-color-green-text)', verticalAlign: 'middle' }}
                      target="_blank"
                      color="pink"
                      c="black"
                      size="lg"
                      aria-label={`view student's profile`}
                      title={`view student's profile`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="outline"
                      size="lg"
                      aria-label={`remove student from course`}
                      title={`remove student from course`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </ActionIcon>
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
