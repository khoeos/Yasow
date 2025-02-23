import { NextResponse } from 'next/server';

import { getData } from '@/utils/server';

export async function GET() {
  try {
    return NextResponse.json(await getData('tags'));
  } catch (e) {
    console.error('[api/getTags/route.ts]', e);
    return NextResponse.json({ message: '[SERVER] Failed to fetch data' }, { status: 500 });
  }
}
