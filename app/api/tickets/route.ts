import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const ticketSchema = z.object({
  customerName: z.string(),
  sentiment: z.enum(['URGENT', 'NORMAL', 'LOW']),
  category: z.string(),
  summary: z.string(),
  suggestedDraftReply: z.string(),
});

export async function POST(request: Request) {
  const { rawCustomerEmail } = await request.json();

  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-flash),
      schema: ticketSchema,
        prompt: `Analyze this customer support email and extract structured data.

Email:
${rawCustomerEmail}

Extract:
- customerName: the customer's name (or "Unknown" if not found)
- sentiment: URGENT if angry/time-sensitive, LOW if calm/informational, NORMAL otherwise
- category: a short label like "Billing Issue", "Technical Support", "Refund Request", etc.
- summary: one sentence TL;DR of the issue
- suggestedDraftReply: a professional, empathetic draft reply to send to the customer`,
    });

    return Response.json(object);
  } catch (err: any) {
    const status = err?.statusCode ?? 500;
    const message = err?.message ?? 'Unknown error';
    return Response.json({ error: message }, { status });
  }
}
