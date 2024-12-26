'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function signUpWithEmail(name: string, email: string, role: string, password?: string) {
  try {
    const supabase = await createClient();
    
    if (password) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      });
      
      if (signUpError) return signUpError.code;
    } else {
      const { error: signUpError } = await supabase.auth.signInWithOtp({
        email,
        options: { data: { name, role } },
      });
      
      if (signUpError) return signUpError.code;
    }
    
    revalidatePath('/', 'layout');
  } catch (error) {
    return error;
  }
}

export async function signInWithEmail(email: string, password?: string) {
  try {
    const supabase = await createClient();
    
    if (password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return error.code;
    } else {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) return error.code;
    }
    
    revalidatePath('/', 'layout');
  } catch (error) {
    return error;
  }
}
