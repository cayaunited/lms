import Course from './Course';

export const metadata = {
  title: 'course dashboard | Caya',
  description: 'description',
};

export default async function Page({ params }: { params: Promise<{ courseID: string }> }) {
  const { courseID } = await params;
  return <Course courseID={courseID} />;
}
