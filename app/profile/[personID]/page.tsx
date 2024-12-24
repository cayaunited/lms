import PublicProfile from './PublicProfile';

export const metadata = {
  title: 'public profile | Caya',
  description: 'description',
};

export default async function Page({ params }: { params: Promise<{ personID: string }> }) {
  const { personID } = await params;
  return <PublicProfile personID={personID} />;
}
