'use client';

import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function ProfileBasics({ account, personID, onAvatarChange }: { account: any, personID?: string, onAvatarChange?: () => void }) {
  return <>
    <Stack align="center">
      <Group
        justify="center"
        pos="relative"
        w="50%"
      >
        <Avatar
          src={`/avatars/${account.avatar || '0'}.png`}
          alt=""
          w="100%"
          h="auto"
          m="md"
        />
        {
          onAvatarChange && <ActionIcon
            size="xl"
            radius="xl"
            pos="absolute"
            right={0}
            bottom={0}
            onClick={onAvatarChange}
          >
            <FontAwesomeIcon
              icon={faCamera}
              size="xl"
            />
          </ActionIcon>
        }
      </Group>
      <Title
        order={1}
        ta="center"
        className="theme-text"
      >{account.name || '...'}</Title>
      {
        !personID && <Text>{account.email || '...'}</Text>
      }
    </Stack>
  </>;
}
