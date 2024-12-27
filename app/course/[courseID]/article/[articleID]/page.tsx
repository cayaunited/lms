import Article from './Article';

export const metadata = {
  title: 'article | Caya',
  description: 'description',
};

export default async function Page({ params }: { params: Promise<{ courseID: string, articleID: string }> }) {
  const { courseID, articleID } = await params;
  return <Article
    courseID={courseID}
    articleID={articleID}
  />;
}
