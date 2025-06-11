import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { BASE_URL } from '@/config';

import Toc from '@/components/NotePage/Toc';
import componentsParams from '@/components/markdown';

// TODO: Fix the build error if this page is not dynamic
export const dynamic = 'force-dynamic';

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

export default async function NotePage() {
  try {
    const { note } = await fetchData(['Home']);

    if (note) {
      return (
        <>
          <Toc content={note.content} />
          <div className="prose mx-auto dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={componentsParams}>
              {note.content}
            </ReactMarkdown>
          </div>
        </>
      );
    }

    return null;
  } catch (error) {
    console.error(error);
    return <div>Not Found</div>;
  }
}
