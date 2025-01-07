'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Radio,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencil, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import useDyslexic from '@/lib/useDyslexic';
import icons from '@/lib/icons';
import { formatDateWithTime, formatTime } from '@/lib/formatDate';
import colors from '@/lib/colors';
import courseValidation from '@/lib/validation/course';
import showNotification from '@/lib/showNotification';
import { createClient } from '@/lib/supabase/client';

export default function Dashboard() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  
  useEffect(() => {
    (async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        const uid = userData.user.id;
        const { data: peopleData } = await supabase.from('people').select('role').eq('id', uid);
        if (!peopleData || peopleData.length === 0) return;
        
        setUser({ id: uid, role: peopleData[0].role });
        const { data: connectionData, error: connectionError } = await supabase.from('people_to_courses')
          .select().eq('person_id', uid);
        
        if (connectionError) {
          showNotification(false, 'Failed to load dashboard', 'Sorry, we couldn\'t load your dashboard');
          console.log(connectionError);
          return;
        }
        
        const { data: coursesData, error: coursesError } = await supabase.from('courses').select()
          .in('id', connectionData.map((connection) => connection.course_id));
        
        if (coursesError) {
          showNotification(false, 'Failed to load dashboard', 'Sorry, we couldn\'t load your dashboard');
          console.log(connectionError);
          return;
        }
        
        setCourses(coursesData);
        const today = new Date();
        const assignments: any[] = [];
        
        for (const course of coursesData) {
          const { data: assignmentsData, error: assignmentsError } = await supabase.from('assignments').select()
            .eq('course_id', course.id)
            .in('section', ['all', ...connectionData.find((connection) => connection.course_id === course.id).sections])
            .gte('date_due', `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`);
          
          if (assignmentsError) {
            showNotification(false, 'Failed to load dashboard', 'Sorry, we couldn\'t load your dashboard');
            console.log(assignmentsError);
            return;
          }
          
          assignmentsData.forEach((assignment) => assignments.push({
            id: assignment.id,
            number: course.number,
            name: assignment.name,
            date: new Date(assignment.date_due),
          }));
        }
        
        setAssignments(assignments);
      } catch (error) {
        showNotification(false, 'Failed to load dashboard', 'Sorry, we couldn\'t load your dashboard');
        console.log(error);
      }
    })();
  }, []);
  
  const sessions = [
    {
      id: '1',
      number: 'PS 231',
      startTime: new Date('December 9, 2024, 9:00 AM'),
      endTime: new Date('December 9, 2024, 11:00 AM'),
      location: 'The Library',
    },
    {
      id: '2',
      number: 'FAL 240',
      startTime: new Date('March 8, 2025, 3:00 PM'),
      endTime: new Date('March 8, 2025, 6:00 PM'),
      location: 'Barouche',
    },
    {
      id: '3',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
    {
      id: '4',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
    {
      id: '5',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
    {
      id: '6',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
    {
      id: '7',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
    {
      id: '8',
      number: 'BEL 251',
      startTime: new Date('March 7, 2025, 7:00 PM'),
      endTime: new Date('March 7, 2025, 11:00 PM'),
      location: 'The Indy Airport',
    },
  ];
  
  // searchFirestore(() => query(collection(db, 'courses'), or(where('teachers', 'array-contains', user!.uid), where('assistants', 'array-contains', user!.uid), where('students', 'array-contains', user!.uid))), async (q: any) => {
  //   const courseDocuments = await getDocs(q);
  //   if (courseDocuments.empty) return;
  //   const courses: any[] = [];
  //   const assignments: any[] = [];
  //   const userToken = await user!.getIdTokenResult();
  //   const role = userToken.claims.isStudent ? 'student' : 'teacher';
    
  //   for (const courseDocument of courseDocuments.docs) {
  //     const { number, name, icon, color, assistants, sections } = courseDocument.data() as any;
  //     courses.push({ id: courseDocument.id, number, name, icon, color });
  //     const today = new Date();
  //     today.setHours(0);
  //     today.setMinutes(0);
  //     today.setMilliseconds(0);
      
  //     const assignmentDocuments = await getDocs(query(collection(db, 'courses', courseDocument.id, 'assignments'), where('date_due', '>=', today)));
  //     if (assignmentDocuments.empty) break;
  //     const isStudent = role === 'student' && !assistants.includes(user!.uid);
  //     const inSection: any = {};
      
  //     for (const assignmentDocument of assignmentDocuments.docs) {
  //       const { name, date_due, section } = assignmentDocument.data() as any;
  //       let completed = undefined;
        
  //       if (isStudent) {
  //         if (section !== 'all' && inSection[section as keyof typeof inSection] == undefined)
  //           inSection[section as keyof typeof inSection] = sections.find((s: any) => s.number === section)?.students.includes(user!.uid);
  //         if (section !== 'all' && !inSection[section as keyof typeof inSection]) continue;
          
  //         const completionDocument = await getDoc(doc(db, 'courses', courseDocument.id, 'assignments', assignmentDocument.id, 'completion', user!.uid));
  //         completed = completionDocument.exists() && completionDocument.get('completed');
  //       }
        
  //       assignments.push({
  //         id: assignmentDocument.id,
  //         number,
  //         name,
  //         date: date_due.toDate(),
  //         completed,
  //       });
  //     }
  //   }
    
  //   setCourses(courses);
  //   setAssignments(assignments);
  // });
  
  const { headerFont } = useDyslexic();
  const [createOpened, { toggle: toggleCreate, close: closeCreate }] = useDisclosure(false);
  const [editOpened, { toggle: toggleEdit, close: closeEdit }] = useDisclosure(false);
  const [selectedCourse, selectCourse] = useState<string>('');
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      number: '',
      name: '',
      icon: '0',
      color: '0',
    },
    validate: courseValidation,
  });
  
  const openEdit = (courseID: string) => {
    const course = courses.find((c) => c.id === courseID);
    selectCourse(courseID);
    toggleEdit();
    
    form.setValues({
      number: course.number,
      name: course.name,
      icon: `${course.icon}`,
      color: `${course.color}`,
    });
  };
  
  const createCourse = async ({ number, name, icon, color }:
    { number: string, name: string, icon: string, color: string }) => {
    try {
      const course: any = {
        id: crypto.randomUUID(),
        number,
        name,
        icon: Number(icon),
        color: Number(color),
      };
      
      const { error: courseError } = await supabase.from('courses')
        .insert({ ...course, assignment_types: [] });
      
      if (courseError) {
        showNotification(false, 'Failed to create course', 'Sorry, we couldn\'t create the course');
        return;
      }
      
      const { error: connectionError } = await supabase.from('people_to_courses').insert({
        person_id: user.id,
        course_id: course.id,
        role: 2,
        sections: [],
      });
      
      if (connectionError) {
        showNotification(false, 'Failed to create course', 'Sorry, we couldn\'t create the course');
        console.log(connectionError);
        return;
      }
      
      setCourses([...courses, course]);
      closeCreate();
      form.reset();
    } catch (error) {
      showNotification(false, 'Failed to create course', 'Sorry, we couldn\'t create the course');
      console.log(error);
    }
  };
  
  const editCourse = async ({ number, name, icon, color }:
    { number: string, name: string, icon: string, color: string }) => {
    try {
      const course: any = { number, name, icon: Number(icon), color: Number(color) };
      
      const { error } = await supabase.from('courses').update({ ...course }).eq('id', selectedCourse);
      
      if (error) {
        showNotification(false, 'Failed to save details', 'Sorry, we couldn\'t save the changes to your details');
        console.log(error);
        return;
      }
      
      course.id = selectedCourse;
      setCourses([...courses.filter((c) => c.id !== selectedCourse), course]);
      closeEdit();
    } catch (error) {
      showNotification(false, 'Failed to edit course', 'Sorry, we couldn\'t edit the course');
      console.log(error);
    }
  };
  
  return <>
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Group
          justify="space-between"
          mb="md"
        >
          <Title
            order={1}
            c="green"
          >
            your courses
          </Title>
          {
            user?.role === 1 && <Button
              color="blue"
              leftSection={<FontAwesomeIcon icon={faPlus} />}
              onClick={toggleCreate}
            >
              create
            </Button>
          }
        </Group>
        
        <Grid align="stretch">
          {courses.toSorted((a, b) => a.name > b.name ? 1 : -1).map((course) => <Grid.Col
            key={course.id}
            span={{ base: 12, md: 6 }}
          >
            <Card
              withBorder
              bd={`0.25rem solid ${colors[course.color]}`}
              p="md"
              h="100%"
              className="hover-card theme-text"
            >
              <Stack
                justify="center"
                mb="md"
                gap={0}
              >
                <FontAwesomeIcon
                  icon={icons[course.icon]}
                  size="5x"
                />
                <Text
                  size="xl"
                  fw={500}
                  ff={headerFont}
                  ta="center"
                  mt="md"
                >{course.number}</Text>
                <Text
                  size="lg"
                  fw={500}
                  ff={headerFont}
                  ta="center"
                >{course.name}</Text>
              </Stack>
              <Group
                mt="auto"
                justify="center"
              >
                <Link
                  href={`/course/${course.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    color={colors[course.color]}
                    leftSection={<FontAwesomeIcon icon={faEye} />}
                  >view</Button>
                </Link>
                {
                  user?.role === 1 && <Button
                    color={colors[course.color]}
                    variant="outline"
                    leftSection={<FontAwesomeIcon icon={faPencil} />}
                    onClick={() => openEdit(course.id)}
                  >edit</Button>
                }
              </Group>
            </Card>
          </Grid.Col>)}
        </Grid>
      </Grid.Col>
      
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card>
          <Title
            order={2}
            c="pink"
          >
            upcoming assignments
          </Title>
          {
            user?.role === 0 && <Text mt="md">
              You may have late assignments left to do. This list only shows upcoming assignments. Make sure you view the individual courses to see all of your assignments
            </Text>
          }
          <Text
            display={assignments.length ? 'none' : 'block'}
            mt="md"
          >No assignments are coming up</Text>
          <Card.Section
            display={assignments.length ? 'block' : 'none'}
            mah={350}
            className="scroll-y"
            mt="md"
            mb={0}
            px="md"
          >
            <Stack>
              {assignments.toSorted((a, b) => a.date.getTime() > b.date.getTime() ? 1 : -1).map((assignment) => <Stack
                key={assignment.id}
                gap={0}
              >
                <Text size="lg">
                  <strong style={{ color: assignment.completed ? 'var(--mantine-color-green-text)' : '' }}>{assignment.number}</strong>
                  &nbsp;{assignment.name}
                  <span style={{ color: assignment.completed ? 'var(--mantine-color-green-text)' : '' }}>{(assignment.completed ? ' (completed)' : '')}</span>
                </Text>
                <Text>{formatDateWithTime(assignment.date)}</Text>
              </Stack>)}
            </Stack>
          </Card.Section>
        </Card>
        <Card mt="md">
          <Title
            order={2}
            c="blue"
          >
            upcoming study sessions
          </Title>
          <Text
            display={sessions.length ? 'none' : 'block'}
            mt="md"
          >No study sessions are coming up</Text>
          <Card.Section
            display={sessions.length ? 'block' : 'none'}
            mah={350}
            className="scroll-y"
            mt="md"
            mb={0}
            px="md"
          >
            <Stack>
              {sessions.toSorted((a, b) => a.startTime.getTime() > b.startTime.getTime() ? 1 : -1).map((session) => <Stack
                key={session.id}
                gap={0}
              >
                <Text size="lg"><strong>{session.number}</strong> at {session.location}</Text>
                <Text>{formatDateWithTime(session.startTime)}, until {formatTime(session.endTime)}</Text>
              </Stack>)}
            </Stack>
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
    
    <Modal
      opened={createOpened}
      onClose={closeCreate}
      title={<Text
        fw={700}
        ff={headerFont}
      >create course</Text>}
    >
      <form onSubmit={form.onSubmit(createCourse)}>
        <TextInput
          key={form.key('number')}
          {...form.getInputProps('number')}
          label="number"
          placeholder="MATH 101"
          data-autofocus
        />
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
          label="name"
          placeholder="Calculus 1"
          mt="md"
        />
        <Radio.Group
          key={form.key('color')}
          {...form.getInputProps('color')}
          mt="md"
        >
          <Group justify="flex-start">
            {colors.map((color, i) => <Radio.Card
              key={color}
              value={`${i}`}
              radius="xl"
              className="unchecked-no-border"
              w={rem(36)}
              h={rem(36)}
              bg={color}
            >
            </Radio.Card>)}
          </Group>
        </Radio.Group>
        <Radio.Group
          key={form.key('icon')}
          {...form.getInputProps('icon')}
          mt="md"
        >
          <Group justify="flex-start">
            {icons.map((icon, i) => <Radio.Card
              key={i}
              value={`${i}`}
              radius="xl"
              className="checked-border"
              w="auto"
            >
              <ActionIcon
                component='div'
                variant="transparent"
                size="xl"
              >
                <FontAwesomeIcon
                  icon={icon}
                  size="xl"
                  className="theme-text"
                />
              </ActionIcon>
            </Radio.Card>)}
          </Group>
        </Radio.Group>
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeCreate}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faPlus} />}
          >
            create
          </Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={editOpened}
      onClose={closeEdit}
      title={<Text
        fw={700}
        ff={headerFont}
      >edit course</Text>}
    >
      <form onSubmit={form.onSubmit(editCourse)}>
        <TextInput
          key={form.key('number')}
          {...form.getInputProps('number')}
          label="number"
          placeholder="MATH 101"
          data-autofocus
        />
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
          label="name"
          placeholder="Calculus 1"
          mt="md"
        />
        <Radio.Group
          key={form.key('color')}
          {...form.getInputProps('color')}
          mt="md"
        >
          <Group justify="flex-start">
            {colors.map((color, i) => <Radio.Card
              key={color}
              value={`${i}`}
              radius="xl"
              className="unchecked-no-border"
              w={rem(36)}
              h={rem(36)}
              bg={color}
            >
            </Radio.Card>)}
          </Group>
        </Radio.Group>
        <Radio.Group
          key={form.key('icon')}
          {...form.getInputProps('icon')}
          mt="md"
        >
          <Group justify="flex-start">
            {icons.map((icon, i) => <Radio.Card
              key={i}
              value={`${i}`}
              radius="xl"
              className="checked-border"
              w="auto"
            >
              <ActionIcon
                component='div'
                variant="transparent"
                size="xl"
              >
                <FontAwesomeIcon
                  icon={icon}
                  size="xl"
                  className="theme-text"
                />
              </ActionIcon>
            </Radio.Card>)}
          </Group>
        </Radio.Group>
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeEdit}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faPencil} />}
          >
            edit
          </Button>
        </Group>
      </form>
    </Modal>
  </>;
}
