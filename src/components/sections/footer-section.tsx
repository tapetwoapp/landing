import { useMemo } from "react";
import Logo from "@/components/logo";

type FooterLink = {
	label: string;
	href: string;
};

const FOOTER_LINKS: FooterLink[] = [
	{ label: "Privacy Policy", href: "#" },
	{ label: "Terms & Conditions", href: "#" },
	{ label: "Contact Us", href: "#" },
];

export default function FooterSection() {
	const year = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer className="bg-[#0f0f10] py-16 text-sm text-white/70">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
				<Logo width={120} height={18} className="text-white" />

				<nav
					aria-label="Footer navigation"
					className="flex flex-wrap items-center justify-center gap-6 text-base text-white/80 sm:gap-8"
				>
					{FOOTER_LINKS.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className="transition hover:text-white"
						>
							{item.label}
						</a>
					))}
				</nav>

				<p className="text-sm text-white/60">© TapeTwo, {year}</p>
			</div>
		</footer>
	);
}
