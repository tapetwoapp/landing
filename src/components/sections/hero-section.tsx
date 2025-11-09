"use client";
import { motion } from "framer-motion";

import { DownloadButton } from "../download-button";
import Logo from "../logo";
import PosterGrid from "../poster-grid";

export default function HeroSection() {
	return (
		<div className="relative">
			<PosterGrid className="hidden lg:block" />
			<PosterGrid
				className="block lg:hidden"
				gap={12}
				posterHeight={133.64773379346556}
				posterWidth={89.09848665251224}
			/>
			<div className="absolute inset-0 -bottom-1 pointer-events-none bg-linear-to-b from-background/60 to-background" />
			<section className="relative min-h-screen mx-auto max-w-7xl flex flex-col items-center justify-center px-4">
				<div className="flex flex-col gap-6 justify-center items-center max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Logo className="h-4 md:h-6" />
					</motion.div>
					<motion.h1
						className="text-3xl font-semibold text-center text-foreground  md:text-6xl"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<span className="inline-block">
							Tr<span className="text-2xl md:text-4xl ">✔️</span>ck
						</span>{" "}
						what you{" "}
						<span className="inline-block">
							w<span className="text-xl md:text-4xl">👁</span>tch
						</span>
						. Build{" "}
						<span className="inline-block">
							c<span className="text-2xl md:text-4xl">📁</span>
							llections
						</span>
						.
					</motion.h1>
					<motion.p
						className="max-w-xl mx-auto text-center text-base text-white md:text-2xl"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						With TapeTwo you can build collections, track what you've seen, and
						keep <br className="block md:hidden" /> everything structured.
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
