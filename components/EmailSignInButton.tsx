'use client';

import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function EmailSignInButton({ action, onClick, disabled } : { action: string, onClick?: () => void, disabled: boolean }) {
  return <Button
    h={40}
    radius="xl"
    leftSection={<FontAwesomeIcon icon={faEnvelope} />}
    color="blue"
    disabled={disabled}
    onClick={onClick}
  >Sign {action} with email</Button>;
}
