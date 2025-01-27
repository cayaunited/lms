import { createContext } from 'react';

export const CourseContext = createContext({ number: '', name: '' });
export const CourseDispatchContext = createContext<any>(null);
