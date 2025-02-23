import Link from 'next/link';

import { BASE_URL } from '@/config';
import { TreeNode } from '@/types/types';

// TODO: Fix the build error if this page is not dynamic
export const dynamic = 'force-dynamic';

const getData = async () => {
  const res = await fetch(`${BASE_URL}/api/getTags`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function TagsPage() {
  try {
    const tagsData = await getData();

    return (
      <div className="prose mx-auto dark:prose-invert">
        {Object.keys(tagsData).map((tag) => (
          <div className="mb-8" key={tag}>
            <h1 className="text-2xl font-bold mb-1">
              <Link href={`/notes/tags/${tag.replace(/^#/, '')}`}>{tag}</Link>
            </h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tagsData[tag].map((note: TreeNode) => (
                <li key={note.path}>
                  <Link href={`/notes/${note.path}`}>{note.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  } catch (e) {
    console.error('[tags/pages.tsx]', e);
    return <div>Failed to fetch data</div>;
  }
}
