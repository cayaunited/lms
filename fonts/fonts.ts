import { Lexend, Roboto, Ubuntu, Ubuntu_Mono } from 'next/font/google';
import localFont from 'next/font/local';
 
export const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
});

export const roboto = Roboto({
  weight: ['500'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const ubuntu = Ubuntu({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const ubuntuMono = Ubuntu_Mono({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const openDyslexic = localFont({
  src: [
    {
      path: './opendyslexic/OpenDyslexic-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './opendyslexic/OpenDyslexic-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './opendyslexic/OpenDyslexic-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './opendyslexic/OpenDyslexic-Bold-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

export const openDyslexicMono = localFont({
  src: './opendyslexic/OpenDyslexicMono-Regular.otf',
  display: 'swap',
});
