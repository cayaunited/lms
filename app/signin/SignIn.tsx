'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '@/components/GoogleButton';
import EmailSignInButton from '@/components/EmailSignInButton';
import accountValidation from '@/lib/validation/account';
import showNotification from '@/lib/showNotification';

export default function SignIn({ signInWithEmail }: { signInWithEmail: any }) {
  const [typedEmail, setTypedEmail] = useState(false);
  
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: accountValidation.email,
      password: accountValidation.password,
    },
  });
  
  useEffect(() => {
    if (!typedEmail && form.values.email.length > 0) setTypedEmail(true);
  }, [form.values.email]);
  
  const router = useRouter();
  
  const signIn = async ({ email, password }:
    { email: string, password?: string }) => {
    try {
      const error = await signInWithEmail(email, password);
      
      if (error) {
        let errorName = 'Error';
        let message = error;
        
        switch (error) {
          case 'invalid_credentials':
            errorName = 'Incorrect email or password';
            message = 'The email or password you gave was incorrect. Try checking the spelling of your email and password';
            break;
        }
        
        showNotification(false, errorName, message);
      }
      else if (password) router.push('/dashboard');
      // else showNotification(true, 'Email sent', 'A sign in link was emailed to you');
    } catch (error) {
      showNotification(false, 'Failed to sign in', `${error}`);
    }
  };
  
  return <>
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Title
          order={1}
          c="green"
          ta="center"
          mb="xl"
        >
          sign in
        </Title>
        <Text ta="center">Welcome back, we are glad you are here!</Text>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          alt=""
          width={300}
          height={300}
          hiddenFrom="md"
          mt="md"
        />
        
        <form onSubmit={form.onSubmit(signIn)}>
          <TextInput
            key={form.key('email')}
            {...form.getInputProps('email')}
            label="email"
            placeholder="inthemaking@cayaunited.app"
            leftSection={<FontAwesomeIcon icon={faEnvelope} />}
            mt="md"
          />
          <PasswordInput
            key={form.key('password')}
            {...form.getInputProps('password')}
            display={typedEmail ? 'block' : 'none'}
            label="password"
            placeholder="secure identity"
            leftSection={<FontAwesomeIcon icon={faKey} />}
            mt="md"
          />
          <Text
            display={typedEmail ? 'block' : 'none'}
            ta="right"
          >
            <Anchor c="blue" tabIndex={0}>Forgot your password?</Anchor>
          </Text>
          <Group
            justify="center"
            mt="md"
          >
            <Button
              type="submit"
              color="pink"
              size="lg"
              leftSection={<FontAwesomeIcon icon={faRightToBracket} />}
            >
              sign in
            </Button>
          </Group>
          
          <Text
            ta="center"
            mt="md"
          >
            Don't have an account yet?&nbsp;
            <Anchor
              component={Link}
              href="/signup"
            >Sign up here</Anchor>
          </Text>
          <Divider
            label={<Text>or</Text>}
            my="xs"
          />
          <Stack align="center">
            <GoogleButton
              action="in"
              onClick={() => {}}
            />
            <EmailSignInButton
              action="in"
              disabled={!form.isValid('email')}
              onClick={() => signIn({ email: form.values.email })}
            />
            <Text>Does not require a password</Text>
          </Stack>
        </form>
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
