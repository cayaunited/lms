'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import EmailSignInButton from '@/components/EmailSignInButton';
import accountValidation from '@/lib/validation/account';
import showNotification from '@/lib/showNotification';
import { createClient } from '@/lib/supabase/client';
import createPerson from '@/lib/supabase/createPerson';

export default function SignIn({ signInWithEmail }: { signInWithEmail: any }) {
  const supabase = createClient();
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
  const params = useSearchParams();
  
  const createAccountData = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return false;
    const { data, error: peopleError } = await supabase.from('people').select().eq('id', userData.user.id);
    
    if (peopleError) {
      showNotification(false, 'Failed to sign in', `${peopleError}`);
      return false;
    }
    
    if (!data.length) {
      let name = window.localStorage.getItem('nameForSignIn')
        || window.prompt('What is your name?');
      let email = window.localStorage.getItem('emailForSignIn')
        || window.prompt('What is your email?');
      let role = window.localStorage.getItem('roleForSignIn')
        || window.prompt('What is your role? Either "student" or "teacher"', 'student');
      
      window.localStorage.removeItem('nameForSignIn');
      window.localStorage.removeItem('emailForSignIn');
      window.localStorage.removeItem('roleForSignIn');
      
      const creationError = await createPerson(supabase,
        userData.user.id, name ?? '', email ?? '', role === 'teacher' ? 1 : 0);
      
      if (creationError) {
        showNotification(false, 'Failed to sign in', `${peopleError}`);
        return false;
      }
    }
  };
  
  useEffect(() => {
    const token_hash = params.get('token_hash');
    const type = params.get('type');
    if (!token_hash || type !== 'magiclink') return;
    
    (async () => {
      const { error } = await supabase.auth.verifyOtp({ token_hash, type: 'magiclink' });
      if (error) showNotification(false, 'Failed to sign in', `${error}`);
      if (!createAccountData()) return;
      router.push('/dashboard');
    })();
  }, []);
  
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
          case 'email_not_confirmed':
            errorName = 'Email not yet verified';
            message = 'Please check your email and click the link to verify your email address';
            break;
        }
        
        showNotification(false, errorName, message);
      }
      else if (password) {
        if (!createAccountData()) return;
        router.push('/dashboard');
      }
      else showNotification(true, 'Sent sign in email', 'A sign in link was emailed to you');
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
