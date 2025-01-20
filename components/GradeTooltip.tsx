'use client';

import { Paper, Text } from '@mantine/core';

export default function GradeTooltip({ label, payload }:
  { label: string, payload: Record<string, any>[] | undefined }) {
    if (!payload || !payload.length) return null;

    return (
      <Paper px="md" py="sm" withBorder>
        <Text fw={500} mb={5}>
          {payload[0]?.payload?.name}
        </Text>
        {payload.map((item: any) => (
          <Text key={item.name}>
            {item.name}: {item.value}%
          </Text>
        ))}
      </Paper>
    );
}
