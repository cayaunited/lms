import { getTimeComponents } from '../formatDate';

const minStartHour = 6;
const maxStartHour = 23;
const maxStartHour12 = maxStartHour - 12;
const minEndHour = 7;
const maxEndHour = 24;
const maxEndHour12 = maxEndHour - 12;

export default {
  minStartHour,
  maxStartHour,
  maxStartHour12,
  minEndHour,
  maxEndHour,
  maxEndHour12,
  date: (value: Date) => {
    const today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    
    return (value.getTime() >= today.getTime() ? null : 'must be today or later');
  },
  startTime: (value: string, values: any) => {
    const [startHour, startMinute] = getTimeComponents(value);
    const [endHour, endMinute] = getTimeComponents(values.endTime);
    const realEndHour = endHour === 0 ? 24 : endHour;
    
    return (startHour >= minStartHour ? null : `must start at or after ${minStartHour} am`)
      || ((startHour < maxStartHour || startHour === maxStartHour && startMinute === 0) ? null : `must start at or before ${maxStartHour12} pm`)
      || ((startHour < realEndHour || startHour === realEndHour && startMinute < endMinute) ? null : `must start before the end`);
  },
  endTime: (value: string, values: any) => {
    const [startHour, startMinute] = getTimeComponents(values.startTime);
    const [endHour, endMinute] = getTimeComponents(value);
    const realEndHour = endHour === 0 ? 24 : endHour;
    
    return (realEndHour >= minEndHour ? null : `must end at or after ${minEndHour} am`)
      || ((realEndHour < maxEndHour || realEndHour === maxEndHour && endMinute === 0) ? null : `must end at or before ${maxEndHour12} am`)
      || ((startHour < realEndHour || startHour === realEndHour && startMinute < endMinute) ? null : `must end after the start`);
  },
  location: (value: string) => (value.length >= 3 ? null : 'must be at least 3 characters')
    || (value.length <= 100 ? null : 'must be at most 100 characters'),
};
