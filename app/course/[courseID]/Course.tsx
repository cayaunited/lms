'use client';

import { useContext } from 'react';
import {
  Tabs,
  Text,
} from '@mantine/core';
import { TabContext } from '@/lib/tabContext';
import ArticlesTab from './ArticlesTab';
import AssignmentsTab from './AssignmentsTab';
import SessionsTab from './SessionsTab';
import PeopleTab from './PeopleTab';

export default function Course({ courseID }: { courseID: string }) {
  const tab = useContext(TabContext);
  
  return <>
    <Tabs value={tab}>
      <AssignmentsTab />
      
      <Tabs.Panel value="materials">
        materials
      </Tabs.Panel>
      
      <ArticlesTab />
      
      <Tabs.Panel value="discussions">
        discussions
      </Tabs.Panel>
      
      <SessionsTab />
      
      <Tabs.Panel value="grades">
        grades
      </Tabs.Panel>
      
      <PeopleTab />
      
      <Tabs.Panel value="reports">
        reports
      </Tabs.Panel>
    </Tabs>
  </>;
}
