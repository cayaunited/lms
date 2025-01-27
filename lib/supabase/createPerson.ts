import { SupabaseClient } from '@supabase/supabase-js';

export default async function createPerson(supabase: SupabaseClient<any, 'public', any>, id: string, name: string, email: string, role: number) {
  const { error: peopleError } = await supabase.from('people').insert({
    id,
    name,
    email,
    role,
    avatar: 0,
  });
  
  if (peopleError) return peopleError.code;
  
  const { error: profileError } = await supabase.from('profiles').insert({
    id,
    biography: '',
    majors: [],
    minors: [],
    semesters: null,
    organizations: [],
    hobbies: [],
  });
  
  if (profileError) return profileError.code;
}
