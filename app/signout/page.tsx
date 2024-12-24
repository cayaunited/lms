import { createClient } from '@/lib/supabase/server';
import SignOut from './SignOut';

export const metadata = {
  title: 'sign out | Caya',
  description: 'description',
};

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) await supabase.auth.signOut();
  
  return <SignOut />;
}
