import { createFileRoute } from "@tanstack/react-router";
import { title } from "process";
import FooterSection from "@/components/sections/footer-section";
import HeaderSection from "@/components/sections/header-section";

export const Route = createFileRoute("/terms-and-conditions")({
	component: TestPage,
});

// 1. Acceptance of Terms
// By downloading, installing, or using the TapeTwo mobile application (“App”), you agree to be bound by these Terms & Conditions (“Terms”).
// If you do not agree, please do not use the App.
// 2. Description of Service
// TapeTwo is a free personal tool that allows users to track their progress while watching movies and series and to create custom collections.
// All user data is stored locally on the user’s device.
// 3. Eligibility
// You must be at least 13 years old to use the App.
// 4. Intellectual Property
// All rights, titles, and interests in and to the App — including its design, icons, artwork, logos, and visual elements — are the property of the TapeTwo development team.
// You may not copy, modify, reverse-engineer, distribute, or reuse any part of the App or its content without prior written permission.
// 5. Disclaimer
// The App is provided “as is”, without any warranties, express or implied.
// We do not guarantee that the App will be error-free, uninterrupted, or compatible with all devices or future versions of iOS.
// We are not responsible for any data loss, device malfunction, or other damages arising from the use of the App.
// 6. Limitation of Liability
// To the maximum extent permitted by applicable law, TapeTwo and its developers shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the App.
// 7. Changes to These Terms
// We reserve the right to modify or update these Terms at any time, at our sole discretion.
// Any changes will become effective once published within the App or on our website.
// Your continued use of the App after such updates means you accept the revised Terms.
// 8. Governing Law
// These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
// If required by local law, you may have additional consumer rights that cannot be waived by these Terms.
// 9. Contact
// If you have any questions about these Terms, please contact us at: 📧 hi@tapetwo.app

const terms = [
	{
		title: "1. Acceptance of Terms",
		content: `By downloading, installing, or using the TapeTwo mobile application (“App”), you agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, please do not use the App.`,
	},
	{
		title: "2. Description of Service",
		content: `TapeTwo is a free personal tool that allows users to track their progress while watching movies and series and to create custom collections. All user data is stored locally on the user’s device.`,
	},
	{
		title: "3. Eligibility",
		content: `You must be at least 13 years old to use the App.`,
	},
	{
		title: "4. Intellectual Property",
		content: `All rights, titles, and interests in and to the App — including its design, icons, artwork, logos, and visual elements — are the property of the TapeTwo development team. You may not copy, modify, reverse-engineer, distribute, or reuse any part of the App or its content without prior written permission.`,
	},
	{
		title: "5. Disclaimer",
		content: `The App is provided “as is”, without any warranties, express or implied. We do not guarantee that the App will be error-free, uninterrupted, or compatible with all devices or future versions of iOS. We are not responsible for any data loss, device malfunction, or other damages arising from the use of the App.`,
	},
	{
		title: "6. Limitation of Liability",
		content: `To the maximum extent permitted by applicable law, TapeTwo and its developers shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the App.`,
	},
	{
		title: "7. Changes to These Terms",
		content: `We reserve the right to modify or update these Terms at any time, at our sole discretion. Any changes will become effective once published within the App or on our website. Your continued use of the App after such updates means you accept the revised Terms.`,
	},
	{
		title: "8. Governing Law",
		content: `These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. If required by local law, you may have additional consumer rights that cannot be waived by these Terms.`,
	},
	{
		title: "9. Contact",
		content: `If you have any questions about these Terms, please contact us at: 📧 [hi@tapetwo.app](mailto:hi@tapetwo.app)`,
	},
];

function TestPage() {
	const renderContent = (text: string) => {
		const parts = text.split(/(\[.*?\]\(.*?\))/g);

		return parts.map((part) => {
			const match = part.match(/\[(.*?)\]\((.*?)\)/);
			if (match) {
				const [, linkText, url] = match;
				return (
					<a
						key={part}
						href={url}
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						{linkText}
					</a>
				);
			}
			return <span key={part}>{part}</span>;
		});
	};

	return (
		<div>
			<main className="min-h-screen bg-background flex flex-col">
				<HeaderSection />
				<div className="w-full mx-auto max-w-4xl my-12">
					<h1 className="font-semibold text-[2rem]">Terms & Conditions</h1>

					<ul className="mt-6">
						{terms.map((section) => (
							<li key={section.title} className="mt-8 space-y-4">
								<h2 className="text-xl font-medium">{section.title}</h2>
								{section.content && (
									<p className="text-justify leading-7 text-white/90">
										{renderContent(section.content)}
									</p>
								)}
							</li>
						))}
					</ul>
				</div>
			</main>
			<FooterSection />
		</div>
	);
}
