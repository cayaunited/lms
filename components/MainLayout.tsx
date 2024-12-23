'use client';

import { useReducer } from 'react';
import Link from 'next/link';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Button,
  Group,
  MantineProvider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import useTheme from '@/lib/useTheme';
import useDyslexic from '@/lib/useDyslexic';
import Navbar from './Navbar';
import Footer from './Footer';
import { AvatarContext, AvatarDispatchContext } from '@/lib/avatarContext';

export function MainLayout({ children }:{ children: any }) {
  let user = null;
  
  const [avatar, dispatchAvatar] = useReducer((avatar: number, action: any) => {
    if (action.type === 'changed') return action.avatar;
    return 0;
  }, 0);
  
  const { theme, resolver } = useTheme();
  const { headerFont } = useDyslexic();
  const [navigationOpened, { toggle: toggleNavigation }] = useDisclosure();
  
  return <MantineProvider
    cssVariablesResolver={resolver}
    defaultColorScheme="dark"
    theme={theme}
  >
    <AvatarContext.Provider value={avatar}>
      <AvatarDispatchContext.Provider value={dispatchAvatar}>
        <Notifications />
        
        <AppShell
          header={{ height: 60 }}
          footer={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !navigationOpened, desktop: !navigationOpened } }}
          padding="md"
        >
          <AppShell.Header>
            <Group
              h="100%"
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
                    src={`/avatars/${avatar}.png`}
                    alt=""
                  />
                </ActionIcon>
              </Group>
            </Group>
          </AppShell.Header>
          
          <Navbar
            user={user}
            navigationOpened={navigationOpened}
            toggleNavigation={toggleNavigation}
          />
          
          <AppShell.Main>{children}</AppShell.Main>
          
          <Footer />
        </AppShell>
      </AvatarDispatchContext.Provider>
    </AvatarContext.Provider>
  </MantineProvider>;
}