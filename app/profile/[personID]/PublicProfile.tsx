'use client';

import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import ProfileBasics from '../ProfileBasics';
import ProfileDetails from '../ProfileDetails';
import showNotification from '@/lib/showNotification';
import { createClient } from '@/lib/supabase/client';

export default function PublicProfile({ personID }:{ personID: string }) {
  const supabase = createClient();
  const [account, setAccount] = useState<any>({});
  const [pageTitle, setPageTitle] = useState('course dashboard | Caya');
  useDocumentTitle(pageTitle);
  
  useEffect(() => {
    (async () => {
      try {
        const { data: peopleData } = await supabase.from('people').select().eq('id', personID);
        if (!peopleData || peopleData.length === 0) return;
        const { data: profileData } = await supabase.from('profiles').select().eq('id', personID);
        if (!profileData || profileData.length === 0) return;
        
        const { name, role, avatar } = peopleData[0];
        const { biography, majors, minors, semesters, organizations, hobbies } = profileData[0];
        
        setAccount({
          id: personID,
          name,
          role,
          avatar,
          biography,
          majors,
          minors,
          semesters,
          organizations,
          hobbies,
        });
        
        setPageTitle(`${name} | Caya`);
      } catch (error) {
        showNotification(false, 'Failed to load profile', 'Sorry, we couldn\'t load your profile');
        console.log(error);
      }
    })();
  }, []);
  
  return <>
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <ProfileBasics
          account={account}
          personID={personID}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <ProfileDetails account={account} />
      </Grid.Col>
    </Grid>
  </>;
}
