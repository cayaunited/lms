'use client';

import { Grid, Tabs } from '@mantine/core';
import PeopleList from './PeopleList';

export default function PeopleTab({ user, course, setCourse, teacherIDs, setTeacherIDs, assistantIDs, setAssistantIDs, studentIDs, setStudentIDs, peopleByID, setPeopleByID }:
  { user: any, course: any, setCourse: any, teacherIDs: string[], setTeacherIDs: any, assistantIDs: string[], setAssistantIDs: any, studentIDs: string[], setStudentIDs: any, peopleByID: any, setPeopleByID: any }) {
  return <Tabs.Panel value="people">
    <Grid justify="center">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <PeopleList
          user={user}
          course={course}
          setCourse={setCourse}
          listRole="teacher"
          peopleIDs={teacherIDs}
          setPeopleIDs={setTeacherIDs}
          peopleByID={peopleByID}
          setPeopleByID={setPeopleByID}
        />
      </Grid.Col>
    </Grid>
    <Grid
      justify="center"
      mt="md"
    >
      <Grid.Col span={{ base: 12, md: 6 }}>
        <PeopleList
          user={user}
          course={course}
          setCourse={setCourse}
          listRole="assistant"
          peopleIDs={assistantIDs}
          setPeopleIDs={setAssistantIDs}
          peopleByID={peopleByID}
          setPeopleByID={setPeopleByID}
        />
      </Grid.Col>
    </Grid>
    <Grid
      justify="center"
      mt="md"
    >
      <Grid.Col span={{ base: 12, md: 6 }}>
        <PeopleList
          user={user}
          course={course}
          setCourse={setCourse}
          listRole="student"
          peopleIDs={studentIDs}
          setPeopleIDs={setStudentIDs}
          peopleByID={peopleByID}
          setPeopleByID={setPeopleByID}
        />
      </Grid.Col>
    </Grid>
  </Tabs.Panel>;
}
