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
		// biome-ignore lint/correctness/useUniqueElementIds: <ignore>
		<section
			id="contact"
			className="relative isolate overflow-hidden py-24 sm:py-32"
		>
			<PosterGrid staggerAxis="column" gap={16} />

			<div className="absolute inset-0 bg-linear-to-b from-background via-black/85 to-black" />

			<div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-6 items-center text-center">
				<div className="flex flex-col gap-4">
					<h2 className="text-[2rem] font-semibold tracking-tight text-white">
						More features are coming!
					</h2>
					<p className="text-xl leading-6 text-white font-light">
						We’re just getting started. Subscribe to stay updated on upcoming
						releases and new features we’re working on.
					</p>
				</div>
				<form
					onSubmit={handleSubmit}
					className="mx-auto flex w-full flex-col items-center justify-center gap-4"
				>
					<div className="flex gap-4">
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
								"w-[312px]",
								"h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-base text-white",
								"placeholder:text-white/40 outline-none transition",
								"focus:border-white focus:bg-white/10 focus:ring-2 focus:ring-white",
							)}
						/>
						<button
							type="submit"
							className="h-12 w-full rounded-xl bg-white px-4 text-base font-semibold text-black transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
						>
							Subscribe
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
