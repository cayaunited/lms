'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppShell,
  Button,
  Group,
  Indicator,
  NavLink,
  ScrollArea,
  useMatches,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCircleQuestion,
  faEye,
  faHandsPraying,
  faHouse,
  faList,
  faNewspaper,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserLock,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ user, navigationOpened, toggleNavigation }:
  { user: any, navigationOpened: boolean, toggleNavigation: () => void }) {
  const links = [
    {
      label: 'dashboard',
      href: '/dashboard',
      icon: faHouse,
      requiresAccount: true,
    },
    {
      label: 'profile',
      href: '/profile',
      icon: faUser,
      requiresAccount: true,
    },
    {
      label: 'notifications',
      href: '/notifications',
      icon: faBell,
      requiresAccount: true,
    },
    {
      label: 'help',
      href: '/help',
      icon: faCircleQuestion,
      requiresAccount: false,
    },
    {
      label: 'privacy policy',
      href: '/privacy',
      icon: faUserLock,
      requiresAccount: false,
    },
    {
      label: 'terms of service',
      href: '/terms',
      icon: faList,
      requiresAccount: false,
    },
  ];
  
  const pathname = usePathname();
  const isMobile = useMatches({ base: true, sm: false });
  
  useEffect(() => {
    if (navigationOpened && isMobile) toggleNavigation();
  }, [pathname]);
  
  return <AppShell.Navbar>
    <AppShell.Section grow component={ScrollArea}>
      {
        links.map((link) => {
          if (link.requiresAccount && !user) return;
          const isActive = pathname == link.href;
          
          return <NavLink
            key={link.href}
            component={Link}
            href={link.href}
            label={link.label}
            active={isActive}
            color="blue"
            variant="filled"
            leftSection={<Indicator
              aria-hidden="true"
              disabled={isActive || link.href !== '/notifications'}
              label={1}
              color="pink"
              ta="center"
              w={24}
              h={24}
              size={24}
            >
              <FontAwesomeIcon
                icon={link.icon}
                height={24}
              />
            </Indicator>}
          />;
        })
      }
    </AppShell.Section>
    <AppShell.Section hiddenFrom="md">
      <Group
        justify="center"
        p="md"
      >
        <Button
          display={user ? 'none' : 'block'}
          component={Link}
          href="/signin"
          color="pink"
          leftSection={<FontAwesomeIcon icon={faRightToBracket} />}
        >
          sign in
        </Button>
        <Button
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
          display={user ? 'block' : 'none'}
          component={Link}
          href="/signout"
          color="pink"
          variant="outline"
          leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
        >
          sign out
        </Button>
      </Group>
    </AppShell.Section>
  </AppShell.Navbar>;
}
