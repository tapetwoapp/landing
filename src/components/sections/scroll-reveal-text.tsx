import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealTextProps {
	text?: string;
}

const DEFAULT_TEXT =
	"With TapeTwo, you can create collections the way you want — by mood, genre, director or with a title of your choice. It's your personal film library, finally organized.";

export default function ScrollRevealText({
	text = DEFAULT_TEXT,
}: ScrollRevealTextProps) {
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (!textRef.current) return;
		const textElement = textRef.current;
		const splitText = new SplitType(textElement, { types: "words" });

		gsap.fromTo(
			splitText.words,
			{
				color: "rgb(89, 89, 89)",
			},
			{
				color: "rgb(255, 255, 255)",
				duration: 0.3,
				stagger: 1,
				scrollTrigger: {
					trigger: textElement,
					start: "top 80%",
					end: "top 20%",
					scrub: true,
					markers: false,
					toggleActions: "play play reverse reverse",
				},
			},
		);

		return () => {
			splitText.revert();
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});
		};
	}, []);

	return (
		<section className="mx-auto max-w-7xl grid place-content-center py-10 grid-cols-12">
			<div className="col-span-1"></div>
			<div className="col-span-10">
				<p
					ref={textRef}
					className={`text-center text-[2rem] leading-12 font-semibold`}
				>
					{text}
				</p>
			</div>
			<div className="col-span-1"></div>
		</section>
	);
}
