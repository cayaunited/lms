'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function signUpWithEmail(name: string, email: string, role: string, password: string) {
  try {
    const supabase = await createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) return signUpError.code;
    
    const { error: peopleError } = await supabase.from('people').insert({
      id: data.user?.id,
      name,
      role: role === 'teacher' ? 1 : 0,
      avatar: 0,
    });
    
    if (peopleError) return peopleError.code;
    
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user?.id,
      biography: '',
      majors: [],
      minors: [],
      semesters: null,
      organizations: [],
      hobbies: [],
    });
    
    if (profileError) return profileError.code;
    
    revalidatePath('/', 'layout');
  } catch (error) {
    return error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) return error.code;
    revalidatePath('/', 'layout');
  } catch (error) {
    return error;
  }
}
