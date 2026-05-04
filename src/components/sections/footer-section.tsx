import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import Logo from "@/components/logo";

type FooterLink =
	| { label: string; href: string; hash?: string; mailto?: never }
	| { label: string; mailto: string; href?: never; hash?: never };

const FOOTER_LINKS: FooterLink[] = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms & Conditions", href: "/terms-and-conditions" },
	{ label: "Contact Us", mailto: "hi@tapetwo.app" },
];

export default function FooterSection() {
	const year = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer className="bg-[#101010] py-10 text-sm text-white/70">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
				<Link to="/">
					<Logo width={106} height={16} className="text-white" />
				</Link>

				<nav
					aria-label="Footer navigation"
					className="flex flex-col items-center justify-center gap-6 text-base text-white sm:flex-row sm:flex-wrap sm:gap-8"
				>
					{FOOTER_LINKS.map((item) =>
						item.mailto ? (
							<a
								key={item.label}
								href={`mailto:${item.mailto}`}
								className="transition hover:underline"
							>
								{item.label}
							</a>
						) : (
							<Link
								key={item.label}
								to={item.href}
								hash={item.hash}
								className="transition hover:underline"
							>
								{item.label}
							</Link>
						),
					)}
				</nav>

				<p className="text-sm text-[#595959]">© TapeTwo, {year}</p>
			</div>
		</footer>
	);
}
