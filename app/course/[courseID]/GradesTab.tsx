'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  Card,
  Center,
  Container,
  em,
  Grid,
  Group,
  Paper,
  rem,
  RingProgress,
  ScrollArea,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { BarChart } from '@mantine/charts';
import { useMediaQuery } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faCheck, faEye, faPencil } from '@fortawesome/free-solid-svg-icons';
import assignmentIcons from '@/lib/assignmentIcons';
import colors from '@/lib/colors';
import GradeTooltip from '@/components/GradeTooltip';

export default function GradesTab() {
  const pathname = usePathname();
  const isMobile = useMediaQuery(`(max-width: ${em(992)})`);
  
  const assignmentTypes = [
    {
      name: 'assignment',
      pluralName: 'assignments',
      icon: 0,
      color: 6,
      weight: 25,
    },
    {
      name: 'exam',
      pluralName: 'exams',
      icon: 2,
      color: 1,
      weight: 75,
    },
  ];
  
  const assignmentGrades = [
    {
      id: '1',
      name: 'Example Assignment 1',
      assignment: 10,
    },
    {
      id: '2',
      name: 'Example Assignment 2',
      assignment: 20,
    },
    {
      id: '3',
      name: 'Example Assignment 3',
      assignment: 30,
    },
    {
      id: '4',
      name: 'Example Assignment 4',
      assignment: 40,
    },
    {
      id: '5',
      name: 'Example Assignment 5',
      assignment: 50,
    },
    {
      id: '6',
      name: 'Example Assignment 6',
      assignment: 45,
    },
    {
      id: '7',
      name: 'Example Exam 1',
      exam: 55,
    },
    {
      id: '8',
      name: 'Example Assignment 7',
      assignment: 40,
    },
    {
      id: '9',
      name: 'Example Assignment 8',
      assignment: 45,
    },
    {
      id: '10',
      name: 'Example Assignment 9',
      assignment: 45,
    },
    {
      id: '11',
      name: 'Example Assignment 10',
      assignment: 60,
    },
    {
      id: '12',
      name: 'Example Assignment 11',
      assignment: 60,
    },
    {
      id: '13',
      name: 'Example Assignment 12',
      assignment: 65,
    },
    {
      id: '14',
      name: 'Example Assignment 13',
      assignment: 65,
    },
    {
      id: '15',
      name: 'Example Assignment 14',
      assignment: 65,
    },
    {
      id: '16',
      name: 'Example Assignment 15',
      assignment: 60,
    },
    {
      id: '17',
      name: 'Example Assignment 16',
      assignment: 55,
    },
    {
      id: '18',
      name: 'Example Assignment 17',
      assignment: 70,
    },
    {
      id: '19',
      name: 'Example Assignment 18',
      assignment: 70,
    },
    {
      id: '20',
      name: 'Example Assignment 19',
      assignment: 75,
    },
    {
      id: '21',
      name: 'Example Assignment 20',
      assignment: 70,
    },
    {
      id: '22',
      name: 'Example Assignment 21',
      assignment: 75,
    },
    {
      id: '23',
      name: 'Example Assignment 22',
      assignment: 80,
    },
    {
      id: '24',
      name: 'Example Assignment 23',
      assignment: 80,
    },
    {
      id: '25',
      name: 'Example Assignment 24',
      assignment: 85,
    },
    {
      id: '26',
      name: 'Example Exam 2',
      exam: 90,
    },
    {
      id: '27',
      name: 'Example Assignment 25',
      assignment: 95,
    },
    {
      id: '28',
      name: 'Example Assignment 26',
      assignment: 100,
    },
  ];
  
  const gradeScaling = [
    { name: 'A', threshold: 90 },
    { name: 'B', threshold: 80 },
    { name: 'C', threshold: 70 },
    { name: 'D', threshold: 60 },
    { name: 'F', threshold: 0 },
  ];
  
  return <Tabs.Panel value="grades">
    <Grid
      justify="center"
      align="center"
      mb="sm"
    >
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group justify="center">
          <Select
            label="section"
            data={['1', '2']}
          />
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group justify="center">
          <Button
            color="blue"
            leftSection={<FontAwesomeIcon icon={faPencil} />}
          >edit scaling</Button>
          <Button
            color="blue"
            leftSection={<FontAwesomeIcon icon={faPencil} />}
          >edit types</Button>
        </Group>
      </Grid.Col>
    </Grid>
    
    <Grid
      align="stretch"
      mb="md"
    >
      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
        <Card
          withBorder
          className="hover-card"
          h="100%"
        >
          <Title
            order={3}
            ta="center"
            mb="md"
          >total</Title>
          <Group justify="center">
            <RingProgress
              roundCaps
              sections={[{ value: 90, color: 'green' }]}
              label={<Center>
                <FontAwesomeIcon
                  icon={faChartSimple}
                  color='var(--mantine-primary-color-filled)'
                  size="2x"
                />
              </Center>}
            />
            <Stack gap={0}>
              <Text
                size={rem(32)}
                fw={700}
              >A</Text>
              <Text size="lg">90%</Text>
              <Text>on average</Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
        <Card
          withBorder
          className="hover-card"
          ta="center"
        >
          <Title
            order={3}
            mb="md"
          >scaling</Title>
          {gradeScaling.map((scale) => <Text key={scale.threshold}>
            {scale.name} - {scale.threshold}%</Text>)}
        </Card>
      </Grid.Col>
      {assignmentTypes.map((type) => <Grid.Col
        key={type.name}
        span={{ base: 12, sm: 6, md: 3 }}
      >
        <Card
          withBorder
          className="hover-card"
          h="100%"
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
              sections={[{ value: 90, color: colors[type.color] }]}
              label={<Center>
                <FontAwesomeIcon
                  icon={assignmentIcons[type.icon]}
                  color={colors[type.color]}
                  size="2x"
                />
              </Center>}
            />
            <Stack gap={0}>
              <Text
                size={rem(32)}
                fw={700}
              >90%</Text>
              <Text>on average</Text>
              <Text><em>worth {type.weight}% of total</em></Text>
            </Stack>
          </Group>
        </Card>
      </Grid.Col>)}
    </Grid>
    <Paper
      withBorder
      p="md"
      style={{ overflowX: 'auto' }}
    >
      <Title
        order={3}
        ta="center"
        mb="md"
      >grade graph</Title>
      <BarChart
        miw={assignmentGrades.length * 20}
        h={300}
        data={assignmentGrades}
        dataKey="id"
        series={assignmentTypes.map((type) => ({ name: type.name, color: colors[type.color] }))}
        tickLine="y"
        unit="%"
        type="stacked"
        withXAxis={false}
        tooltipAnimationDuration={100}
        withLegend
        barProps={{ radius: 16 }}
        yAxisProps={{ begin: 0, end: 100, tickCount: 6 }}
        tooltipProps={{
          content: ({ label, payload }) => <GradeTooltip label={label} payload={payload} />,
        }}
      />
    </Paper>
    <Container>
      <Title
        order={3}
        ta="center"
        my="md"
      >grade table</Title>
      <ScrollArea mx={rem(-16)}>
        <Table
          verticalSpacing="sm"
          striped
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th hiddenFrom="md">name and average grade</Table.Th>
              <Table.Th visibleFrom="md">name</Table.Th>
              <Table.Th visibleFrom="md">average grade</Table.Th>
              <Table.Th w={isMobile ? 100 : undefined}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {assignmentGrades.map((assignment) => <Table.Tr key={assignment.id}>
              <Table.Td hiddenFrom="md">
                <Text fw={700}>{assignment.name}</Text>
                <Text>{assignment.assignment || assignment.exam}%</Text>
              </Table.Td>
              <Table.Td visibleFrom="md">{assignment.name}</Table.Td>
              <Table.Td visibleFrom="md">{assignment.assignment || assignment.exam}%</Table.Td>
              <Table.Td>
                <Group justify="end">
                  <Button
                    color="pink"
                    variant="outline"
                    leftSection={<FontAwesomeIcon icon={faCheck} />}
                  >grade</Button>
                  <Button
                    component={Link}
                    href={`${pathname}/assignment/${assignment.id}`}
                    target="_blank"
                    color="blue"
                    leftSection={<FontAwesomeIcon icon={faEye} />}
                  >view</Button>
                </Group>
              </Table.Td>
            </Table.Tr>)}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  </Tabs.Panel>;
}
