import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { JoinBetaButton } from "../join-beta-button";
import Logo from "../logo";

type HeaderLink = {
	label: string;
	href: string;
};

const HEADER_LINKS: HeaderLink[] = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function HeaderSection() {
	return (
		<header className="flex items-center justify-between px-6 py-6 md:grid md:grid-cols-[200px_1fr_200px] md:px-7">
			<Link to="/">
				<Logo height={18.44} width={122.04} />
			</Link>
			<nav
				aria-label="Primary navigation"
				className="hidden flex-wrap items-center justify-center gap-6 text-base text-white md:flex md:gap-8"
			>
				{HEADER_LINKS.map((item) => (
					<Link
						key={item.label}
						to={item.href}
						activeProps={{
							className: "text-white",
						}}
						className={cn("transition text-[#8e8e8e] hover:underline")}
					>
						{item.label}
					</Link>
				))}
			</nav>
			<div className="flex md:justify-end">
				<JoinBetaButton className="h-8 text-sm px-3 ps-3.5 rounded-lg" />
			</div>
		</header>
	);
}
