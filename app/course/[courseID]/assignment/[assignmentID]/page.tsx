import Assignment from './Assignment';

export const metadata = {
  title: 'new assignment | Caya',
  description: 'description',
};

export default async function Page({ params }: { params: Promise<{ courseID: string, assignmentID: string }> }) {
  const { courseID, assignmentID } = await params;
  return <Assignment
    courseID={courseID}
    assignmentID={assignmentID}
  />;
}
