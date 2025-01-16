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

export default function Course({ courseID }: { courseID: string }) {
  const tab = useContext(TabContext);
  
  return <>
    <Tabs value={tab}>
      <Tabs.Panel value="materials">
        materials
      </Tabs.Panel>
      
      <ArticlesTab />
      
      <Tabs.Panel value="discussions">
        discussions
      </Tabs.Panel>
      
      <AssignmentsTab />
      
      <SessionsTab />
      
      <Tabs.Panel value="grades">
        grades
      </Tabs.Panel>
      
      <Tabs.Panel value="people">
        people
      </Tabs.Panel>
      
      <Tabs.Panel value="reports">
        reports
      </Tabs.Panel>
    </Tabs>
  </>;
}
