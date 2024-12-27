'use client';

import { Box, Group, MantineSpacing, StyleProp, Text } from '@mantine/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IconListItem({ icon, color, text, mt, mb }:
  { icon: IconDefinition, color: string, text: string, mt?: StyleProp<MantineSpacing>, mb?: StyleProp<MantineSpacing> }) {
  return <Group
    mt={mt}
    mb={mb}
  >
    <Box
      w={32}
      h={32}
      c={color}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <FontAwesomeIcon
        icon={icon}
        size="xl"
      />
    </Box>
    <Text>{text}</Text>
  </Group>;
}
