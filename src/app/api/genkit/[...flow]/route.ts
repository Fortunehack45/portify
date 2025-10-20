import { NextRequest, NextResponse } from 'next/server';
import { runFlow } from 'genkit';
import { suggestTemplatesFlow } from '@/ai/flows/ai-template-suggestions';

const flowMap: Record<string, any> = {
  suggestTemplates: suggestTemplatesFlow,
  // Add other flows here as they are created
};

export async function POST(
  req: NextRequest,
  { params }: { params: { flow: string[] } }
) {
  const flowName = params.flow[0];
  const flow = flowMap[flowName];

  if (!flow) {
    return NextResponse.json({ error: `Flow '${flowName}' not found.` }, { status: 404 });
  }

  const input = await req.json();
  const output = await runFlow(flow, input);

  return NextResponse.json(output);
}
