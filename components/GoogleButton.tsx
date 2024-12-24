'use client';

import NextImage from 'next/image';
import { Button } from '@mantine/core';
import { roboto } from '@/fonts/fonts';

export default function GoogleButton({ action, onClick } : { action: string, onClick?: () => void }) {
  return <Button
    h={40}
    radius="xl"
    px={12}
    ff={roboto.style.fontFamily}
    fw={500}
    leftSection={<NextImage src="/google.svg" alt="Google logo" width={20} height={20} />}
    color="white"
    c="#1F1F1F"
    style={{ fontSize: 14, "--button-hover": "white" }}
    bd="#747775 solid 1px"
    onClick={onClick}
  >Sign {action} with Google</Button>;
}
