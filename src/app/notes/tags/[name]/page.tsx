import Link from 'next/link';

import { BASE_URL } from '@/config';
import { TreeNode } from '@/types/types';

interface Props {
  params: Promise<{
    name: string;
  }>;
}

const getData = async (name: string) => {
  if (name === 'installHook.js') return [];
  const res = await fetch(`${BASE_URL}/api/getTags`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  if (!data[`#${name}`]) {
    throw new Error(`Tag '${name}' not found`);
  }

  return data[`#${name}`];
};

export default async function TagsPage({ params }: Props) {
  const name = decodeURIComponent((await params).name);
  const tagData = await getData(name);

  return (
    <div className="prose mx-auto dark:prose-invert">
      <h1 className="text-2xl font-bold mb-1">{name}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tagData.map((note: TreeNode) => (
          <li key={note.path}>
            <Link href={`/notes/${note.path}`}>{note.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
