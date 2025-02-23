import { NextRequest, NextResponse } from 'next/server';

import { constructGraphData } from '@/utils/data';

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    if (request.headers.get('x-api-secret') !== process.env.API_SECRET_TOKEN) {
      throw new Error('Unauthorized');
    }
  }

  const graphData = await constructGraphData();
  return NextResponse.json(graphData);
}
