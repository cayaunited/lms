'use client';

import { useContext, useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { TabContext } from '@/lib/tabContext';
import ArticlesTab from './ArticlesTab';
import AssignmentsTab from './AssignmentsTab';
import SessionsTab from './SessionsTab';
import PeopleTab from './PeopleTab';
import GradesTab from './GradesTab';
import DiscussionsTab from './DiscussionsTab';
import { createClient } from '@/lib/supabase/client';
import showNotification from '@/lib/showNotification';
import { CourseDispatchContext } from '@/lib/courseContext';

export default function Course({ courseID }: { courseID: string }) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [teacherIDs, setTeacherIDs] = useState<string[]>([]);
  const [assistantIDs, setAssistantIDs] = useState<string[]>([]);
  const [studentIDs, setStudentIDs] = useState<string[]>([]);
  const [peopleByID, setPeopleByID] = useState<any>({});
  const dispatchCourse = useContext(CourseDispatchContext);
  
  const tab = useContext(TabContext);
  const [pageTitle, setPageTitle] = useState('course dashboard | Caya');
  useDocumentTitle(pageTitle);
  
  useEffect(() => {
    (async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        const uid = userData.user.id;
        
        const { data: connectionData, error: connectionError } = await supabase.from('people_to_courses')
          .select('role, sections').eq('person_id', uid).eq('course_id', courseID);
        
        if (connectionError) {
          showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
          console.log(connectionError);
          return;
        }
        
        setUser({ id: uid, role: connectionData[0].role });
        
        const { data: courseData, error: courseError } = await supabase.from('courses')
          .select('number, name').eq('id', courseID);
        
        if (courseError) {
          showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
          console.log(courseError);
          return;
        }
        
        const { data: connections, error: connectionsError } = await supabase.from('people_to_courses')
          .select('person_id, role, sections').eq('course_id', courseID);
        
        if (connectionsError) {
          showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
          console.log(connectionsError);
          return;
        }
        
        const allSections: string[] = [];
        let mySections: string[] = [];
        const teachers: string[] = [];
        const assistants: string[] = [];
        const students: string[] = [];
        const people: any = {};
        
        for (const connection of connections) {
          const personID = connection.person_id;
          if (personID == uid) mySections = connection.sections;
          
          connection.sections.forEach((section: string) => {
            if (!allSections.includes(section)) allSections.push(section);
          });
          
          if (connection.role == 2) teachers.push(personID);
          else if (connection.role == 1) assistants.push(personID);
          else students.push(personID);
          
          const { data: personData, error: personError } = await supabase.from('people')
            .select().eq('id', personID);
          
          if (personError) {
            showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
            console.log(personError);
            return;
          }
          
          people[personID] = personData[0];
          people[personID].sections = connection.sections;
        }
        
        const { data: invites, error: invitesError } = await supabase.from('invites_to_courses')
          .select('person_email, role, sections').eq('course_id', courseID);
        
        if (invitesError) {
          showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
          console.log(connectionsError);
          return;
        }
        
        for (const invite of invites) {
          const { person_email, role, sections } = invite;
          
          sections.forEach((section: string) => {
            if (!allSections.includes(section)) allSections.push(section);
          });
          
          if (role == 2) teachers.push(person_email);
          else if (role == 1) assistants.push(person_email);
          else students.push(person_email);
          
          people[person_email] = {
            name: `Waiting for ${role === 2 ? 'teacher' : (role === 1 ? 'assistant' : 'student')} to accept invite...`,
            email: person_email,
            role,
            avatar: 0,
            sections,
            fromInvite: true,
          };
        }
        
        const { number, name } = courseData[0];
        setCourse({ id: courseID, number, name, allSections, mySections });
        setTeacherIDs(teachers);
        setAssistantIDs(assistants);
        setStudentIDs(students);
        setPeopleByID(people);
        setPageTitle(`${number} - ${name} | Caya`);
        dispatchCourse({ type: 'changed', course: { number, name } });
      } catch (error) {
        showNotification(false, 'Failed to load course', 'Sorry, we couldn\'t load the course');
        console.log(error);
      }
    })();
  }, []);
  
  return <>
    <Tabs value={tab}>
      <AssignmentsTab />
      
      <Tabs.Panel value="materials">
        materials
      </Tabs.Panel>
      
      <ArticlesTab />
      
      <DiscussionsTab />
      
      <SessionsTab />
      
      <GradesTab />
      
      <PeopleTab
        user={user}
        course={course}
        setCourse={setCourse}
        teacherIDs={teacherIDs}
        setTeacherIDs={setTeacherIDs}
        assistantIDs={assistantIDs}
        setAssistantIDs={setAssistantIDs}
        studentIDs={studentIDs}
        setStudentIDs={setStudentIDs}
        peopleByID={peopleByID}
        setPeopleByID={setPeopleByID}
      />
      
      <Tabs.Panel value="reports">
        reports
      </Tabs.Panel>
    </Tabs>
  </>;
}
