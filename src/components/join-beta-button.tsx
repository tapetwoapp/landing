import { cn } from "@/lib/utils";

type JoinBetaButtonProps = {
	className?: string;
};

export const JoinBetaButton = ({ className }: JoinBetaButtonProps) => {
	const handleClick = () => {
		document
			.getElementById("contact")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"cursor-pointer px-6 py-3 text-sm font-bold text-black bg-white rounded-xl flex items-center gap-2 hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition",
				className,
			)}
		>
			<span>Join Beta</span>
		</button>
	);
};
