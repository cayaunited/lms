import { signInWithEmail } from '@/lib/supabase/account';
import SignIn from './SignIn';

export const metadata = {
  title: 'sign in | Caya',
  description: 'description',
};

export default function Page() {
  return <SignIn signInWithEmail={signInWithEmail} />;
}
