import { createFileRoute } from "@tanstack/react-router";
import FooterSection from "@/components/sections/footer-section";
import HeaderSection from "@/components/sections/header-section";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyPage,
	ssr: true,
});

const policy = [
	{
		title: "1. Introduction",
		content: `TapeTwo (“we”, “our”, or “us”) respects your privacy. This Privacy Policy explains how we handle your information when you use the TapeTwo mobile application (the “App”) and our website (tapetwo.app) (collectively, the “Services”). By using our Services, you agree to the practices described in this Privacy Policy.`,
	},
	{
		title: "2. Information We Collect",
		child: [
			{
				title: "2.1. In the App",
				content: `We do not collect, store, or share any personal data on our servers. All information you create within the App — including your movie collections, watch progress, and preferences — is stored locally on your device and is never transmitted to us or any third party.`,
			},
			{
				title: "2.2. On the Website",
				content: `When visiting our website, you may choose to subscribe to our newsletter or updates by providing your email address. We use your email address solely to send you news about new features, updates, or announcements related to TapeTwo. Your information is stored securely using a third-party email service provider (e.g. Mailchimp or a similar service), and you can unsubscribe at any time using the link included in each email. We do not sell, share, or rent your information to anyone.`,
			},
		],
	},
	{
		title: "3. iCloud Storage",
		content: `If iCloud Backup or iCloud Drive is enabled on your device, iOS may automatically store a copy of the App’s data in your personal iCloud account. This process is entirely managed by Apple, and we do not have access to or control over that data. For more details, please refer to the [Apple Privacy Policy](https://www.apple.com/legal/privacy/).`,
	},
	{
		title: "4. Third-Party Services",
		content: `The App does not include analytics, tracking, or advertising services.`,
	},
	{
		title: "5. Legal Basis (for users in the European Economic Area)",
		content: `If you provide your email address for our newsletter, the legal basis for processing this data is your consent, which you may withdraw at any time by unsubscribing.`,
	},
	{
		title: "6. Children’s Privacy",
		content: `TapeTwo is not intended for children under the age of 13. We do not knowingly collect personal information from children.`,
	},
	{
		title: "7. Your Rights",
		content: `Because we do not collect or store personal data (other than optional newsletter emails), there is generally no personal information to access, modify, or delete. If you wish to unsubscribe from our newsletter or request deletion of your email data, please contact us using the information below.`,
	},
	{
		title: "8. Changes to This Policy",
		content: `We may update this Privacy Policy from time to time. Any changes will become effective immediately upon being posted within the App or on our website. Your continued use of the Services after such updates constitutes your acceptance of the revised Policy.`,
	},
	{
		title: "9. Contact Us",
		content: `If you have any questions or concerns about this Privacy Policy, please contact us at: 📧 [hi@tapetwo.app](mailto:hi@tapetwo.app)`,
	},
];

function PrivacyPolicyPage() {
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
					<h1 className="font-semibold text-[2rem]">Privacy Policy</h1>

					<ul className="mt-6">
						{policy.map((section) => (
							<li key={section.title} className="mt-8 space-y-4">
								<h2 className="text-xl font-medium">{section.title}</h2>
								{section.content && (
									<p className="text-justify leading-7 text-white/90">
										{renderContent(section.content)}
									</p>
								)}
								{section.child?.map((subsection) => (
									<ul key={subsection.title}>
										<li key={subsection.title} className="mt-4 space-y-4">
											<h3 className="text-lg font-medium">
												{subsection.title}
											</h3>
											<p className="text-justify leading-7 text-white/90">
												{renderContent(subsection.content)}
											</p>
										</li>
									</ul>
								))}
							</li>
						))}
					</ul>
				</div>
			</main>
			<FooterSection />
		</div>
	);
}
