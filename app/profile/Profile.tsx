'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ActionIcon,
  Avatar,
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  PasswordInput,
  Radio,
  rem,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faCheckDouble,
  faEnvelope,
  faKey,
  faPencil,
  faTrash,
  faUser,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ProfileBasics from './ProfileBasics';
import ProfileDetails from './ProfileDetails';
import useDyslexic from '@/lib/useDyslexic';
import showNotification from '@/lib/showNotification';
import accountValidation from '@/lib/validation/account';
import publicDetailsValidation from '@/lib/validation/publicDetails';
import { AvatarDispatchContext } from '@/lib/avatarContext';
import { createClient } from '@/lib/supabase/client';

export default function Profile() {
  const supabase = createClient();
  const router = useRouter();
  const [account, setAccount] = useState<any>({});
  const [selectedAvatar, selectAvatar] = useState<string | null>('0');
  const dispatchAvatar = useContext(AvatarDispatchContext);
  const [usesGoogle, setUsesGoogle] = useState(false);
  const [usesPassword, setUsesPassword] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        const { data: peopleData } = await supabase.from('people').select().eq('id', userData.user.id);
        if (!peopleData || peopleData.length === 0) return;
        const { data: profileData } = await supabase.from('profiles').select().eq('id', userData.user.id);
        if (!profileData || profileData.length === 0) return;
        
        const { name, role, avatar } = peopleData[0];
        const { biography, majors, minors, semesters, organizations, hobbies } = profileData[0];
        
        setAccount({
          id: userData.user.id,
          name,
          email: userData.user.email,
          role,
          avatar,
          biography,
          majors,
          minors,
          semesters,
          organizations,
          hobbies,
        });
      } catch (error) {
        showNotification(false, 'Failed to load profile', 'Sorry, we couldn\'t load your profile');
        console.error(error);
      }
    })();
  }, []);
  
  // searchFirestore(() => doc(db, 'people', user!.uid), async (q: any) => {
  //   const accountDocument = await getDoc(q);
  //   const userToken = await user!.getIdTokenResult();
  //   setUsesGoogle(userToken.signInProvider === 'google.com');
  //   setUsesPassword(!!userToken.claims.usesPassword);
    
  //   const { name, email, avatar } = accountDocument.data() as any;
    
  //   if (!accountDocument.exists()) {
  //     showNotification(false, 'Failed to load profile', 'Sorry, we couldn\'t load your profile');
  //     return;
  //   }
    
  //   const loadedAccount: any = { name, email, avatar };
  //   selectAvatar(`${avatar}`);
  //   const profileDocument = await getDoc(doc(db, 'people', user!.uid, 'profile', user!.uid));
    
  //   if (profileDocument.exists()) {
  //     const { biography, majors, minors, semesters, organizations, hobbies }
  //       = profileDocument.data() as any;
  //     loadedAccount.biography = biography;
  //     loadedAccount.majors = majors;
  //     loadedAccount.minors = minors;
  //     loadedAccount.semesters = semesters;
  //     loadedAccount.organizations = organizations;
  //     loadedAccount.hobbies = hobbies;
  //   }
    
  //   setAccount(loadedAccount);
  // });
  
  const { headerFont } = useDyslexic();
  const [avatarOpened, { open: openAvatar, close: closeAvatar }] = useDisclosure(false);
  const [accountOpened, { open: openAccount, close: closeAccount }] = useDisclosure(false);
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  
  const accountForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      currentPassword: '',
    },
    validate: {
      name: (value) => value ? accountValidation.name(value) : null,
      email: (value) => value ? accountValidation.email(value) : null,
      password: (value, values) => value ? accountValidation.password(value, values) : null,
      currentPassword: accountValidation.currentPassword,
    },
  });
  
  const detailsForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      biography: '',
      majors: '',
      minors: '',
      semesters: '',
      organizations: '',
      hobbies: '',
    },
    validate: publicDetailsValidation,
  });
  
  const openAvatarPicker = () => {
    selectAvatar(`${account.avatar}`);
    openAvatar();
  };
  
  const openAccountEditor = () => {
    accountForm.reset();
    openAccount();
  };
  
  const openDetailsEditor = () => {
    detailsForm.setValues({
      biography: account.biography ?? '',
      majors: account.majors ? account.majors.join('\n') : '',
      minors: account.minors ? account.minors.join('\n') : '',
      semesters: account.semesters ?? '',
      organizations: account.organizations ? account.organizations.join('\n') : '',
      hobbies: account.hobbies ? account.hobbies.join('\n') : '',
    });
    
    openDetails();
  };
  
  const saveAvatar = async (event: any) => {
    event.preventDefault();
    
    try {
      const avatar = Number(selectedAvatar);
      
      if (avatar === account.avatar) {
        closeAvatar();
        return;
      }
      
      const { error } = await supabase.from('people').update({ avatar }).eq('id', account.id);
      
      if (error) {
        showNotification(false, 'Failed to save avatar', 'Sorry, we couldn\'t save the change to your avatar');
        console.error(error);
        return;
      }
      
      setAccount({ ...account, avatar });
      dispatchAvatar({ type: 'changed', avatar });
      closeAvatar();
    } catch (error) {
      showNotification(false, 'Failed to save avatar', 'Sorry, we couldn\'t save the change to your avatar');
      console.error(error);
    }
  };
  
  const saveAccount = async ({ name, email, password, currentPassword }:
    { name?: string, email?: string, password?: string, currentPassword?: string }) => {
    if (!name && !email && !password) {
      closeAccount();
      return;
    }
    
    try {
      const newAccount = { ...account };
      
      if (name) {
        const { error } = await supabase.from('people').update({ name }).eq('id', account.id);
        
        if (error) {
          showNotification(false, 'Failed to save account', 'Sorry, we couldn\'t save the changes to your account');
          console.error(error);
          return;
        }
        
        newAccount.name = name;
      }
      
      // if (usesPassword && password && currentPassword) {
      //   await reauthenticateWithCredential(user!, EmailAuthProvider.credential(user!.email!, currentPassword));
      //   await updatePassword(user!, password);
      // }
      
      // if (!usesGoogle && email) {
      //   await updateEmail(user!, email);
      //   await updateDoc(doc(db, 'people', user!.uid), { email });
      //   newAccount.email = email;
      //   window.localStorage.setItem('roleForSignIn', 'exists');
      //   await sendEmailVerification(user!,
      //     { url: DEVELOPMENT ? 'http://localhost:3000/verified' : 'https://cayaunited.app/verified' });
      //   router.push('/verify?sent');
      // }
      
      setAccount(newAccount);
      closeAccount();
    } catch (error) {
      showNotification(false, 'Failed to save account', 'Sorry, we couldn\'t save the changes to your account');
      console.error(error);
    }
  };
  
  const saveDetails = async ({ biography, majors, minors, semesters, organizations, hobbies }:
    { biography?: string, majors?: string, minors?: string, semesters?: string, organizations?: string, hobbies?: string }) => {
    try {
      const newDetails = {
        biography: biography || '',
        majors: majors ? majors.trim().split('\n') : [],
        minors: minors ? minors.trim().split('\n') : [],
        semesters: semesters !== '' ? semesters : null,
        organizations: organizations ? organizations.trim().split('\n') : [],
        hobbies: hobbies ? hobbies.trim().split('\n') : [],
      };
      
      const { error } = await supabase.from('profiles').update({ ...newDetails }).eq('id', account.id);
      
      if (error) {
        showNotification(false, 'Failed to save details', 'Sorry, we couldn\'t save the changes to your details');
        console.error(error);
        return;
      }
      
      setAccount({
        id: account.id,
        name: account.name,
        email: account.email,
        avatar: account.avatar,
        ...newDetails,
      });
      
      closeDetails();
    } catch (error) {
      showNotification(false, 'Failed to save details', 'Sorry, we couldn\'t save the changes to your details');
      console.error(error);
    }
  };
  
  return <>
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <ProfileBasics
          account={account}
          onAvatarChange={openAvatarPicker}
        />
        <Stack
          align="center"
          mt="md"
        >
          <Button
            leftSection={<FontAwesomeIcon icon={faPencil} />}
            onClick={openAccountEditor}
          >
            edit account
          </Button>
          <Button
            visibleFrom="md"
            color="red"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faTrash} />}
            onClick={openDelete}
          >
            delete account
          </Button>
        </Stack>
      </Grid.Col>
      
      <Grid.Col span={{ base: 12, md: 8 }}>
        <ProfileDetails account={account} />
        <Group
          justify="center"
          mt="md"
          visibleFrom="md"
        >
          <Button
            leftSection={<FontAwesomeIcon icon={faPencil} />}
            onClick={openDetailsEditor}
          >
            edit details
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
    
    <Stack
      align="center"
      mt="md"
      hiddenFrom="md"
    >
      <Button
        leftSection={<FontAwesomeIcon icon={faPencil} />}
        onClick={openDetailsEditor}
      >
        edit details
      </Button>
      <Button
        color="red"
        variant="outline"
        leftSection={<FontAwesomeIcon icon={faTrash} />}
        onClick={openDelete}
      >
        delete account
      </Button>
    </Stack>
    
    <Modal
      opened={avatarOpened}
      onClose={closeAvatar}
      title={<Text
        fw={700}
        ff={headerFont}
      >change avatar</Text>}
    >
      <form onSubmit={saveAvatar}>
        <Radio.Group
          value={selectedAvatar}
          onChange={selectAvatar}
        >
          <Group justify="flex-start">
            {[
              {
                id: '0',
                alt: '',
              },
              {
                id: '1',
                alt: '',
              },
              {
                id: '2',
                alt: '',
              },
              {
                id: '3',
                alt: '',
              },
              {
                id: '4',
                alt: '',
              },
              {
                id: '5',
                alt: '',
              },
            ].map((a) => <Radio.Card
              key={a.id}
              value={a.id}
              radius="xl"
              className="checked-border"
              w="auto"
            >
              <Avatar
                src={`/avatars/${a.id}.png`}
                alt={a.alt}
                size="lg"
              />
            </Radio.Card>)}
          </Group>
        </Radio.Group>
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeAvatar}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faCamera} />}
          >
            change
          </Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={accountOpened}
      onClose={closeAccount}
      title={<Text
        fw={700}
        ff={headerFont}
      >edit account</Text>}
    >
      <form onSubmit={accountForm.onSubmit(saveAccount)}>
        <TextInput
          data-autofocus
          key={accountForm.key('name')}
          {...accountForm.getInputProps('name')}
          label="change name"
          placeholder="Example Masterpiece"
          description="Leave empty if you don't want to change your name"
          leftSection={<FontAwesomeIcon icon={faUser} />}
          rightSection={<ActionIcon
            color="blue"
            variant="transparent"
          >
            <FontAwesomeIcon icon={faXmark} />
          </ActionIcon>}
        />
        <TextInput
          key={accountForm.key('email')}
          {...accountForm.getInputProps('email')}
          display={usesGoogle ? 'none' : 'block'}
          label="change email"
          placeholder="inthemaking@cayaunited.app"
          description="Leave empty if you don't want to change your email. Please sign out then sign in again before you change your email. You will need to verify your new email"
          leftSection={<FontAwesomeIcon icon={faEnvelope} />}
          rightSection={<ActionIcon
            color="blue"
            variant="transparent"
          >
            <FontAwesomeIcon icon={faXmark} />
          </ActionIcon>}
          mt="md"
        />
        <PasswordInput
          key={accountForm.key('password')}
          {...accountForm.getInputProps('password')}
          display={usesPassword ? 'block' : 'none'}
          label="change password"
          placeholder="secure identity"
          description="Leave empty if you don't want to change your password. Must have a lowercase letter, an uppercase letter, a number, a special symbol, and at least 8 characters total"
          leftSection={<FontAwesomeIcon icon={faKey} />}
          mt="md"
        />
        <PasswordInput
          key={accountForm.key('currentPassword')}
          {...accountForm.getInputProps('currentPassword')}
          display={usesPassword ? 'block' : 'none'}
          label="current password"
          placeholder="secure identity"
          leftSection={<FontAwesomeIcon icon={faCheckDouble} />}
          mt="md"
        />
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeAccount}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faPencil} />}
          >
            edit
          </Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={detailsOpened}
      onClose={closeDetails}
      title={<Text
        fw={700}
        ff={headerFont}
      >edit details</Text>}
    >
      <form onSubmit={detailsForm.onSubmit(saveDetails)}>
        <Textarea
          data-autofocus
          key={detailsForm.key('biography')}
          {...detailsForm.getInputProps('biography')}
          label="biography"
          placeholder="I am a masterpiece that loves to learn!"
        />
        <Textarea
          key={detailsForm.key('majors')}
          {...detailsForm.getInputProps('majors')}
          label="majors"
          placeholder="professional learning"
          description="Enter each major on a separate line"
          mt="md"
        />
        <Textarea
          key={detailsForm.key('minors')}
          {...detailsForm.getInputProps('minors')}
          label="minors"
          placeholder="creative design"
          description="Enter each minor on a separate line"
          mt="md"
        />
        <NumberInput
          key={detailsForm.key('semesters')}
          {...detailsForm.getInputProps('semesters')}
          label={`semesters ${account.role === 0 ? 'completed' : 'taught'}`}
          min={0}
          allowDecimal={false}
          hideControls
          mt="md"
        />
        <Textarea
          key={detailsForm.key('organizations')}
          {...detailsForm.getInputProps('organizations')}
          label="organizations"
          placeholder="Caya club"
          description="Enter each organization on a separate line"
          mt="md"
        />
        <Textarea
          key={detailsForm.key('hobbies')}
          {...detailsForm.getInputProps('hobbies')}
          label="hobbies"
          placeholder="listening to music"
          description="Enter each hobby on a separate line"
          mt="md"
        />
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeDetails}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faPencil} />}
          >
            edit
          </Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={deleteOpened}
      onClose={closeDelete}
      title={<Text
        fw={700}
        ff={headerFont}
      >
        <FontAwesomeIcon
          icon={faWarning}
          color="var(--mantine-color-orange-text)"
          size="lg"
          style={{ marginRight: rem(16) }}
        />
        delete account
      </Text>}
    >
      <form>
        <Text>Are you sure you want to delete your account? This can't be undone</Text>
        <Group
          justify="space-between"
          mt="md"
        >
          <Button
            type="button"
            color="blue"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeDelete}
          >
            cancel
          </Button>
          <Button
            type="submit"
            color="red"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faTrash} />}
          >
            delete
          </Button>
        </Group>
      </form>
    </Modal>
  </>;
}
