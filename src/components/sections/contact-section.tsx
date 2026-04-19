import { Link } from "@tanstack/react-router";
import { type FormEvent, useId, useState } from "react";
import PosterGrid from "@/components/poster-grid";
import { cn } from "@/lib/utils";

type BetaSignupResult = {
	ok: boolean;
	duplicate?: boolean;
	error?: string;
};

export default function ContactSection() {
	const [email, setEmail] = useState("");
	const [honeypot, setHoneypot] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const emailId = useId();
	const honeypotId = useId();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (pending) return;
		setError(null);
		setPending(true);
		try {
			const response = await fetch("/api/beta-signup", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email, honeypot }),
			});
			const payload: BetaSignupResult = await response.json();
			if (payload.ok) {
				setSubmitted(true);
			} else {
				setError(payload.error ?? "Something went wrong. Please try again.");
			}
		} catch (err) {
			console.error("beta signup failed", err);
			setError("Network error. Please try again.");
		} finally {
			setPending(false);
		}
	};

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ignore>
		<section
			id="contact"
			className="relative isolate overflow-hidden py-24 sm:py-32"
		>
			<PosterGrid staggerAxis="column" gap={16} />

			<div className="absolute inset-0 bg-linear-to-b from-background via-black/45 to-background" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_center,rgba(7,7,7,0.75),transparent_80%)]" />

			<div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-6 items-center text-center">
				{submitted ? (
					<div className="flex flex-col gap-4" aria-live="polite">
						<h2 className="text-[2rem] font-semibold tracking-tight text-white">
							🍿 You’re on the list!
						</h2>
						<p className="text-xl leading-6 text-white font-light">
							We’ll email you when your beta access is ready. Make sure to check
							your inbox and spam folder.
						</p>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-4 px-4">
							<h2 className="text-[2rem] font-semibold tracking-tight text-white">
								Join Beta
							</h2>
							<p className="text-xl leading-6 text-white font-light">
								Sign up for the waitlist to get access to our closed beta.
								Please use your Apple ID email, it’s required for access via
								TestFlight.
							</p>
						</div>
						<form
							onSubmit={handleSubmit}
							className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-4 px-4 sm:max-w-none sm:flex-row sm:items-center sm:px-0"
						>
							<label htmlFor={emailId} className="sr-only">
								Email
							</label>
							<input
								id={emailId}
								type="email"
								required
								placeholder="Email"
								value={email}
								disabled={pending}
								onChange={(event) => setEmail(event.target.value)}
								className={cn(
									"w-full sm:w-[312px]",
									"h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-base text-white",
									"placeholder:text-white/40 outline-none transition",
									"focus:border-white focus:bg-white/10 focus:ring-2 focus:ring-white",
									"disabled:opacity-50",
								)}
							/>
							<label
								htmlFor={honeypotId}
								className="sr-only"
								aria-hidden="true"
							>
								Do not fill this field
							</label>
							<input
								id={honeypotId}
								type="text"
								tabIndex={-1}
								autoComplete="off"
								value={honeypot}
								onChange={(event) => setHoneypot(event.target.value)}
								className="sr-only"
								aria-hidden="true"
							/>
							<button
								type="submit"
								disabled={pending}
								className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-base font-semibold text-black transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60 sm:w-auto"
							>
								{pending && (
									<span
										className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"
										aria-hidden="true"
									/>
								)}
								{pending ? "Signing up…" : "Sign Up"}
							</button>
						</form>
						{error && (
							<p
								className="text-sm text-red-300"
								role="alert"
								aria-live="polite"
							>
								{error}
							</p>
						)}
						<p className="px-4 text-sm text-white/50">
							By submitting, you agree to our{" "}
							<Link to="/privacy-policy" className="underline hover:text-white">
								Privacy Policy
							</Link>
							.
						</p>
					</>
				)}
			</div>
		</section>
	);
}
