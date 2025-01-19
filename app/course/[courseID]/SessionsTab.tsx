'use client';

import {
  Button,
  Checkbox,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCheck } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '@/lib/formatDate';
import sessionValidation from '@/lib/validation/session';

export default function SessionsTab() {
  const sessions = [
    {
      id: 1,
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60),
      location: 'the library',
      section: 'all',
      official: true,
    },
    {
      id: 2,
      startTime: new Date(),
      endTime: new Date(Date.now() + 1000 * 60 * 60),
      location: 'the library',
      section: '1',
      official: false,
    },
  ];
  
  return <Tabs.Panel value="sessions">
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title
          order={2}
          mb="md"
          className="theme-text"
        >upcoming study sessions</Title>
        <Stack>
          {sessions.map((session) => <Paper
            key={session.id}
            withBorder
            p="md"
            className="hover-card"
            style={{ borderColor: session.official ? 'var(--mantine-color-pink-outline)' : undefined }}
          >
            <Text fw={700}>{formatDate(session.startTime)}, from {formatTime(session.startTime)} to {formatTime(session.endTime)}</Text>
            <Text mb="md">
              at {session.location},
              for {session.section === 'all' ? 'all sections' : `section ${session.section}`}
            </Text>
            <Text>hosted by Example Person</Text>
            {session.official && <Text c="pink">official study session</Text>}
            <Group
              mt="md"
              justify="space-between"
            >
              <Text c="blue">2 coming</Text>
              <Checkbox
                label="I'm coming"
                labelPosition="left"
                checked={true}
                onChange={() => {}}
                readOnly={true}
                icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
              />
            </Group>
          </Paper>)}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Title
          order={2}
          mb="md"
          className="theme-text"
        >host a study session</Title>
        <form onSubmit={(event) => event.preventDefault()}>
          <DatePickerInput
            label="date"
            description="today or later"
            mb="md"
          />
          <TimeInput
            label="start time"
            description={`between ${sessionValidation.minStartHour} am and ${sessionValidation.maxStartHour12} pm, for some sleep`}
            mb="md"
          />
          <TimeInput
            label="end time"
            description={`between ${sessionValidation.minEndHour} am and ${sessionValidation.maxEndHour12} am, for some sleep`}
            mb="md"
          />
          <TextInput
            label="location"
            placeholder="Library"
            description="please host the session in a public place"
            mb="md"
          />
          <Select
            label="section"
            mb="md"
            data={['all', '1']}
          />
          <Group justify="center">
            <Button
              type="submit"
              leftSection={<FontAwesomeIcon icon={faCalendarDays} />}
            >host session</Button>
          </Group>
        </form>
      </Grid.Col>
    </Grid>
  </Tabs.Panel>;
}
