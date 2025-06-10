import ReactMarkdown from 'react-markdown';

import { BASE_URL } from '@/config';
import { TreeNode } from '@/types/types';

import Toc from '@/components/NotePage/Toc';
import componentsParams from '@/components/markdown';

export const dynamic = 'force-dynamic';

interface NotePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function fetchData(segments: string[]) {
  const res = await fetch(`${BASE_URL}/api/getFile`, {
    method: 'POST',
    body: JSON.stringify({ segments }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function NotePage({ params }: NotePageProps) {
  const segments = (await params).slug.map(decodeURIComponent);

  try {
    const data = await fetchData(segments);
    const { note, category } = data;
    if (note) {
      return (
        <>
          <Toc content={note.content} />
          <div className="prose mx-auto dark:prose-invert">
            <h1>{note.name || ''}</h1>
            <ReactMarkdown components={componentsParams}>{note.content}</ReactMarkdown>
          </div>
        </>
      );
    }

    if (category) {
      const title = segments[segments.length - 1];
      return (
        <div className="prose mx-auto dark:prose-invert">
          <h1>{title}</h1>
          <ul>
            {category.map((note: TreeNode) => (
              <li key={note.path}>
                <a href={`/notes/${note.path}`}>{note.name}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  } catch (error) {
    console.error(error);
    return <div>Not Found</div>;
  }
}
