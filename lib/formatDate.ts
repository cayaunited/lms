export function formatDate(date:Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function formatDateWithTime(date?:Date) {
  if (!date) return '';
  let hour = date.getHours();
  const amOrPm = hour < 12 ? 'am' : 'pm';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  const minute = date.getMinutes();
  
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hour}:${minute < 10 ? '0' : ''}${minute} ${amOrPm}`;
}

export function formatTime(date:Date) {
  let hour = date.getHours();
  const amOrPm = hour < 12 ? 'am' : 'pm';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  const minute = date.getMinutes();
  
  return `${hour}:${minute < 10 ? '0' : ''}${minute} ${amOrPm}`;
}

export function getTimeComponents(time:string) {
  const components = time.split(':');
  return [Number(components[0]), Number(components[1])];
}
