import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
// import Dashboard from './Dashboard';

export const metadata = {
  title: 'dashboard | Caya',
  description: 'description',
};

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect('/signin');
  
  return <>
    dashboard for {data.user.email}
  </>;
  // return <Dashboard />;
}
