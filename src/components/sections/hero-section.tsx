"use client";
import { motion } from "framer-motion";

import { DownloadButton } from "../download-button";
import Logo from "../logo";
import PosterGrid from "../poster-grid";

export default function HeroSection() {
	return (
		<div className="relative">
			<PosterGrid />
			<div className="absolute inset-0 pointer-events-none bg-linear-to-b from-background/60 to-background" />
			<section className="relative min-h-screen mx-auto max-w-7xl flex flex-col items-center justify-center">
				<div className="flex flex-col gap-6 justify-center items-center max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Logo />
					</motion.div>
					<motion.h1
						className="text-4xl font-semibold text-center text-foreground sm:text-5xl md:text-[4rem]"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Tr
						<span className="inline-block align-middle">
							<img
								src="/check.png"
								alt="Checkmark"
								width={36}
								height={36}
								className="h-9 w-9 object-cover"
							/>
						</span>
						ck what you w
						<span className="inline-block align-middle">
							<img
								src="/eye.png"
								alt="Eye"
								width={36}
								height={36}
								className="h-9 w-9 object-cover"
							/>
						</span>
						tch. Build c
						<span className="inline-block align-middle">
							<img
								src="/folder.png"
								alt="Folder"
								width={36}
								height={36}
								className="h-9 w-9 object-cover"
							/>
						</span>
						llections.
					</motion.h1>
					<motion.p
						className="max-w-xl mx-auto text-center text-lg text-white"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						With TapeTwo you can build collections, track what you've seen, and
						keep everything structured.
					</motion.p>
					<motion.div
						className="flex flex-col gap-4"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<DownloadButton />
					</motion.div>
				</div>
			</section>
		</div>
	);
}
