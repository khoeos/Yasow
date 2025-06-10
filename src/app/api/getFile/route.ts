import { NextResponse } from 'next/server';

import { TreeNode } from '@/types/types';
import { getData } from '@/utils/server';
import { DISTANT_STATIC_URL, SOURCE } from '@/config';

export async function POST(request: Request) {
  try {
    const data = await getData('notes');

    const { segments } = await request.json();

    const slug =
      SOURCE === 'local'
        ? decodeURIComponent('/' + segments.join('/'))
        : decodeURIComponent(DISTANT_STATIC_URL + '/' + segments.join('/'));

    const noteData = data.find((d: TreeNode) => d.path === slug);

    const categoryData = data.filter((d: TreeNode) => {
      const splitted = d.path.split('/');
      return splitted.slice(0, splitted.length - 1).join('/') === slug;
    });

    return NextResponse.json({ note: noteData, category: categoryData });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '[SERVER] Failed to fetch data' }, { status: 500 });
  }
}
