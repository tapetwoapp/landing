import { type FormEvent, useId, useState } from "react";
import PosterGrid from "@/components/poster-grid";
import { cn } from "@/lib/utils";

export default function ContactSection() {
	const [email, setEmail] = useState("");
	const emailId = useId();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<section className="relative isolate overflow-hidden py-24 sm:py-32">
			<PosterGrid staggerAxis="column" gap={16} />

			<div className="absolute inset-0 bg-linear-to-b from-background via-black/85 to-black" />

			<div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center sm:px-8">
				<h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
					More features are coming!
				</h2>
				<p className="mt-4 text-base text-white/70 sm:text-lg md:text-xl">
					We’re just getting started. Subscribe to stay updated on upcoming
					releases and new features we’re working on.
				</p>

				<form
					onSubmit={handleSubmit}
					className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row"
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
						onChange={(event) => setEmail(event.target.value)}
						className={cn(
							"h-12 w-full rounded-lg border border-white/10 bg-white/5 px-6 text-base text-white",
							"placeholder:text-white/40 outline-none transition",
							"focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20",
							"sm:max-w-md",
						)}
					/>
					<button
						type="submit"
						className="h-12 w-full rounded-lg bg-white px-8 text-base font-semibold text-black transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
					>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
}
