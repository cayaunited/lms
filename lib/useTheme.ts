'use client';

import {
  Badge,
  Card,
  Checkbox,
  createTheme,
  CSSVariablesResolver,
  DEFAULT_THEME,
  Divider,
  mergeMantineTheme,
  Modal,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Pill,
  rem,
  SegmentedControl,
  Select,
  Table,
  Tabs,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePickerInput, DateTimePicker, TimeInput } from '@mantine/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import useDyslexic from './useDyslexic';

export default function useTheme() {
  const { isDyslexic, headerFont, bodyFont, monoFont } = useDyslexic();
  
  const theme = mergeMantineTheme(DEFAULT_THEME, createTheme({
    headings: { fontFamily: `${headerFont}, sans-serif` },
    fontFamily: `${bodyFont}, sans-serif`,
    fontFamilyMonospace: `${monoFont}, monospace`,
    respectReducedMotion: true,
    autoContrast: true,
    primaryColor: 'green',
    defaultRadius: 'lg',
    primaryShade: { light: 0, dark: 1 },
    
    colors: {
      green: [
        '#00CC88',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
        '#7FFFD4',
      ],
      blue: [
        '#4EB1F9',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
        '#88CBFB',
      ],
      pink: [
        '#FF85FF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
        '#FFADFF',
      ],
      orange: [
        '#FF925C',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
        '#FF9966',
      ],
      red: [
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
        '#FF615C',
      ],
    },
    
    components: {
      Badge: Badge.extend({
        defaultProps: {
          size: 'lg',
        },
      }),
      Card: Card.extend({
        defaultProps: {
          shadow: 'sm',
        },
      }),
      Checkbox: Checkbox.extend({
        defaultProps: {
          size: 'md',
          radius: 'md',
        },
      }),
      DatePickerInput: DatePickerInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
      DateTimePicker: DateTimePicker.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
          valueFormat: 'MM/DD/YYYY hh:mm A',
        },
      }),
      Divider: Divider.extend({
        defaultProps: {
          labelPosition: 'center',
          size: 'md',
        },
      }),
      Modal: Modal.extend({
        defaultProps: {
          centered: true,
          closeButtonProps: { icon: (FontAwesomeIcon as any).render({ icon: faXmark }) }
        },
      }),
      MultiSelect: MultiSelect.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
          clearable: true,
          clearButtonProps: { icon: (FontAwesomeIcon as any).render({ icon: faXmark }) }
        },
      }),
      NumberInput: NumberInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
      PasswordInput: PasswordInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
          visibilityToggleButtonProps: { c: 'blue' },
          visibilityToggleIcon: ({ reveal } : { reveal: boolean }) =>
            reveal ? (FontAwesomeIcon as any).render({ icon: faEye })
              : (FontAwesomeIcon as any).render({ icon: faEyeSlash }),
        },
      }),
      SegmentedControl: SegmentedControl.extend({
        defaultProps: {
          size: 'md',
        },
      }),
      Select: Select.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
          allowDeselect: false,
        },
      }),
      Tabs: Tabs.extend({
        defaultProps: {
          radius: 0,
        },
      }),
      TagsInput: TagsInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
      Textarea: Textarea.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
      TextInput: TextInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
      TimeInput: TimeInput.extend({
        defaultProps: {
          size: 'md',
          variant: 'filled',
        },
      }),
    },
  }));
  
  const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
      '--text-lh': isDyslexic ? theme.lineHeights.xl : theme.lineHeights.md,
    },
    light: {
      '--mantine-color-body': '#E9ECEF',
      '--mantine-color-green-outline': 'var(--mantine-color-green-text)',
      '--mantine-color-blue-outline': 'var(--mantine-color-blue-text)',
      '--mantine-color-pink-outline': 'var(--mantine-color-pink-text)',
      '--mantine-color-orange-outline': 'var(--mantine-color-orange-text)',
      '--mantine-color-red-outline': 'var(--mantine-color-red-text)',
    },
    dark: {
      '--mantine-color-green-outline': 'var(--mantine-color-green-text)',
      '--mantine-color-blue-outline': 'var(--mantine-color-blue-text)',
      '--mantine-color-pink-outline': 'var(--mantine-color-pink-text)',
      '--mantine-color-orange-outline': 'var(--mantine-color-orange-text)',
      '--mantine-color-red-outline': 'var(--mantine-color-red-text)',
    },
  });
  
  return { theme, resolver };
}
