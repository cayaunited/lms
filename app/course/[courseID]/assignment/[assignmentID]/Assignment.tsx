'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  em,
  Group,
  Modal,
  rem,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure, useDocumentTitle, useMediaQuery } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faListOl,
  faPencil,
  faTrashCan,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import IconListItem from '@/components/IconListItem';
import { formatDate, formatDateWithTime } from '@/lib/formatDate';
import RichEditor from '@/components/RichEditor';
import useDyslexic from '@/lib/useDyslexic';
import showNotification from '@/lib/showNotification';
import assignmentValidation from '@/lib/validation/assignment';
import { createClient } from '@/lib/supabase/client';
import colors from '@/lib/colors';
import assignmentIcons from '@/lib/assignmentIcons';

export default function Assignment({ courseID, assignmentID }: { courseID: string, assignmentID: string }) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [assignment, setAssignment] = useState<any>(null);
  
  const { headerFont, bodyFont } = useDyslexic();
  const isMobile = useMediaQuery(`(max-width: ${em(992)})`);
  const [editable, setEditable] = useState(false);
  const [editor, setEditor] = useState<any>(null);
  const [deleteOpened, { toggle: toggleDelete, close: closeDelete }] = useDisclosure(false);
  
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      type: 'homework',
      dateDue: new Date(),
      section: 'all',
    },
    validate: assignmentValidation,
  });
  
  const toggleEditable = () => {
    setEditable(!editable);
    editor.setEditable(!editable);
    if (!assignment) return;
    
    if (editable) editor.commands.setContent(assignment.content);
    else {
      form.setFieldValue('name', assignment.name);
      form.setFieldValue('type', assignment.type);
      form.setFieldValue('dateDue', assignment.dateDue);
      form.setFieldValue('section', assignment.section);
    }
  };
  
  const [pageTitle, setPageTitle] = useState('new assignment | Caya');
  useDocumentTitle(pageTitle);
  const router = useRouter();
  
  useEffect(() => {
    if (!editor) return;
    
    (async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        const uid = userData.user.id;
        
        const { data: connectionData, error: connectionError } = await supabase.from('people_to_courses')
          .select('role').eq('person_id', uid).eq('course_id', courseID);
        
        if (connectionError) {
          showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
          console.log(connectionError);
          return;
        }
        
        setUser({ id: uid, role: connectionData[0].role });
        const { data: courseData, error: courseError } = await supabase.from('courses')
          .select('assignment_types').eq('id', courseID);
        
        if (courseError) {
          showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
          console.log(courseError);
          return;
        }
        
        const { data: sectionsData, error: sectionsError } = await supabase.from('people_to_courses')
          .select('sections').eq('course_id', courseID);
        
        if (sectionsError) {
          showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
          console.log(sectionsError);
          return;
        }
        
        const { assignment_types } = courseData[0];
        const sections: string[] = [];
        
        sectionsData.forEach((course) => {
          course.sections.forEach((section: string) => {
            if (!sections.includes(section)) sections.push(section);
          });
        });
        
        setCourse({ assignment_types, sections });
        
        if (assignmentID === 'new') {
          setAssignment({
            name: 'New Assignment',
            type: assignment_types.length > 0 ? assignment_types[0].name : '',
            dateCreated: new Date(),
            dateUpdated: new Date(),
            dateDue: new Date(),
            section: 'all',
            content: '',
          });
          
          if (connectionData[0].role > 0) toggleEditable();
        } else {
          const { data: assignmentData, error: assignmentError } = await supabase.from('assignments')
            .select().eq('id', assignmentID);
          
          if (assignmentError) {
            showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
            console.log(assignmentError);
            return;
          }
          
          const { name, type, date_created, date_updated, date_due, section, content } = assignmentData[0];
          
          setAssignment({
            id: assignmentID,
            name,
            type,
            dateCreated: new Date(date_created),
            dateUpdated: new Date(date_updated),
            dateDue: new Date(date_due),
            section,
            content,
          });
          
          setPageTitle(`${name} | Caya`);
          editor.commands.setContent(content);
        }
      } catch (error) {
        showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
        console.log(error);
      }
    })();
  }, [editor]);
  
  // searchFirestore(() => {
  //   if (assignmentID === 'new') return null;
  //   return doc(db, 'courses', courseID, 'assignments', assignmentID);
  // }, async (q: any) => {
  //   let courseTeachers: any[] = [];
  //   let courseAssistants: any[] = [];
    
  //   try {
  //     const courseDocument = await getDoc(doc(db, 'courses', courseID));
  //     if (!courseDocument.exists()) return;
  //     const { teachers, assistants, sections } = courseDocument.data() as any;
      
  //     courseTeachers = teachers;
  //     courseAssistants = assistants;
  //     setCourse({ teachers, assistants, sections });
  //   } catch (error) {
  //     showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
  //     console.error(error);
  //   }
      
  //   const userToken = await user!.getIdTokenResult();
  //   const role = userToken.claims.isStudent ? 'student' : 'teacher';
  //   const canEdit = role === 'teacher' && courseTeachers.includes(user!.uid)
  //     || role === 'student' && courseAssistants.includes(user!.uid);
    
  //   if (!q) {
  //     setAssignment({
  //       name: 'New Assignment',
  //       type: assignmentTypes[0].name,
  //       dateCreated: new Date(),
  //       dateUpdated: new Date(),
  //       dateDue: new Date(),
  //       section: 'all',
  //       content: '',
  //     });
      
  //     if (canEdit) toggleEditable();
  //     return;
  //   }
    
  //   try {
  //     const assignmentDocument = await getDoc(q);
  //     if (!assignmentDocument.exists()) return;
  //     const { name, type, date_created, date_updated, date_due, section, content } = assignmentDocument.data() as any;
      
  //     setPageTitle(`${name} | Caya`);
  //     editor.commands.setContent(content);
  //     let completed = undefined;
      
  //     if (!canEdit) {
  //       const completionDocument = await getDoc(doc(db, 'courses', courseID, 'assignments', assignmentID, 'completion', user!.uid));
  //       completed = completionDocument.exists() && completionDocument.get('completed');
  //     }
      
  //     setAssignment({
  //       id: assignmentID,
  //       name,
  //       type,
  //       dateCreated: date_created.toDate(),
  //       dateUpdated: date_updated.toDate(),
  //       dateDue: date_due.toDate(),
  //       section,
  //       content,
  //       completed,
  //     });
  //   } catch (error) {
  //     showNotification(false, 'Failed to load assignment', 'Sorry, we couldn\'t load the assignment');
  //     console.error(error);
  //   }
  // });
  
  const assignmentType = (course && course.assignment_types
    && course.assignment_types.find((type: any) => type.name === assignment?.type))
    ?? {
      name: 'homework',
      icon: 0,
      color: 6,
    };
  const canEdit = user?.role > 0;
  
  const saveAssignment = async ({ name, type, dateDue, section }:
    { name: string, type: string, dateDue: Date, section: string }) => {
    const content = editor.getHTML();
    let id = null;
    
    try {
      setPageTitle(`${name} | Caya`);
      
      if (!assignment.id) {
        id = crypto.randomUUID();
        
        const { error: insertError } = await supabase.from('assignments').insert({
          id,
          course_id: courseID,
          name,
          type,
          date_created: new Date(),
          date_updated: new Date(),
          date_due: dateDue,
          content,
          section,
        });
        
        if (insertError) {
          showNotification(false, 'Failed to create assignment', 'Sorry, we couldn\'t create the assignment');
          console.log(insertError);
          return;
        }
      } else {
        const { error: updateError } = await supabase.from('assignments').update({
          name,
          type,
          date_updated: new Date(),
          date_due: dateDue,
          content,
          section,
        }).eq('id', assignment.id);
        
        if (updateError) {
          showNotification(false, 'Failed to save assignment', 'Sorry, we couldn\'t save the assignment');
          console.log(updateError);
          return;
        }
      }
      
      setEditable(false);
      editor.setEditable(false);
      
      setAssignment({
        ...assignment,
        id: assignment.id ? assignment.id : id,
        name,
        type,
        content,
        section,
        dateCreated: assignment.id ? assignment.dateCreated : new Date(),
        dateUpdated: new Date(),
        dateDue,
      });
    } catch (error) {
      const action = assignment.id ? 'save' : 'create';
      showNotification(false, `Failed to ${action} assignment`, `Sorry, we couldn't ${action} the assignment`);
      console.error(error);
    }
  };
  
  const deleteAssignment = async () => {
    try {
      const { error: deleteError } = await supabase.from('assignments')
        .delete().eq('id', assignment.id);
      
      if (deleteError) {
        showNotification(false, 'Failed to delete assignment', 'Sorry, we couldn\'t delete your assignment');
        console.log(deleteError);
        return;
      }
      
      router.push(`/course/${courseID}`);
    } catch (error) {
      showNotification(false, 'Failed to delete assignment', 'Sorry, we couldn\'t delete the assignment');
      console.error(error);
    }
  };
  
  const toggleCompleted = async () => {
    try {
      // await setDoc(doc(db, 'courses', courseID, 'assignments', assignment.id, 'completion', user!.uid),
      //   { completed: !assignment.completed }, { merge: true });
      setAssignment({ ...assignment, completed: !assignment.completed });
    } catch (error) {
      showNotification(false, 'Failed to toggle completed', 'Sorry, we couldn\'t toggle the assignment completion');
      console.error(error);
    }
  };
  
  return <>
    <Title
      order={1}
      className="theme-text"
      mb="md"
    >
      {assignment?.name}
    </Title>
    <IconListItem
      icon={assignmentIcons[assignmentType.icon]}
      color={colors[assignmentType.color]}
      text={assignmentType.name}
      mb="xs"
    />
    <IconListItem
      icon={faCalendar}
      color="pink"
      text={`due on ${formatDateWithTime(assignment?.dateDue ?? new Date())}`}
      mb="xs"
    />
    <IconListItem
      icon={faListOl}
      color="blue"
      text={`for ${assignment
        ? (assignment.section === 'all' ? 'all sections' : 'section ' + assignment.section)
        : 'all sections'}`}
      mb="md"
    />
    <Group
      justify="space-between"
      mb={(isMobile && !canEdit) ? 0 : 'md'}
    >
      {
        canEdit && assignment?.id && <Group>
          <Button
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={editable ? faXmark : faPencil} />}
            onClick={toggleEditable}
          >{editable ? 'cancel editing' : 'edit assignment'}</Button>
          <Button
            color="red"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={toggleDelete}
          >delete assignment</Button>
        </Group>
      }
      <Text
        visibleFrom="md"
        ta="right"
      >
        created on {formatDate(assignment?.dateCreated ?? new Date())},
        last updated on {formatDateWithTime(assignment?.dateUpdated ?? new Date())}
      </Text>
    </Group>
    <Text
      hiddenFrom="md"
      mb="md"
    >
      created on {formatDate(assignment?.dateCreated ?? new Date())},
      last updated on {formatDateWithTime(assignment?.dateUpdated ?? new Date())}
    </Text>
    
    {/* {
      !canEdit && <Checkbox
        label="completed"
        mb="md"
        checked={assignment?.completed ?? false}
        disabled={!assignment}
        icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
        onClick={toggleCompleted}
      />
    } */}
    
    <form onSubmit={form.onSubmit(saveAssignment)}>
      <TextInput
        key={form.key('name')}
        {...form.getInputProps('name')}
        label="name"
        placeholder="Homework 1"
        display={editable ? 'block' : 'none'}
        mb="md"
      />
      <Select
        key={form.key('type')}
        {...form.getInputProps('type')}
        label="type"
        display={editable ? 'block' : 'none'}
        mb="md"
        data={course?.assignment_types.map((type: any) => type.name)}
      />
      <DateTimePicker
        key={form.key('dateDue')}
        {...form.getInputProps('dateDue')}
        label="due date"
        mb="md"
        display={editable ? 'block' : 'none'}
      />
      <Select
        key={form.key('section')}
        {...form.getInputProps('section')}
        label="section"
        display={editable ? 'block' : 'none'}
        mb="md"
        data={['all', ...(course?.sections ?? [])]}
      />
      <RichEditor
        defaultContent={assignment?.content}
        characterLimit={assignmentValidation.contentCharacterLimit}
        showControls={editable}
        setEditor={setEditor}
      />
      <Button
        color="green"
        type="submit"
        leftSection={<FontAwesomeIcon icon={faPencil} />}
        display={editable ? 'block' : 'none'}
        mt="md"
      >save assignment</Button>
    </form>
    
    {
      canEdit && <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title={
          <Text
            ff={headerFont}
            fw={700}
          >
            <FontAwesomeIcon
              icon={faWarning}
              color="var(--mantine-color-orange-text)"
              style={{ marginRight: rem(16) }}
              size="xl"
            />
            delete assignment
          </Text>
        }
        ff={bodyFont}
      >
        <Text mb="md">
          Are you sure you want to delete this assignment?
        </Text>
        <Group justify="space-between">
          <Button
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeDelete}
          >cancel</Button>
          <Button
            variant="outline"
            color="red"
            leftSection={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={deleteAssignment}
          >delete</Button>
        </Group>
      </Modal>
    }
  </>;
}
