import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
	id: number;
	icon: string;
	title: string;
	description: string;
	videoSrc: string;
}

const TABS: Tab[] = [
	{
		id: 1,
		icon: "🏠",
		title: "Stay on track",
		description:
			"Follow your watching activity in one place — see series in progress, what's now available from your collections, and the latest titles you've added.",
		videoSrc: "/video-1.mp4",
	},
	{
		id: 2,
		icon: "🎞",
		title: "Organize your way",
		description:
			"Create and manage collections that fit your style. Add any movie or series, then sort, filter, and search inside them to keep your library organized the way you like.",
		videoSrc: "/video-2.mp4",
	},
	{
		id: 3,
		icon: "🔍",
		title: "Discover with ease",
		description:
			"Find movies and series across the full database or within your own collections. Popular titles are shown by default, so there's always something new and relevant to explore.",
		videoSrc: "/video-3.mp4",
	},
];

const tabVariants = {
	inactive: { opacity: 0.45 },
	active: { opacity: 1 },
};

const contentVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0 },
};

export default function PhoneSection() {
	const [activeTab, setActiveTab] = useState(1);
	const [direction, setDirection] = useState(1);

	const handleTabChange = (newTab: number) => {
		setDirection(newTab > activeTab ? 1 : -1);
		setActiveTab(newTab);
	};

	const current = TABS.find((t) => t.id === activeTab) || TABS[0];

	return (
		<section className="mx-auto mt-10 grid max-w-7xl grid-cols-12 gap-6 px-4">
			<div className="col-span-1"></div>
			<div className="col-span-5 pt-28">
				<div className="grid gap-8">
					{TABS.map((tab) => (
						<motion.button
							key={tab.id}
							type="button"
							onClick={() => handleTabChange(tab.id)}
							className={cn(
								"cursor-pointer flex flex-col items-start text-start transition-opacity duration-300 rounded-lg p-4 hover:bg-white/5",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
							)}
							variants={tabVariants}
							animate={activeTab === tab.id ? "active" : "inactive"}
						>
							<motion.div
								className="mb-2 text-xl font-semibold leading-9"
								layoutId={`tab-title-${tab.id}`}
							>
								{tab.icon} {tab.title}
							</motion.div>
							<motion.div
								key={`content-${tab.id}`}
								variants={contentVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								transition={{ duration: 0.25 }}
								className="leading-6"
							>
								{tab.description}
							</motion.div>
						</motion.button>
					))}
				</div>
			</div>
			<div className="col-span-1"></div>
			<div className="col-span-3 flex items-center justify-center">
				<motion.div
					className="relative w-full max-w-[320px] sm:max-w-[360px]"
					initial={{ opacity: 0, scale: 0.96 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="grid relative overflow-hidden">
						<div className="col-start-1 row-start-1 p-[4%]">
							<div className="relative h-full w-full overflow-hidden rounded-[8%] ">
								<AnimatePresence mode="wait" custom={direction}>
									<motion.video
										key={current.videoSrc}
										src={current.videoSrc}
										autoPlay
										loop
										muted
										playsInline
										preload="metadata"
										className="h-full w-full object-cover"
										custom={direction}
										initial={{ x: direction > 0 ? 280 : -280, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: direction > 0 ? -280 : 280, opacity: 0 }}
										transition={{
											x: { type: "spring", stiffness: 320, damping: 30 },
											opacity: { duration: 0.2 },
										}}
									/>
								</AnimatePresence>
							</div>
						</div>

						<div className="col-start-1 row-start-1 z-1 ">
							<img
								src="/phone-mockup.png"
								alt="Phone Frame"
								className="pointer-events-none z-20 select-none w-auto h-full object-containa"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
