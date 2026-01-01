import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            return NextResponse.json(
                { error: 'N8N Webhook URL is not defined on the server' },
                { status: 500 }
            );
        }

        console.log('Forwarding request to n8n:', webhookUrl);
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log('n8n Response Status:', response.status);

        const responseText = await response.text();
        console.log('n8n Raw Response:', responseText);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Webhook call failed: ${response.statusText}`, detail: responseText },
                { status: response.status }
            );
        }

        try {
            const data = JSON.parse(responseText);
            return NextResponse.json(data);
        } catch (e) {
            console.warn('n8n response is not JSON:', responseText);
            // If it's not JSON, return it as a string or wrap it
            return NextResponse.json({ output: responseText });
        }
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: (error as Error).message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
