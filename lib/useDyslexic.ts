'use client';

import { useLocalStorage } from '@mantine/hooks';
import {
  lexend,
  ubuntu,
  ubuntuMono,
  openDyslexic,
  openDyslexicMono,
} from '@/fonts/fonts';

export default function useDyslexic() {
  const [isDyslexic, setDyslexic] = useLocalStorage({
    key: 'dyslexic',
    defaultValue: 'false',
  });
  
  const headerFont = isDyslexic === 'true'
    ? openDyslexic.style.fontFamily
    : lexend.style.fontFamily;
  const bodyFont = isDyslexic === 'true'
    ? openDyslexic.style.fontFamily
    : ubuntu.style.fontFamily;
  const monoFont = isDyslexic === 'true'
    ? openDyslexicMono.style.fontFamily
    : ubuntuMono.style.fontFamily;
  
  return {
    isDyslexic: isDyslexic === 'true',
    toggleDyslexic: () => setDyslexic(isDyslexic === 'true' ? 'false' : 'true'),
    headerFont,
    bodyFont,
    monoFont,
    dyslexicFont: openDyslexic.style.fontFamily,
  };
}
