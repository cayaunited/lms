'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faEnvelope, faKey, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import EmailSignInButton from '@/components/EmailSignInButton';
import accountValidation from '@/lib/validation/account';
import showNotification from '@/lib/showNotification';

export default function SignUp({ signUpWithEmail }: { signUpWithEmail: any }) {
  const [typedEmail, setTypedEmail] = useState(false);
  const [typedPassword, setTypedPassword] = useState(false);
  
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
    validate: {
      name: accountValidation.name,
      email: accountValidation.email,
      password: accountValidation.password,
      confirmPassword: accountValidation.confirmPassword,
    },
  });
  
  useEffect(() => {
    if (!typedEmail && form.values.email.length > 0) setTypedEmail(true);
  }, [form.values.email]);
  useEffect(() => {
    if (!typedPassword && form.values.password.length > 0) setTypedPassword(true);
  }, [form.values.password]);
  
  const signUp = async ({ name, email, password, role }:
    { name: string, email: string, password?: string, role: string }) => {
    try {
      const error = await signUpWithEmail(name, email, role, password);
      window.localStorage.setItem('nameForSignIn', name);
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('roleForSignIn', role);
      
      if (error && error !== '42501') {
        let errorName = 'Error';
        let message = error;
        
        switch (error) {
          case 'user_already_exists':
            errorName = 'Email already in use';
            message = 'The email you gave is already used by an account. Try using a different email';
            break;
          case 'invalid_credentials':
            errorName = 'Incorrect email or password';
            message = 'The email or password you gave was incorrect. Try checking the spelling of your email and password';
            break;
        }
        
        showNotification(false, errorName, message);
      }
      else showNotification(true, 'Sent verification email', 'Please check your email and click the link to verify your email address, then sign in');
    } catch (error) {
      showNotification(false, 'Failed to sign up', `${error}`);
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
          sign up
        </Title>
        <Text ta="center">Welcome! Your account is in the making, just like you, so come as you are!</Text>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          alt=""
          width={300}
          height={300}
          hiddenFrom="md"
          mt="md"
        />
        
        <form onSubmit={form.onSubmit(signUp)}>
          <TextInput
            key={form.key('name')}
            {...form.getInputProps('name')}
            label="name"
            placeholder="Example Masterpiece"
            leftSection={<FontAwesomeIcon icon={faUser} />}
            mt="md"
          />
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
            description="Must have a lowercase letter, an uppercase letter, a number, a special symbol, and at least 8 characters total"
            leftSection={<FontAwesomeIcon icon={faKey} />}
            mt="md"
          />
          <PasswordInput
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
            display={typedPassword ? 'block' : 'none'}
            label="confirm password"
            placeholder="secure identity"
            leftSection={<FontAwesomeIcon icon={faCheckDouble} />}
            mt="md"
          />
          <Group
            justify="center"
            mt="md"
          >
            I am a
            <SegmentedControl
              key={form.key('role')}
              {...form.getInputProps('role')}
              data={['student', 'teacher']}
              color="blue"
              withItemsBorders={false}
            />
          </Group>
          <Group
            justify="center"
            mt="md"
          >
            <Button
              type="submit"
              color="pink"
              size="lg"
              leftSection={<FontAwesomeIcon icon={faUserPlus} />}
            >
              sign up
            </Button>
          </Group>
          
          <Text
            ta="center"
            mt="md"
          >
            Already have an account?&nbsp;
            <Anchor
              component={Link}
              href="/signin"
            >Sign in here</Anchor>
          </Text>
          <Divider
            label={<Text>or</Text>}
            my="xs"
          />
          <Stack align="center">
            <EmailSignInButton
              action="up"
              disabled={!form.isValid('email')}
              onClick={() => signUp({
                name: form.values.name,
                email: form.values.email,
                role: form.values.role,
              })}
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
