import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
	id: number;
	icon: string;
	title: string;
	description: string;
	startTime: number;
}

const VIDEO_SRC =
	"https://j9efxe770anbwvjq.public.blob.vercel-storage.com/website-video.mp4";

const TABS: Tab[] = [
	{
		id: 1,
		icon: "🏠",
		title: "Stay on track",
		description:
			"Follow your watching activity in one place — see series in progress, what's now available from your collections, and the latest titles you've added.",
		startTime: 0,
	},
	{
		id: 2,
		icon: "🎞",
		title: "Organize your way",
		description:
			"Create and manage collections that fit your style. Add any movie or series, then sort, filter, and search inside them to keep your library organized the way you like.",
		startTime: 8,
	},
	{
		id: 3,
		icon: "🔍",
		title: "Discover with ease",
		description:
			"Find movies and series across the full database or within your own collections. Popular titles are shown by default, so there's always something new and relevant to explore.",
		startTime: 17,
	},
];

const getTabIdForTime = (time: number) => {
	let match = TABS[0].id;
	for (const tab of TABS) {
		if (time + 0.05 >= tab.startTime) match = tab.id;
	}
	return match;
};

const SWIPE_THRESHOLD = 50;

export default function PhoneSection() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const seekTargetRef = useRef<number | null>(null);
	const touchStartRef = useRef<{ x: number; y: number } | null>(null);
	const [activeTab, setActiveTab] = useState(TABS[0].id);
	const [videoReady, setVideoReady] = useState(false);
	const [seeking, setSeeking] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (video.readyState >= 3) {
			setVideoReady(true);
			return;
		}
		const markReady = () => setVideoReady(true);
		video.addEventListener("loadeddata", markReady);
		video.addEventListener("canplay", markReady);
		video.addEventListener("playing", markReady);
		return () => {
			video.removeEventListener("loadeddata", markReady);
			video.removeEventListener("canplay", markReady);
			video.removeEventListener("playing", markReady);
		};
	}, []);

	const handleTabChange = (tabId: number) => {
		const tab = TABS.find((t) => t.id === tabId);
		const video = videoRef.current;
		if (!tab || !video) return;
		seekTargetRef.current = tabId;
		video.currentTime = tab.startTime;
		setActiveTab(tabId);
	};

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (!video || video.seeking) return;
		const next = getTabIdForTime(video.currentTime);
		if (seekTargetRef.current !== null) {
			if (next === seekTargetRef.current) {
				seekTargetRef.current = null;
			} else {
				return;
			}
		}
		setActiveTab((prev) => (prev === next ? prev : next));
	};

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		const touch = event.touches[0];
		touchStartRef.current = { x: touch.clientX, y: touch.clientY };
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		const start = touchStartRef.current;
		touchStartRef.current = null;
		if (!start) return;
		const touch = event.changedTouches[0];
		const dx = touch.clientX - start.x;
		const dy = touch.clientY - start.y;
		if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
		const currentIdx = TABS.findIndex((t) => t.id === activeTab);
		if (dx > 0 && currentIdx > 0) {
			handleTabChange(TABS[currentIdx - 1].id);
		} else if (dx < 0 && currentIdx < TABS.length - 1) {
			handleTabChange(TABS[currentIdx + 1].id);
		}
	};

	const current = TABS.find((t) => t.id === activeTab) ?? TABS[0];

	return (
		<section
			className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-8 px-4 lg:grid lg:grid-cols-12 lg:gap-6"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div className="order-2 w-full lg:order-1 lg:col-span-5 lg:col-start-2 lg:pt-28">
				<div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center lg:hidden">
					<motion.div
						key={current.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.15 }}
						className="flex flex-col gap-2"
					>
						<div className="text-xl font-semibold leading-9">
							{current.icon} {current.title}
						</div>
						<p className="leading-6 text-white/80">{current.description}</p>
					</motion.div>
					<div className="flex items-center justify-center gap-3">
						{TABS.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => handleTabChange(tab.id)}
								aria-label={`Show ${tab.title}`}
								aria-current={activeTab === tab.id}
								className={cn(
									"h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
									activeTab === tab.id
										? "w-6 bg-white"
										: "w-2 bg-white/30 hover:bg-white/50",
								)}
							/>
						))}
					</div>
				</div>

				<div className="hidden lg:grid lg:gap-8">
					{TABS.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => handleTabChange(tab.id)}
							className={cn(
								"cursor-pointer flex flex-col items-start text-start transition-opacity duration-300 rounded-lg p-4 hover:bg-white/5",
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
								activeTab === tab.id ? "opacity-100" : "opacity-45",
							)}
						>
							<div className="mb-2 text-xl font-semibold leading-9">
								{tab.icon} {tab.title}
							</div>
							<div className="leading-6">{tab.description}</div>
						</button>
					))}
				</div>
			</div>

			<div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-3 lg:col-start-9">
				<motion.div
					className="relative w-full max-w-55 sm:max-w-90"
					initial={{ opacity: 0, scale: 0.96 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="grid relative overflow-hidden">
						<div className="col-start-1 row-start-1 p-[4%]">
							<div className="relative h-full w-full overflow-hidden rounded-[8%] bg-black">
								<video
									ref={videoRef}
									src={VIDEO_SRC}
									autoPlay
									loop
									muted
									playsInline
									preload="metadata"
									onTimeUpdate={handleTimeUpdate}
									onSeeking={() => setSeeking(true)}
									onSeeked={() => setSeeking(false)}
									onPlaying={() => setSeeking(false)}
									className={cn(
										"h-full w-full object-cover transition-opacity duration-150",
										seeking && "opacity-0",
									)}
								/>
								{!videoReady && (
									<div
										className="absolute inset-0 flex items-center justify-center bg-black"
										aria-hidden="true"
									>
										<div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
									</div>
								)}
							</div>
						</div>

						<div className="col-start-1 row-start-1 z-1">
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
