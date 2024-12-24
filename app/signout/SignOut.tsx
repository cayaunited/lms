'use client';

import { useContext, useEffect } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Grid,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { AvatarDispatchContext } from '@/lib/avatarContext';

export default function SignOut() {
  const dispatchAvatar = useContext(AvatarDispatchContext);
  useEffect(() => dispatchAvatar({ type: 'changed', avatar: -1 }), []);
  
  return <>
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title
          order={1}
          c="green"
          ta="center"
          mb="xl"
        >
          sign out
        </Title>
        <Text ta="center">See you later, thanks for coming!</Text>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          alt=""
          width={300}
          height={300}
          hiddenFrom="md"
          mt="md"
        />
        <Text
          ta="center"
          mt="md"
        >
          Didn't mean to sign out?&nbsp;
          <Anchor
            component={Link}
            href="/signin"
          >Sign in here</Anchor>
        </Text>
      </Grid.Col>
      
      <Grid.Col
        visibleFrom="md"
        span={{ base: 12, md: 8 }}
      >
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          alt=""
          width={700}
          height={700}
        />
      </Grid.Col>
    </Grid>
  </>;
}
