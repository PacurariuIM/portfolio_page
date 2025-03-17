/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/**
 * Contact Form Handler
 * 
 * This worker handles contact form submissions and sends emails using MailChannels API.
 * It includes CORS support and basic validation.
 */

interface EmailPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface CloudflareAPIResponse {
	errors?: { message: string }[];
	success: boolean;
}

interface Env {
	CONTACT_EMAIL: string;  // The email address to send notifications to
	EMAIL_FROM: string;     // The sender email address
	CF_API_TOKEN: string;   // Cloudflare API token
	CF_ACCOUNT_ID: string;  // Cloudflare account ID
}

// Define the SendEmail interface
interface SendEmail {
	send: (message: EmailMessage) => Promise<void>;
}

interface EmailMessage {
	from: string | { email: string; name?: string };
	to: string | { email: string; name?: string } | (string | { email: string; name?: string })[];
	subject: string;
	text?: string;
	html?: string;
}

// CORS headers for preflight requests
const corsHeaders = {
	'Access-Control-Allow-Origin': 'https://ionel-tech.dev',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		const url = new URL(request.url);
		
		// Only handle /send path
		if (url.pathname !== '/send') {
			return new Response('Not found', { 
				status: 404,
				headers: corsHeaders
			});
		}

		// Only allow POST requests
		if (request.method !== 'POST') {
			return new Response('Method not allowed', { 
				status: 405,
				headers: corsHeaders
			});
		}

		try {
			const payload: EmailPayload = await request.json();

			// Basic validation
			if (!payload.name || !payload.email || !payload.subject || !payload.message) {
				return new Response('Missing required fields', { 
					status: 400,
					headers: corsHeaders
				});
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(payload.email)) {
				return new Response('Invalid email format', { 
					status: 400,
					headers: corsHeaders
				});
			}

			// Send email using Email Workers binding
			try {
				// Create a simple email message
				const message = `
From: ${payload.name} <${payload.email}>
Subject: ${payload.subject}

${payload.message}
				`;

				// Send email using Cloudflare's Email API
				const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/routing/send`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Auth-Email': env.EMAIL_FROM,
						'X-Auth-Key': env.CF_API_TOKEN
					},
					body: JSON.stringify({
						message: {
							to: [env.CONTACT_EMAIL],
							from: env.EMAIL_FROM,
							subject: `Portfolio Contact: ${payload.subject}`,
							text: message
						}
					})
				});

				const result = await response.json() as CloudflareAPIResponse;
				console.log('Email API response:', result);

				if (!response.ok) {
					console.error('Failed to send email:', result);
					return new Response(JSON.stringify({
						error: 'Failed to send email',
						details: result.errors?.[0]?.message || 'Unknown error'
					}), { 
						status: 500,
						headers: {
							...corsHeaders,
							'Content-Type': 'application/json'
						}
					});
				}
				
				console.log('Email sent successfully');
				
				return new Response('Message sent successfully', {
					status: 200,
					headers: corsHeaders,
				});
			} catch (emailError) {
				console.error('Failed to send email:', emailError);
				return new Response(JSON.stringify({
					error: 'Failed to send email',
					details: emailError instanceof Error ? emailError.message : 'Unknown error'
				}), { 
					status: 500,
					headers: {
						...corsHeaders,
						'Content-Type': 'application/json'
					}
				});
			}
		} catch (err) {
			console.error('Error processing request:', err);
			return new Response(JSON.stringify({
				error: 'Internal server error',
				details: err instanceof Error ? err.message : 'Unknown error'
			}), { 
				status: 500,
				headers: {
					...corsHeaders,
					'Content-Type': 'application/json'
				}
			});
		}
	},
} satisfies ExportedHandler<Env>;
