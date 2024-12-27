'use client';

import {
  Text,
} from '@mantine/core';

export default function Course({ courseID }: { courseID: string }) {
  // https://mantine.dev/hooks/use-document-title/
  
  return <>
    <Text>course for {courseID}</Text>
  </>;
}
