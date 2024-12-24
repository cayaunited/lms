'use client';

import {
  Card,
  Grid,
  List,
  Text,
  Title,
} from '@mantine/core';

export default function ProfileDetails({ account }: { account: any }) {
  return <>
    <Grid align="stretch">
      <Grid.Col span={12}>
        <Card className="hover-card">
          <Title order={3}>biography</Title>
          <Text>{account.biography || 'No biography yet'}</Text>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          h="100%"
          className="hover-card"
        >
          <Title order={3}>majors</Title>
          <Text display={account.majors?.length ? 'none' : 'block'}>No majors yet</Text>
          <List>
            {account.majors?.map((major: string) =>
              <List.Item key={major}>{major}</List.Item>)}
          </List>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          h="100%"
          className="hover-card"
        >
          <Title order={3}>minors</Title>
          <Text display={account.minors?.length ? 'none' : 'block'}>No minors yet</Text>
          <List>
            {account.minors?.map((minor: string) =>
              <List.Item key={minor}>{minor}</List.Item>)}
          </List>
        </Card>
      </Grid.Col>
      <Grid.Col span={12}>
        <Card className="hover-card">
          <Title order={3}>completion</Title>
          {
            account.role === 0 ? <Text>{
              account.semesters != null && typeof(account.semesters) === 'number'
                ? (account.semesters > 0
                  ? `I have completed ${account.semesters} semester${(account.semesters !== 1 ? 's' : '')} of college!`
                  : 'Just started college!')
                : 'No completion yet'
            }</Text>
            : <Text>{
              account.semesters != null && typeof(account.semesters) === 'number'
                ? (account.semesters > 0
                  ? `I have taught ${account.semesters} semester${(account.semesters !== 1 ? 's' : '')} of college!`
                  : 'Just started teaching college!')
                : 'No teaching duration yet'
            }</Text>
          }
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          h="100%"
          className="hover-card"
        >
          <Title order={3}>organizations</Title>
          <Text display={account.organizations?.length ? 'none' : 'block'}>No organizations yet</Text>
          <List>
            {account.organizations?.map((organization: string) =>
              <List.Item key={organization}>{organization}</List.Item>)}
          </List>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          h="100%"
          className="hover-card"
        >
          <Title order={3}>hobbies</Title>
          <Text display={account.hobbies?.length ? 'none' : 'block'}>No hobbies yet</Text>
          <List>
            {account.hobbies?.map((hobby: string) =>
              <List.Item key={hobby}>{hobby}</List.Item>)}
          </List>
        </Card>
      </Grid.Col>
    </Grid>
  </>;
}
