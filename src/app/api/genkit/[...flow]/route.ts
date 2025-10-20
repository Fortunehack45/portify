import { NextRequest, NextResponse } from 'next/server';
import { runFlow } from 'genkit';
import { suggestTemplatesFlow } from '@/ai/flows/ai-template-suggestions';

// Note: This is a simplified handler. In a real-world scenario,
// you would have a mapping from flow names in the URL to actual flow objects.
const flowMap: Record<string, any> = {
  suggestTemplates: suggestTemplatesFlow,
};

export async function POST(
  req: NextRequest,
  { params }: { params: { flow: string[] } }
) {
  try {
    const flowName = params.flow[0];
    const flow = flowMap[flowName];

    if (!flow) {
      return NextResponse.json({ error: `Flow '${flowName}' not found.` }, { status: 404 });
    }

    const input = await req.json();
    const output = await runFlow(flow, input);

    return NextResponse.json(output);
  } catch (err: any) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
