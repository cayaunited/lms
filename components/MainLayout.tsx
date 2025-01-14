'use client';

import { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Button,
  em,
  Group,
  MantineProvider,
  Tabs,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faComments,
  faExclamationCircle,
  faFileLines,
  faFolder,
  faPersonChalkboard,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@supabase/supabase-js';
import useTheme from '@/lib/useTheme';
import useDyslexic from '@/lib/useDyslexic';
import Navbar from './Navbar';
import Footer from './Footer';
import { AvatarContext, AvatarDispatchContext } from '@/lib/avatarContext';
import { createClient } from '@/lib/supabase/client';
import { TabContext, TabDispatchContext } from '@/lib/tabContext';

export default function MainLayout({ children }: { children: any }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  
  const [avatar, dispatchAvatar] = useReducer((avatar: number, action: any) => {
    if (action.type === 'changed') return action.avatar;
    return -1;
  }, -1);
  
  const [tab, dispatchTab] = useReducer((tab: number, action: any) => {
    if (action.type === 'changed') return action.tab;
    return 'materials';
  }, 'materials');
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data?.user);
        
        if (avatar < 0 && data?.user) {
          const { data: peopleData } = await supabase.from('people').select('avatar').eq('id', data.user.id);
          if (!peopleData || peopleData.length === 0) return;
          dispatchAvatar({ type: 'changed', avatar: peopleData[0].avatar });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pathname]);
  
  const { theme, resolver } = useTheme();
  const { headerFont } = useDyslexic();
  const [navigationOpened, { toggle: toggleNavigation }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(992)})`);
  const isCourseDashboard = pathname.match(/^\/course\/([a-zA-Z0-9]|\-)+$/);
  const shouldShowTabs = isCourseDashboard && (!navigationOpened || !isMobile);
  
  return <MantineProvider
    cssVariablesResolver={resolver}
    defaultColorScheme="dark"
    theme={theme}
  >
    <AvatarContext.Provider value={avatar}>
      <AvatarDispatchContext.Provider value={dispatchAvatar}>
        <TabContext.Provider value={tab}>
          <TabDispatchContext.Provider value={dispatchTab}>
            <Notifications />
            
            <AppShell
              header={{ height: 60 + (shouldShowTabs ? 44 : 0) }}
              footer={{ height: 60 }}
              navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !navigationOpened, desktop: !navigationOpened } }}
              padding="md"
              layout={isMobile ? 'default' : 'alt'}
            >
              <AppShell.Header>
                <Group
                  h={60}
                  px="md"
                  justify="space-between"
                >
                  <Group>
                    <Button
                      onClick={toggleNavigation}
                      variant="transparent"
                      p={0}
                      radius={0}
                      w={36}
                      c="green"
                    >
                      <FontAwesomeIcon
                        icon={navigationOpened ? faXmark : faBars }
                        size="2x"
                      />
                    </Button>
                    <Anchor
                      component={Link}
                      href="/"
                      variant="gradient"
                      gradient={{ from: 'green', to: 'blue' }}
                      fw={700}
                      ff={headerFont}
                      size="lg"
                    >Caya</Anchor>
                  </Group>
                  
                  <Group>
                    <Button
                      visibleFrom="md"
                      display={user ? 'none' : 'block'}
                      component={Link}
                      href="/signin"
                      color="pink"
                      leftSection={<FontAwesomeIcon icon={faRightToBracket} />}
                    >
                      sign in
                    </Button>
                    <Button
                      visibleFrom="md"
                      display={user ? 'none' : 'block'}
                      component={Link}
                      href="/signup"
                      color="pink"
                      variant="outline"
                      leftSection={<FontAwesomeIcon icon={faUserPlus} />}
                    >
                      sign up
                    </Button>
                    <Button
                      visibleFrom="md"
                      display={user ? 'block' : 'none'}
                      component={Link}
                      href="/signout"
                      color="pink"
                      variant="outline"
                      leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
                    >
                      sign out
                    </Button>
                    <ActionIcon
                      display={user ? 'block' : 'none'}
                      component={Link}
                      href="/profile"
                      size="lg"
                      variant="transparent"
                    >
                      <Avatar
                        src={`/avatars/${avatar >= 0 ? avatar : 0}.png`}
                        alt=""
                      />
                    </ActionIcon>
                  </Group>
                </Group>
                <Tabs
                  display={shouldShowTabs ? 'block' : 'none'}
                  value={tab}
                  onChange={(value) => dispatchTab({ type: 'changed', tab: value })}
                >
                  <Tabs.List>
                    <Tabs.Tab
                      value="materials"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faFolder} size="lg" />}
                    >materials</Tabs.Tab>
                    <Tabs.Tab
                      value="articles"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faFileLines} size="lg" />}
                    >articles</Tabs.Tab>
                    <Tabs.Tab
                      value="discussions"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faComments} size="lg" />}
                    >discussions</Tabs.Tab>
                    <Tabs.Tab
                      value="sessions"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faPersonChalkboard} size="lg" />}
                    >study sessions</Tabs.Tab>
                    <Tabs.Tab
                      value="people"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faUsers} size="lg" />}
                    >people</Tabs.Tab>
                    <Tabs.Tab
                      value="reports"
                      fz="md"
                      leftSection={<FontAwesomeIcon icon={faExclamationCircle} size="lg" />}
                    >reports</Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </AppShell.Header>
              
              <Navbar
                user={user}
                navigationOpened={navigationOpened}
                toggleNavigation={toggleNavigation}
              />
              
              <AppShell.Main>{children}</AppShell.Main>
              
              <Footer />
            </AppShell>
          </TabDispatchContext.Provider>
        </TabContext.Provider>
      </AvatarDispatchContext.Provider>
    </AvatarContext.Provider>
  </MantineProvider>;
}