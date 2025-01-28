'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  Group,
  List,
  Menu,
  Modal,
  rem,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  TagsInput,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEllipsis,
  faEnvelope,
  faEye, faMinus,
  faPlus,
  faRightLeft,
  faTrashCan,
  faUserPlus,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import useDyslexic from '@/lib/useDyslexic';
import showNotification from '@/lib/showNotification';
import accountValidation from '@/lib/validation/account';
import { createClient } from '@/lib/supabase/client';
import { sections as sectionsValidation } from '@/lib/validation/course';

export default function PeopleList({ user, course, setCourse, listRole, peopleIDs, setPeopleIDs, peopleByID, setPeopleByID }:
  { user: any, course: any, setCourse: any, listRole: string, peopleIDs: any[], setPeopleIDs: any, peopleByID: any, setPeopleByID: any }) {
  const supabase = createClient();
  const people = peopleIDs.map((peopleID) => ({ id: peopleID, ...peopleByID[peopleID] }));
  const { headerFont } = useDyslexic();
  const [addOpened, { toggle: toggleAdd, close: closeAdd }] = useDisclosure(false);
  const [removePeopleOpened, { toggle: toggleRemovePeople, close: closeRemovePeople }] = useDisclosure(false);
  const [removePersonOpened, { toggle: toggleRemovePerson, close: closeRemovePerson }] = useDisclosure(false);
  const [movePeopleOpened, { toggle: toggleMovePeople, close: closeMovePeople }] = useDisclosure(false);
  const [movePersonOpened, { toggle: toggleMovePerson, close: closeMovePerson }] = useDisclosure(false);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [selectedID, setSelectedID] = useState('');
  
  const toggleID = (id: string) => {
    setSelectedIDs((selection) => selection.includes(id)
      ? selection.filter((selectedID) => selectedID !== id) : [...selection, id]);
  };
  
  const toggleIDs = () => {
    setSelectedIDs((selection) => (selection.length === peopleIDs.length
      ? [] : [...peopleIDs]));
  };
  
  const openRemovePerson = (personID: string) => {
    setSelectedID(personID);
    toggleRemovePerson();
  };
  
  const openMovePerson = (personID: string) => {
    setSelectedID(personID);
    toggleMovePerson();
  };
  
  const addForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      emails: [] as string[],
      sections: [] as string[],
    },
    validate: {
      emails: (values: string[]) => {
        const isInvalid = accountValidation.email;
        
        for (let e = 0; e < values.length; e++) {
          const email = values[e];
          if (isInvalid(email)) return `${email} is not a valid email, please use the abc@def.ghi format`;
        }
        
        return values.length > 0 ? null : 'At least one email required';
      },
      sections: sectionsValidation,
    },
  });
  
  const movePeopleForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      direction: 'into',
      sections: [] as string[],
    },
    validate: {
      sections: (values: string[]) => sectionsValidation(values)
        || (values.length > 0 ? null : 'Required'),
    },
  });
  
  const addPerson = async ({ emails, sections }:
    { emails: string[], sections: string[] }) => {
    try {
      const invalidEmails: string[] = [];
      const roleToAdd = listRole === 'teacher' ? 2 : (listRole === 'assistant' ? 1 : 0);
      const newIDs: string[] = [];
      const newPeopleByID = { ...peopleByID };
      
      for (const email of emails) {
        if (people.find((person) => person.email === email)) {
          invalidEmails.push(email);
          continue;
        }
        
        const { data: personData, error: personError } = await supabase.from('people')
          .select().eq('email', email);
        
        if (personError) {
          showNotification(false, `Failed to add ${listRole}(s)`, `Sorry, we couldn't add the ${listRole}(s)`);
          console.log(personError);
          return;
        }
        
        if (personData?.length) {
          const { id, name, email, role, avatar } = personData[0];
          
          if (peopleByID[id]) {
            invalidEmails.push(email);
          } else if (listRole === 'teacher' && role != 1 || listRole !== 'teacher' && role != 0) {
            invalidEmails.push(email);
          } else {
            const { error: connectionError } = await supabase.from('people_to_courses').insert({
              person_id: id,
              course_id: course.id,
              role: roleToAdd,
              sections,
            });
            
            if (connectionError) {
              showNotification(false, `Failed to add ${listRole}(s)`, `Sorry, we couldn't add the ${listRole}(s)`);
              console.log(connectionError);
              return;
            }
            
            newIDs.push(id);
            newPeopleByID[id] = { name, email, role: roleToAdd, avatar, sections };
          }
        } else {
          if (peopleByID[email]) {
            invalidEmails.push(email);
            continue;
          }
          
          const { error: connectionError } = await supabase.from('invites_to_courses').insert({
            person_email: email,
            course_id: course.id,
            role: roleToAdd,
            sections,
          });
          
          if (connectionError) {
            showNotification(false, `Failed to add ${listRole}(s)`, `Sorry, we couldn't add the ${listRole}(s)`);
            console.log(connectionError);
            return;
          }
          
          newIDs.push(email);
          
          newPeopleByID[email] = {
            name: `Waiting for ${listRole} to accept invite...`,
            email,
            role: roleToAdd,
            avatar: 0,
            sections,
            fromInvite: true,
          };
        }
      }
      
      if (invalidEmails.length) {
        showNotification(false, `Failed to add some ${listRole}(s)`, `It looks like the following emails were already added or do not belong to a ${listRole}: ${invalidEmails.join(', ')}`);
      }
      
      if (newIDs.length) {
        setPeopleIDs([...peopleIDs, ...newIDs]);
        setPeopleByID(newPeopleByID);
      }
      
      closeAdd();
      addForm.reset();
    } catch (error) {
      showNotification(false, `Failed to add ${listRole}(s)`, `Sorry, we couldn't add the ${listRole}(s)`);
      console.log(error);
    }
  };
  
  const removePeople = async () => {
    try {
      const idsToRemove: string[] = selectedIDs.filter((id: string) => id !== user?.uid);
      
      if (idsToRemove.length > 0) {
        const newPeopleIDs = peopleIDs.filter((id: string) => !idsToRemove.includes(id));
        
        for (const personID of idsToRemove) {
          if (peopleByID[personID].fromInvite) {
            const { error: connectionError } = await supabase.from('invites_to_courses')
              .delete().eq('person_email', personID);
            
            if (connectionError) {
              showNotification(false, `Failed to remove ${listRole}(s)`, `Sorry, we couldn't remove the ${listRole}(s)`);
              console.log(connectionError);
              return;
            }
          } else {
            const { error: connectionError } = await supabase.from('people_to_courses')
              .delete().eq('person_id', personID).eq('course_id', course.id);
            
            if (connectionError) {
              showNotification(false, `Failed to remove ${listRole}(s)`, `Sorry, we couldn't remove the ${listRole}(s)`);
              console.log(connectionError);
              return;
            }
          }
        }
        
        const newPeopleByID = { ...peopleByID };
        
        idsToRemove.forEach((personID: string) => {
          delete newPeopleByID[personID as keyof(typeof newPeopleByID)];
        });
        
        setPeopleIDs(newPeopleIDs);
        setPeopleByID(newPeopleByID);
        setSelectedIDs(selectedIDs.filter((id: string) => !idsToRemove.includes(id)));
      }
      
      closeRemovePeople();
    } catch (error) {
      console.error(error);
      showNotification(false, `Failed to remove ${listRole}(s)`, `Sorry, we couldn't remove the ${listRole}(s)`);
    }
  };
  
  const removePerson = async () => {
    try {
      if (selectedID === user?.uid) return;
      const newPeopleIDs = peopleIDs.filter((id: string) => id !== selectedID);
      
      if (peopleByID[selectedID].fromInvite) {
        const { error: connectionError } = await supabase.from('invites_to_courses')
          .delete().eq('person_email', selectedID);
        
        if (connectionError) {
          showNotification(false, `Failed to remove ${listRole}`, `Sorry, we couldn't remove the ${listRole}`);
          console.log(connectionError);
          return;
        }
      } else {
        const { error: connectionError } = await supabase.from('people_to_courses')
          .delete().eq('person_id', selectedID).eq('course_id', course.id);
        
        if (connectionError) {
          showNotification(false, `Failed to remove ${listRole}`, `Sorry, we couldn't remove the ${listRole}`);
          console.log(connectionError);
          return;
        }
      }
      
      const newPeopleByID = { ...peopleByID };
      delete newPeopleByID[selectedID as keyof(typeof newPeopleByID)];
      
      setPeopleIDs(newPeopleIDs);
      setPeopleByID(newPeopleByID);
      setSelectedIDs(selectedIDs.filter((id: string) => id !== selectedID));
      closeRemovePerson();
    } catch (error) {
      console.error(error);
      showNotification(false, `Failed to remove ${listRole}`, `Sorry, we couldn't remove the ${listRole}`);
    }
  };
  
  const movePeople = async ({ direction, sections }:
    { direction: string, sections: string[] }) => {
    try {
      const newPeopleByID = { ...peopleByID };
      const newAllSections: string[] = [];
      let newMySections: string[] = [];
      
      for (const personID of selectedIDs) {
        const person = peopleByID[personID];
        
        if (direction === 'into') {
          const newSections = sections.filter((section) => !person.sections.includes(section));
          if (!newSections.length) continue;
          const updatedSections = [...person.sections, ...newSections];
          if (personID === user.id) newMySections = updatedSections;
          
          newSections.forEach((section) => {
            if (!newAllSections.includes(section) && !course.allSections.includes(section))
              newAllSections.push(section);
          });
          
          const { error } = await supabase.from(person.fromInvite ? 'invites_to_courses' : 'people_to_courses')
            .update({ sections: updatedSections })
            .eq(person.fromInvite ? 'person_email' : 'person_id', personID).eq('course_id', course.id);
          
          if (error) {
            showNotification(false, `Failed to move ${listRole}(s)`, `Sorry, we couldn't move the ${listRole}(s)`);
            console.log(error);
            return;
          }
          
          newPeopleByID[personID].sections = updatedSections;
        } else {
          const remainingSections = person.sections.filter((section: string) => !sections.includes(section));
          if (remainingSections.length === person.sections.length) continue;
          if (personID === user.id) newMySections = remainingSections;
          
          const { error } = await supabase.from(person.fromInvite ? 'invites_to_courses' : 'people_to_courses')
            .update({ sections: remainingSections })
            .eq(person.fromInvite ? 'person_email' : 'person_id', personID).eq('course_id', course.id);
          
          if (error) {
            showNotification(false, `Failed to move ${listRole}(s)`, `Sorry, we couldn't move the ${listRole}(s)`);
            console.log(error);
            return;
          }
          
          newPeopleByID[personID].sections = remainingSections;
        }
      }
      
      setPeopleByID(newPeopleByID);
      movePeopleForm.reset();
      if (newAllSections.length || newMySections.length) setCourse({ ...course,
        allSections: [...course.allSections, ...newAllSections], mySections: newMySections.length ? newMySections : course.mySections });
      closeMovePeople();
    } catch (error) {
      showNotification(false, `Failed to move ${listRole}(s)`, `Sorry, we couldn't move the ${listRole}(s)`);
      console.log(error);
    }
  };
  
  const movePerson = async ({ direction, sections }:
    { direction: string, sections: string[] }) => {
    try {
      const newPeopleByID = { ...peopleByID };
      const newAllSections: string[] = [];
      let newMySections: string[] = [];
      const person = peopleByID[selectedID];
      
      if (direction === 'into') {
        const newSections = sections.filter((section) => !person.sections.includes(section));
        if (!newSections.length) return;
        const updatedSections = [...person.sections, ...newSections];
        if (selectedID === user.id) newMySections = updatedSections;
        
        newSections.forEach((section) => {
          if (!newAllSections.includes(section) && !course.allSections.includes(section))
            newAllSections.push(section);
        });
          
        const { error } = await supabase.from(person.fromInvite ? 'invites_to_courses' : 'people_to_courses')
          .update({ sections: updatedSections })
          .eq(person.fromInvite ? 'person_email' : 'person_id', selectedID).eq('course_id', course.id);
        
        if (error) {
          showNotification(false, `Failed to move ${listRole}`, `Sorry, we couldn't move the ${listRole}`);
          console.log(error);
          return;
        }
        
        newPeopleByID[selectedID].sections = updatedSections;
      } else {
        const remainingSections = person.sections.filter((section: string) => !sections.includes(section));
        if (remainingSections.length === person.sections.length) return;
        if (selectedID === user.id) newMySections = remainingSections;
          
        const { error } = await supabase.from(person.fromInvite ? 'invites_to_courses' : 'people_to_courses')
          .update({ sections: remainingSections })
          .eq(person.fromInvite ? 'person_email' : 'person_id', selectedID).eq('course_id', course.id);
        
        if (error) {
          showNotification(false, `Failed to move ${listRole}`, `Sorry, we couldn't move the ${listRole}`);
          console.log(error);
          return;
        }
        
        newPeopleByID[selectedID].sections = remainingSections;
      }
      
      setPeopleByID(newPeopleByID);
      movePeopleForm.reset();
      if (newAllSections.length || newMySections.length) setCourse({ ...course,
        allSections: [...course.allSections, ...newAllSections], mySections: newMySections.length ? newMySections : course.mySections });
      closeMovePerson();
    } catch (error) {
      showNotification(false, `Failed to move ${listRole}(s)`, `Sorry, we couldn't move the ${listRole}(s)`);
      console.log(error);
    }
  };
  
  return <>
    <Group justify="space-between">
      <Title
        order={2}
        className="theme-text"
      >{listRole}s</Title>
      {
        user?.role === 2 && <Button
          leftSection={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={toggleAdd}
        >add {listRole}s</Button>
      }
    </Group>
    <Text
      display={peopleIDs.length ? 'none' : 'block'}
      mt="md"
    >No {listRole}s yet</Text>
    {
      user?.role === 2 ? <ScrollArea
        display={peopleIDs.length ? 'block' : 'none'}
        mt="md"
      >
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleIDs}
                  checked={selectedIDs.length > 0 && selectedIDs.length === (peopleIDs ? peopleIDs.length : 0)}
                  indeterminate={selectedIDs.length > 0 && selectedIDs.length !== (peopleIDs ? peopleIDs.length : 0)}
                  icon={(props) => <FontAwesomeIcon icon={props.indeterminate ? faMinus : faCheck} className={props.className} />}
                  disabled={!peopleIDs.length}
                />
              </Table.Th>
              <Table.Th style={{ width: rem(60) }}></Table.Th>
              <Table.Th hiddenFrom="md">name and email</Table.Th>
              <Table.Th visibleFrom="md">name</Table.Th>
              <Table.Th visibleFrom="md">email</Table.Th>
              <Table.Th>sections</Table.Th>
              <Table.Th>
                <Group justify="end">
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        color="pink"
                        size="lg"
                        aria-label={`view actions`}
                        title={`view actions`}
                        disabled={!selectedIDs.length}
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>actions</Menu.Label>
                      <Menu.Item
                        color="blue"
                        leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                        onClick={toggleMovePeople}
                      >
                        move to section
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                      >
                        email selected
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={toggleRemovePeople}
                      >
                        remove selected
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {people
              .toSorted((a: any, b: any) => a.name > b.name ? 1 : (a.email > b.email ? 1 : -1))
              .map((person) => {
              const selected = selectedIDs.includes(person.id);
              
              return <Table.Tr
                key={person.id}
                bg={selected ? 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))' : 'transparent'}
              >
                <Table.Td>
                  <Checkbox
                    checked={selected}
                    onChange={() => toggleID(person.id)}
                    icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
                  />
                </Table.Td>
                <Table.Td>
                  <Avatar
                    size={rem(40)}
                    src={`/avatars/${person.avatar}.png`}
                    radius={rem(40)}
                  />
                </Table.Td>
                <Table.Td>
                  <Text fw={700}>{person.name}</Text>
                  <Text hiddenFrom="md">{person.email}</Text>
                </Table.Td>
                <Table.Td visibleFrom="md">{person.email}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    {person.sections.sort().map((section: string) => <Badge
                      key={section}
                      color="blue"
                      px={rem(6)}
                    >{section}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group justify="end">
                    <Menu>
                      <Menu.Target>
                        <ActionIcon
                          color="pink"
                          size="lg"
                          aria-label={`view actions`}
                          title={`view actions`}
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>actions</Menu.Label>
                        <Menu.Item
                          color="blue"
                          leftSection={<FontAwesomeIcon icon={faRightLeft} />}
                          onClick={() => openMovePerson(person.id)}
                        >
                          move to section
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={`/profile/${person.id}`}
                          style={{ textDecoration: 'none', color: 'var(--mantine-color-pink-text)', verticalAlign: 'middle' }}
                          target="_blank"
                          display={person.fromInvite ? 'none' : 'flex'}
                          leftSection={<FontAwesomeIcon icon={faEye} />}
                        >
                          view profile
                        </Menu.Item>
                        <Menu.Item
                          display={person.fromInvite || person.id === user.id ? 'none' : 'flex'}
                          leftSection={<FontAwesomeIcon icon={faEnvelope} />}
                        >
                          email {listRole}
                        </Menu.Item>
                        <Menu.Item
                          display={person.id === user.id ? 'none' : 'flex'}
                          color="red"
                          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
                          onClick={() => openRemovePerson(person.id)}
                        >
                          remove {listRole}
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>;
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      : <Stack
        display={peopleIDs.length ? 'flex' : 'none'}
        mt="md"
      >
        {people
          .toSorted((a: any, b: any) => a.name > b.name ? 1 : (a.email > b.email ? 1 : -1))
          .map((person) => <Card
            key={person.id}
            withBorder
            p="md"
            className="hover-card"
          >
            <Grid align="center">
              <Grid.Col span="content">
                <Avatar
                  size={rem(40)}
                  src={`/avatars/${person.avatar}.png`}
                  radius={rem(40)}
                />
              </Grid.Col>
              <Grid.Col span="auto">
                <Stack gap={0}>
                  <Text fw={700}>{person.name}</Text>
                  <Text>{person.email}</Text>
                  <Text display={user?.role === 1 && person.sections.length ? 'block' : 'none'}>
                    in section{person.sections.length === 1 ? '' : 's' }: {person.sections.sort().join(', ')}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span="content">
                <ActionIcon
                  component={Link}
                  href={`/profile/${person.id}`}
                  style={{ textDecoration: 'none', verticalAlign: 'middle' }}
                  target="_blank"
                  color="blue"
                  size="lg"
                  aria-label={`view person`}
                  title={`view person`}
                >
                  <FontAwesomeIcon icon={faEye} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Card>)}
      </Stack>
    }
    
    <Modal
      opened={addOpened}
      onClose={closeAdd}
      title={<Text
        fw={700}
        ff={headerFont}
      >add {listRole}s</Text>}
    >
      <form onSubmit={addForm.onSubmit(addPerson)}>
        <TagsInput
          key={addForm.key('emails')}
          {...addForm.getInputProps('emails')}
          label="emails"
          description={`Insert each email for the ${listRole} you want to add, pressing enter or comma after each one`}
          placeholder="inthemaking@cayaunited.app"
          data-autofocus
        />
        <TagsInput
          key={addForm.key('sections')}
          {...addForm.getInputProps('sections')}
          label="section(s) (optional)"
          description={`What section(s) should the ${listRole}s be added to?`}
          placeholder="1"
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
            onClick={closeAdd}
          >
            cancel
          </Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faPlus} />}
          >
            add
          </Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={removePeopleOpened}
      onClose={closeRemovePeople}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >
          <FontAwesomeIcon
            icon={faWarning}
            color="var(--mantine-color-orange-text)"
            style={{ marginRight: rem(16) }}
            size="xl"
          />
          remove {listRole}(s)
        </Text>
      }
      size="xl"
    >
      <Text mb="md">
        Are you sure you want to remove these {listRole}(s)?
      </Text>
      <List mb="md">
        {selectedIDs
          .toSorted((a: string, b: string) => peopleByID[a as keyof(typeof peopleByID)].name > peopleByID[b as keyof(typeof peopleByID)].name ? 1 : -1)
          .map((id) => <List.Item key={id}>
          {peopleByID[id as keyof(typeof peopleByID)].name}
        </List.Item>)}
      </List>
      <Group justify="space-between">
        <Button
          leftSection={<FontAwesomeIcon icon={faXmark} />}
          onClick={closeRemovePeople}
        >cancel</Button>
        <Button
          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
          onClick={removePeople}
          variant="outline"
          color="red"
        >remove</Button>
      </Group>
    </Modal>
    
    <Modal
      opened={removePersonOpened}
      onClose={closeRemovePerson}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >
          <FontAwesomeIcon
            icon={faWarning}
            color="var(--mantine-color-orange-text)"
            style={{ marginRight: rem(16) }}
            size="xl"
          />
          remove {listRole}
        </Text>
      }
      size="xl"
    >
      <Text mb="md">
        Are you sure you want to remove {peopleByID[selectedID as keyof(typeof peopleByID)]?.name}?
      </Text>
      <Group justify="space-between">
        <Button
          leftSection={<FontAwesomeIcon icon={faXmark} />}
          onClick={closeRemovePerson}
        >cancel</Button>
        <Button
          leftSection={<FontAwesomeIcon icon={faTrashCan} />}
          onClick={removePerson}
          variant="outline"
          color="red"
        >remove</Button>
      </Group>
    </Modal>
    
    <Modal
      opened={movePeopleOpened}
      onClose={closeMovePeople}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >
          move {listRole}(s)
        </Text>
      }
      size="xl"
    >
      <form onSubmit={movePeopleForm.onSubmit(movePeople)}>
        <Group mb="md">
          Move these {listRole}(s)
          <SegmentedControl
            key={movePeopleForm.key('direction')}
            {...movePeopleForm.getInputProps('direction')}
            data={['into', 'out of']}
            color="blue"
            withItemsBorders={false}
          />
        </Group>
        <TagsInput
          key={movePeopleForm.key('sections')}
          {...movePeopleForm.getInputProps('sections')}
          label="section(s)"
          description={`What section(s) should the ${listRole}(s) be moved ${movePeopleForm.getValues().direction}?`}
          placeholder="1"
          mb="md"
        />
        <List mb="md">
          {selectedIDs
            .toSorted((a: string, b: string) => peopleByID[a as keyof(typeof peopleByID)].name > peopleByID[b as keyof(typeof peopleByID)].name ? 1 : -1)
            .map((id) => <List.Item key={id}>
            {peopleByID[id as keyof(typeof peopleByID)].name}
          </List.Item>)}
        </List>
        <Group justify="space-between">
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeMovePeople}
          >cancel</Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faRightLeft} />}
          >move</Button>
        </Group>
      </form>
    </Modal>
    
    <Modal
      opened={movePersonOpened}
      onClose={closeMovePerson}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >
          move {listRole}
        </Text>
      }
      size="xl"
    >
      <form onSubmit={movePeopleForm.onSubmit(movePerson)}>
        <Group mb="md">
          Move {peopleByID[selectedID]?.name}
          <SegmentedControl
            key={movePeopleForm.key('direction')}
            {...movePeopleForm.getInputProps('direction')}
            data={['into', 'out of']}
            color="blue"
            withItemsBorders={false}
          />
        </Group>
        <TagsInput
          key={movePeopleForm.key('sections')}
          {...movePeopleForm.getInputProps('sections')}
          label="section(s)"
          description={`What section(s) should the ${listRole} be moved ${movePeopleForm.getValues().direction}?`}
          placeholder="1"
          mb="md"
        />
        <Group justify="space-between">
          <Button
            type="button"
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeMovePerson}
          >cancel</Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faRightLeft} />}
          >move</Button>
        </Group>
      </form>
    </Modal>
  </>;
}
