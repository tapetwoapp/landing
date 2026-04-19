import { defineEventHandler, getRequestIP, readBody } from "h3";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const EMAIL_LIST_KEY = "beta:emails";
const RATE_LIMIT_WINDOW_SECONDS = 600;
const RATE_LIMIT_MAX_HITS = 5;

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

	const normalizedEmail = email.trim().toLowerCase();

	try {
		const redis = new Redis({
			url: process.env.KV_REST_API_URL,
			token: process.env.KV_REST_API_TOKEN,
		});

		const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
		const rateKey = `rate:beta:${ip}`;
		const hits = await redis.incr(rateKey);
		if (hits === 1) {
			await redis.expire(rateKey, RATE_LIMIT_WINDOW_SECONDS);
		}
		if (hits > RATE_LIMIT_MAX_HITS) {
			return {
				ok: false,
				error: "Too many attempts. Please try again later.",
			};
		}

		const added = await redis.sadd(EMAIL_LIST_KEY, normalizedEmail);

		if (added === 0) {
			return { ok: true, duplicate: true };
		}

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) {
			console.warn("RESEND_API_KEY is not set; skipping confirmation email");
		} else {
			const resend = new Resend(apiKey);
			const { data: sendData, error: sendError } = await resend.emails.send({
				from: "TapeTwo <onboarding@resend.dev>",
				to: normalizedEmail,
				subject: "You're on the TapeTwo beta list",
				html: `
					<div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0b0b0b">
						<h1 style="font-size:22px;font-weight:600;margin:0 0 12px">🍿 You're on the list!</h1>
						<p style="font-size:16px;line-height:1.5;margin:0 0 8px">
							Thanks for signing up for the TapeTwo beta.
						</p>
						<p style="font-size:16px;line-height:1.5;margin:0 0 16px">
							We'll email you when your beta access is ready. Make sure to check your inbox and spam folder.
						</p>
						<p style="font-size:13px;color:#595959;margin-top:24px">
							Didn't sign up? Ignore this email.
						</p>
					</div>
				`,
			});
			if (sendError) {
				console.error("resend send failed", sendError);
			} else {
				console.log("resend sent", sendData?.id ?? "(no id)");
			}
		}

		return { ok: true };
	} catch (error) {
		console.error("beta signup failed", error);
		return { ok: false, error: "Something went wrong. Please try again." };
	}
});
