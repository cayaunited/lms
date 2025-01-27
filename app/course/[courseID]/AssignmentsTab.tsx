'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Paper,
  Progress,
  RingProgress,
  Select,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import useDyslexic from '@/lib/useDyslexic';
import { formatDateWithTime } from '@/lib/formatDate';
import colors from '@/lib/colors';
import assignmentIcons from '@/lib/assignmentIcons';

export default function ArticlesTab() {
  const assignmentTypes = [
    {
      name: 'homework',
      pluralName: 'homework',
      icon: 0,
      color: 6,
    },
    {
      name: 'exam',
      pluralName: 'exams',
      icon: 2,
      color: 1,
    },
  ];
  
  const assignments = [
    {
      id: '1',
      name: 'Example Assignment',
      type: 'homework',
      dateDue: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '2',
      name: 'Example Exam',
      type: 'exam',
      dateDue: new Date(Date.now() + 1000 * 60 * 60),
    },
  ];
  
  const pathname = usePathname();
  const { headerFont } = useDyslexic();
  
  return <Tabs.Panel value="assignments">
    <Grid
      justify="center"
      align="center"
      mb="xs"
    >
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Group justify="center">
          <Select
            label="section"
            data={['all', '1']}
          />
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Progress
          size="xl"
          color="pink"
          value={50}
        />
        <Text
          ta="center"
          c="pink"
          mt="xs"
        >1 out of 2 total graded</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Group justify="center">
          <Button
            component={Link}
            href={`${pathname}/assignment/new`}
            target="_blank"
            leftSection={<FontAwesomeIcon icon={faPlus} />}
          >create assignment</Button>
        </Group>
      </Grid.Col>
    </Grid>
    <Grid
      align="stretch"
      mb="xs"
    >
      {assignmentTypes.map((type) => <Grid.Col
        key={type.name}
        span={{ base: 12, sm: 6, md: 3 }}
      >
        <Card
          withBorder
          className="hover-card"
          style={{ borderColor: colors[type.color] }}
        >
          <Title
            order={3}
            ta="center"
            mb="md"
          >{type.pluralName}</Title>
          <Group justify="center">
            <RingProgress
              roundCaps
              sections={[{ value: 25, color: colors[type.color] }]}
              label={<Center>
                <FontAwesomeIcon
                  icon={assignmentIcons[type.icon]}
                  color={colors[type.color]}
                  size="2x"
                />
              </Center>}
            />
            <Text size="xl">1 out of 4 graded</Text>
          </Group>
        </Card>
      </Grid.Col>)}
    </Grid>
    <Grid align="stretch">
      {assignments.map((assignment) => {
        const type = assignmentTypes.find((t) => t.name === assignment.type);
        
        return <Grid.Col
          key={assignment.id}
          span={{ base: 12, sm: 6, md: 4 }}
        >
          <Paper
            withBorder
            p="md"
            h="100%"
            className="hover-card"
            shadow="sm"
          >
            <Group mb="md">
              <Box
                w={32}
                h={32}
                c={colors[type?.color ?? 0]}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <FontAwesomeIcon
                  icon={assignmentIcons[type?.icon ?? 0]}
                  size="xl"
                />
              </Box>
              <Text
                size="xl"
                fw={500}
                ff={headerFont}
                
              >{assignment.name}</Text>
            </Group>
            <Text mb="md">due on {formatDateWithTime(assignment.dateDue)}</Text>
            <Button
              component={Link}
              href={`${pathname}/assignment/${assignment.id}`}
              target="_blank"
              color="blue"
              leftSection={<FontAwesomeIcon icon={faEye} />}
            >view</Button>
            <Group
              mt="md"
              justify="space-between"
            >
              <Text c="pink">0 out of 1 graded</Text>
              <Button
                color="pink"
                variant="outline"
                leftSection={<FontAwesomeIcon icon={faCheck} />}
              >grade</Button>
            </Group>
          </Paper>
        </Grid.Col>;
      })}
    </Grid>
  </Tabs.Panel>;
}
