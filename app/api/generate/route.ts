import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { model = 'deepseek-chat', messages, max_tokens = 2000, temperature = 0.7 } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages, max_tokens, temperature }),
    });
    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return Response.json({ content });
  } catch (e: unknown) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
