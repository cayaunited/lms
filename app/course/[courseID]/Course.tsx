'use client';

import { useContext } from 'react';
import { Tabs } from '@mantine/core';
import { TabContext } from '@/lib/tabContext';
import ArticlesTab from './ArticlesTab';
import AssignmentsTab from './AssignmentsTab';
import SessionsTab from './SessionsTab';
import PeopleTab from './PeopleTab';
import GradesTab from './GradesTab';
import DiscussionsTab from './DiscussionsTab';

export default function Course({ courseID }: { courseID: string }) {
  const tab = useContext(TabContext);
  
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
      
      <PeopleTab />
      
      <Tabs.Panel value="reports">
        reports
      </Tabs.Panel>
    </Tabs>
  </>;
}
