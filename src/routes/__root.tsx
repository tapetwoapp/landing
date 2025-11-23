import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";
import {
	seoConfig,
	generateOrganizationSchema,
	generateAppSchema,
	generateWebsiteSchema,
} from "@/lib/seo-config";

const siteUrl = seoConfig.siteUrl;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			// Basic
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: seoConfig.siteTitle },
			{ name: "description", content: seoConfig.siteDescription },
			{ name: "keywords", content: seoConfig.keywords.join(", ") },
			{ name: "author", content: seoConfig.author },

			// Open Graph (Facebook, LinkedIn, Telegram, etc.)
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: seoConfig.siteName },
			{ property: "og:title", content: seoConfig.siteTitle },
			{ property: "og:description", content: seoConfig.siteDescription },
			{ property: "og:url", content: siteUrl },
			{ property: "og:image", content: `${siteUrl}${seoConfig.ogImage}` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: seoConfig.siteTitle },
			{ property: "og:locale", content: seoConfig.locale },

			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: seoConfig.siteTitle },
			{ name: "twitter:description", content: seoConfig.siteDescription },
			{ name: "twitter:image", content: `${siteUrl}${seoConfig.twitterImage}` },
			{ name: "twitter:image:alt", content: seoConfig.siteTitle },

			// Mobile & PWA
			{ name: "apple-mobile-web-app-capable", content: "yes" },
			{ name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
			{ name: "apple-mobile-web-app-title", content: seoConfig.appShortName },
			{ name: "mobile-web-app-capable", content: "yes" },
			{ name: "application-name", content: seoConfig.appName },

			// Theme
			{ name: "theme-color", content: seoConfig.themeColor },
			{ name: "msapplication-TileColor", content: seoConfig.backgroundColor },

			// Robots
			{ name: "robots", content: "index, follow" },
			{ name: "googlebot", content: "index, follow" },
		],
		links: [
			// Stylesheet
			{ rel: "stylesheet", href: appCss },

			// Canonical
			{ rel: "canonical", href: siteUrl },

			// Favicon
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },

			// Manifest
			{ rel: "manifest", href: "/manifest.json" },

			// Preconnect for performance
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
		],
		scripts: [
			// Structured Data (JSON-LD)
			{
				type: "application/ld+json",
				children: JSON.stringify([
					generateWebsiteSchema(),
					generateOrganizationSchema(),
					generateAppSchema(),
				]),
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const showDevtools = import.meta.env.DEV;

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				{showDevtools ? (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				) : null}
				<Scripts />
			</body>
		</html>
	);
}
