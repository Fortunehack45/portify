import { NextRequest, NextResponse } from 'next/server';
import { runFlow } from 'genkit';

export async function POST(
  req: NextRequest,
  { params }: { params: { flow: string[] } }
) {
  const flowName = params.flow[0];
  const input = await req.json();

  try {
    const output = await runFlow(flowName, input);
    return NextResponse.json(output);
  } catch (error: any) {
    console.error(`Error running flow '${flowName}':`, error);
    return NextResponse.json(
      { 
        error: `An error occurred while running the flow: ${error.message || 'Internal Server Error'}` 
      }, 
      { status: 500 }
    );
  }
}
