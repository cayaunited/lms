'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  em,
  Group,
  Modal,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useDocumentTitle, useMediaQuery } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faComment,
  faPencil,
  faReply,
  faTrashCan,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatDateWithTime } from '@/lib/formatDate';
import RichEditor from '@/components/RichEditor';
import useDyslexic from '@/lib/useDyslexic';
import RichViewer from '@/components/RichViewer';
import articleValidation from '@/lib/validation/article';
import showNotification from '@/lib/showNotification';
import IconListItem from '@/components/IconListItem';
import { createClient } from '@/lib/supabase/client';

export default function Article({ courseID, articleID }: { courseID: string, articleID: string }) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [article, setArticle] = useState<any>(null);
  
  const comments = [
    {
      id: '1',
      parent: '',
      fromStudent: false,
      dateCreated: new Date(),
      anonymous: false,
      content: 'This is a comment',
    },
  ];
  
  const { headerFont } = useDyslexic();
  const isMobile = useMediaQuery(`(max-width: ${em(992)})`);
  const [editable, setEditable] = useState(false);
  const [articleEditor, setArticleEditor] = useState<any>(null);
  const [commentEditor, setCommentEditor] = useState<any>(null);
  const [deleteOpened, { toggle: toggleDelete, close: closeDelete }] = useDisclosure(false);
  const [commentOpened, { toggle: toggleComment, close: closeComment }] = useDisclosure(false);
  
  const articleForm = useForm({
    mode: 'controlled',
    initialValues: { name: '' },
    validate: articleValidation,
  });
  
  const toggleEditable = () => {
    setEditable(!editable);
    articleEditor.setEditable(!editable);
    if (!article) return;
    if (editable) articleEditor.commands.setContent(article.content);
    else articleForm.setFieldValue('name', article.name);
  };
  
  const [pageTitle, setPageTitle] = useState('new article | Caya');
  useDocumentTitle(pageTitle);
  const router = useRouter();
  
  useEffect(() => {
    if (!articleEditor) return;
    
    (async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        const uid = userData.user.id;
        
        const { data: connectionData, error: connectionError } = await supabase.from('people_to_courses')
          .select('role').eq('person_id', uid).eq('course_id', courseID);
        
        if (connectionError) {
          showNotification(false, 'Failed to load article', 'Sorry, we couldn\'t load your article');
          console.log(connectionError);
          return;
        }
        
        setUser({ id: uid, role: connectionData[0].role });
        
        if (articleID === 'new') {
          setArticle({
            poster: uid,
            name: 'New Article',
            dateCreated: new Date(),
            dateUpdated: new Date(),
            content: '',
            approved: connectionData[0].role > 0,
          });
          
          if (connectionData[0].role > 0) toggleEditable();
        } else {
          const { data: articleData, error: articleError } = await supabase.from('articles')
            .select().eq('id', articleID);
          
          if (articleError) {
            showNotification(false, 'Failed to load article', 'Sorry, we couldn\'t load your article');
            console.log(articleError);
            return;
          }
          
          const { poster_id, name, date_created, date_updated, content } = articleData[0];
          
          setArticle({
            id: articleID,
            poster: poster_id,
            name,
            dateCreated: new Date(date_created),
            dateUpdated: new Date(date_updated),
            content,
            approved: connectionData[0].role > 0,
          });
          
          setPageTitle(`${name} | Caya`);
          articleEditor.commands.setContent(content);
        }
      } catch (error) {
        showNotification(false, 'Failed to load article', 'Sorry, we couldn\'t load your article');
        console.log(error);
      }
    })();
  }, [articleEditor]);
  
  const canApprove = user?.role > 0;
  const canEdit = canApprove || article?.poster === user?.id;
  
  const saveArticle = async ({ name }: { name: string }) => {
    const content = articleEditor.getHTML();
    let id = null;
    
    try {
      setPageTitle(`${name} | Caya`);
      
      if (!article.id) {
        id = crypto.randomUUID();
        
        const { error: insertError } = await supabase.from('articles').insert({
          id,
          course_id: courseID,
          poster_id: user.id,
          name,
          date_created: new Date(),
          date_updated: new Date(),
          content,
          approved: user.role > 0,
        });
        
        if (insertError) {
          showNotification(false, 'Failed to create article', 'Sorry, we couldn\'t create the article');
          console.log(insertError);
          return;
        }
      } else {
        const { error: updateError } = await supabase.from('articles').update({
          name,
          date_updated: new Date(),
          content,
        }).eq('id', article.id);
        
        if (updateError) {
          showNotification(false, 'Failed to save article', 'Sorry, we couldn\'t save the article');
          console.log(updateError);
          return;
        }
      }
      
      setEditable(false);
      articleEditor.setEditable(false);
      
      setArticle({
        ...article,
        id: article.id ? article.id : id,
        name,
        content,
        dateCreated: article.id ? article.dateCreated : new Date(),
        dateUpdated: new Date(),
      });
    } catch (error) {
      const action = article.id ? 'save' : 'create';
      showNotification(false, `Failed to ${action} article`, `Sorry, we couldn't ${action} the article`);
      console.error(error);
    }
  };
  
  const deleteArticle = async () => {
    try {
      const { error: deleteError } = await supabase.from('articles')
        .delete().eq('id', article.id);
      
      if (deleteError) {
        showNotification(false, 'Failed to delete article', 'Sorry, we couldn\'t delete your article');
        console.log(deleteError);
        return;
      }
      
      router.push(`/course/${courseID}`);
    } catch (error) {
      showNotification(false, 'Failed to delete article', 'Sorry, we couldn\'t delete the article');
      console.error(error);
    }
  };
  
  const approveArticle = async () => {
    try {
      const { error: updateError } = await supabase.from('articles')
        .update({ approved: true }).eq('id', article.id);
      
      if (updateError) {
        showNotification(false, 'Failed to approve article', 'Sorry, we couldn\'t approve the article');
        console.log(updateError);
        return;
      }
      
      setArticle({ ...article, approved: true });
    } catch (error) {
      showNotification(false, 'Failed to approve article', 'Sorry, we couldn\'t approve the article');
      console.error(error);
    }
  };
  
  return <>
    <Title
      order={1}
      className="theme-text"
      mb="md"
    >
      {article?.name}
    </Title>
    <Text
      hiddenFrom="md"
      mb="md"
    >
      created on {formatDate(article?.dateCreated ?? new Date())},
      last updated on {formatDateWithTime(article?.dateUpdated ?? new Date())}
    </Text>
    <Group
      justify="space-between"
      mb={(isMobile && !canEdit) ? 0 : 'md'}
    >
      <Text visibleFrom="md">
        created on {formatDate(article?.dateCreated ?? new Date())},
        last updated on {formatDateWithTime(article?.dateUpdated ?? new Date())}
      </Text>
      {
        canEdit && article?.id && <Group>
          <Button
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={editable ? faXmark : faPencil} />}
            onClick={toggleEditable}
          >{editable ? 'cancel editing' : 'edit article'}</Button>
          <Button
            color="red"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={toggleDelete}
          >delete article</Button>
        </Group>
      }
    </Group>
    
    {
      canApprove ? article?.id && !article?.approved && <Button
        color="green"
        leftSection={<FontAwesomeIcon icon={faCheck} />}
        mb="md"
        onClick={approveArticle}
      >approve article</Button>
      : !article?.approved && <IconListItem
        icon={faWarning}
        color="orange"
        text={`${article?.id ? 'waiting for' : 'requires'} approval from a teacher or teaching assistant before becoming official`}
        mb="md"
      />
    }
    
    <form onSubmit={articleForm.onSubmit(saveArticle)}>
      <TextInput
        key={articleForm.key('name')}
        {...articleForm.getInputProps('name')}
        label="name"
        placeholder="How do I...?"
        display={editable ? 'block' : 'none'}
        mb="md"
      />
      <RichEditor
        defaultContent={article?.content}
        characterLimit={articleValidation.contentCharacterLimit}
        showControls={editable}
        setEditor={setArticleEditor}
      />
      <Button
        color="green"
        type="submit"
        leftSection={<FontAwesomeIcon icon={faPencil} />}
        display={editable ? 'block' : 'none'}
        mt="md"
      >save article</Button>
    </form>
    
    <Group
      justify="space-between"
      mt="md"
    >
      <Title
        order={2}
        className="theme-text"
      >
        comments
      </Title>
      <Button
        hiddenFrom="md"
        color="green"
        leftSection={<FontAwesomeIcon icon={faComment} />}
        onClick={toggleComment}
      >post comment</Button>
    </Group>
    <Button
      visibleFrom="md"
      color="green"
      mt="md"
      leftSection={<FontAwesomeIcon icon={faComment} />}
      onClick={toggleComment}
    >post comment</Button>
    
    {comments.map((comment: any, i: number) => <Paper
      key={comment.id}
      withBorder
      p="md"
      mt="md"
      ml={comment.parent ? 'xl' : 0}
      style={{ borderColor: comment.fromStudent ? undefined : 'var(--mantine-color-pink-outline)' }}
    >
      <Text fw={700}>commented {comment.anonymous ? 'anonymously' : 'by Example Person'}</Text>
      <Text mb="md">on {formatDateWithTime(comment.dateCreated)}</Text>
      <RichViewer content={comment.content} />
      <Button
        mt="md"
        color="blue"
        leftSection={<FontAwesomeIcon icon={faReply} />}
        onClick={toggleComment}
      >reply</Button>
    </Paper>)}
    
    {
      user?.role > 0 && <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title={
          <Text
            ff={headerFont}
            fw={700}
          >
            <FontAwesomeIcon
              icon={faWarning}
              color="var(--mantine-color-orange-text)"
              style={{ marginRight: rem(16) }}
              size="xl"
            />
            delete article
          </Text>
        }
      >
        <Text mb="md">
          Are you sure you want to delete this article?
        </Text>
        <Group justify="space-between">
          <Button
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeDelete}
          >cancel</Button>
          <Button
            variant="outline"
            color="red"
            leftSection={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={deleteArticle}
          >delete</Button>
        </Group>
      </Modal>
    }
    
    <Modal
      opened={commentOpened}
      onClose={closeComment}
      title={
        <Text
          ff={headerFont}
          fw={700}
        >post a comment</Text>
      }
      size="xl"
    >
      <form onSubmit={(event) => event.preventDefault()}>
        {
          user?.role === 0 && <Checkbox
            label="anonymous"
            description="Only teachers and TAs can see you posted if it's anonymous"
            mb="md"
            icon={(props) => <FontAwesomeIcon icon={faCheck} {...props} />}
          />
        }
        <RichEditor
          setEditor={setCommentEditor}
          characterLimit={1000}
          autoFocus={true}
        />
        <Group
          mt="md"
          justify="space-between"
        >
          <Button
            color="blue"
            variant="outline"
            leftSection={<FontAwesomeIcon icon={faXmark} />}
            onClick={closeComment}
          >cancel</Button>
          <Button
            type="submit"
            leftSection={<FontAwesomeIcon icon={faComment} />}
          >post</Button>
        </Group>
      </form>
    </Modal>
  </>;
}
