'use client';

import {
  AppShell,
  Button,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useDyslexic from '@/lib/useDyslexic';

export default function Footer() {
  const { setColorScheme } = useMantineColorScheme();
  const { isDyslexic, toggleDyslexic, dyslexicFont } = useDyslexic();
  
  return <AppShell.Footer>
    <Group
      h="100%"
      px="md"
      justify="center"
    >
      <Button
        darkHidden
        color="blue"
        leftSection={<FontAwesomeIcon icon={faSun} />}
        onClick={() => setColorScheme('dark')}
      >
        light
      </Button>
      <Button
        lightHidden
        color="blue"
        leftSection={<FontAwesomeIcon icon={faMoon} />}
        onClick={() => setColorScheme('light')}
      >
        dark
      </Button>
      <Button
        color="blue"
        ff={dyslexicFont}
        leftSection={<FontAwesomeIcon icon={faBook} />}
        onClick={toggleDyslexic}
      >
        {isDyslexic ? 'dyslexic' : 'not dyslexic'}
      </Button>
    </Group>
  </AppShell.Footer>;
}
