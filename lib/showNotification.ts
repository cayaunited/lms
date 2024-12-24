'use client';

import { notifications } from '@mantine/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function showNotification(success: boolean, title: string, message: string) {
  const color = success ? 'green' : 'red';
  const renderIcon = (FontAwesomeIcon as any).render;
  
  notifications.show({
    title,
    message,
    color,
    position: 'bottom-center',
    autoClose: success ? 5000 : false,
    icon: renderIcon({ icon: success ? faCheck : faExclamation }),
    style: { border: `0.25rem solid var(--mantine-color-${color}-outline)` },
    closeButtonProps: { icon: renderIcon({ icon: faXmark }) },
  });
}
