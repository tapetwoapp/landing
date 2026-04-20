import { defineEventHandler, readBody } from "h3";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_ORIGINS = new Set(
	(
		process.env.ALLOWED_ORIGINS ??
		"http://localhost:3000,https://tape-two.vercel.app"
	)
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean),
);

type Body = {
	email?: string;
	honeypot?: string;
};

type SheetsResult = {
	ok: boolean;
	duplicate?: boolean;
	error?: string;
};

export default defineEventHandler(async (event) => {
	const origin = event.req.headers.get("origin");
	if (!origin || !ALLOWED_ORIGINS.has(origin)) {
		return { ok: false, error: "Forbidden." };
	}

	const body = (await readBody<Body>(event)) ?? {};
	const { email, honeypot } = body;

	if (honeypot) {
		return { ok: true };
	}

	if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
		return { ok: false, error: "Please enter a valid email." };
	}

	const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
	const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET;

	if (!webhookUrl || !webhookSecret) {
		console.error("SHEETS_WEBHOOK_URL or SHEETS_WEBHOOK_SECRET is not set");
		return { ok: false, error: "Something went wrong. Please try again." };
	}

	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: { "content-type": "application/json" },
			redirect: "follow",
			body: JSON.stringify({
				secret: webhookSecret,
				email: email.trim().toLowerCase(),
				source: "landing-beta",
			}),
		});

		const result = (await response.json()) as SheetsResult;

		if (!result.ok) {
			console.error("sheets webhook returned error", result);
			return { ok: false, error: "Something went wrong. Please try again." };
		}

		return result.duplicate ? { ok: true, duplicate: true } : { ok: true };
	} catch (error) {
		console.error("sheets webhook failed", error);
		return { ok: false, error: "Something went wrong. Please try again." };
	}
});
