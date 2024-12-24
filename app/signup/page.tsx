import { signUpWithEmail } from '@/lib/supabase/account';
import SignUp from './SignUp';

export const metadata = {
  title: 'sign up | Caya',
  description: 'description',
};

export default function Page() {
  return <SignUp signUpWithEmail={signUpWithEmail} />;
}
