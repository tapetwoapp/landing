/**
 * SEO Configuration
 *
 * Central configuration for all SEO meta tags, Open Graph, Twitter Cards,
 * structured data, and PWA settings.
 */

export const seoConfig = {
	// Basic Info
	siteName: "TapeTwo",
	siteTitle: "TapeTwo App",
	siteDescription:
		"TapeTwo is a native iOS app for organizing your personal movie library. " +
		"Create custom collections, track what you have watched, and bring order to the films you love.",
	siteUrl: process.env.SITE_URL || "https://www.tapetwo.app",

	// Slogan
	slogan: "Organize your personal movie library",

	// Social
	twitterHandle: "", // No Twitter yet
	author: "TapeTwo",

	// Theme
	themeColor: "#FFFFFF",
	backgroundColor: "#070707",

	// Brand colors (for reference)
	colors: {
		primary: "#FFFFFF",
		backgroundPrimary: "#070707",
		backgroundSecondary: "#101010",
	},

	// Language
	language: "en",
	locale: "en_US",

	// Images (relative to public/)
	ogImage: "/og-image.jpg",
	twitterImage: "/og-image.jpg",
	appleTouchIcon: "/apple-touch-icon.png",
	favicon: "/favicon.ico",

	// Keywords
	keywords: [
		"movie app",
		"movie library",
		"film collections",
		"iOS app",
		"watchlist organizer",
		"movie tracking",
		"save to watch",
		"watchlist app",
		"media organizer",
	],

	// App Info (PWA)
	appName: "TapeTwo",
	appShortName: "TapeTwo",

	// Contact
	email: "", // TBD

	// Social Links
	social: {
		twitter: "",
		github: "",
	},
} as const;

/**
 * Generate page-specific SEO
 */
export function generatePageSeo({
	title,
	description,
	path = "",
	image,
	type = "website",
}: {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
	type?: "website" | "article";
}) {
	const fullTitle = title
		? `${title} | ${seoConfig.siteName}`
		: seoConfig.siteTitle;

	const fullDescription = description || seoConfig.siteDescription;
	const fullUrl = `${seoConfig.siteUrl}${path}`;
	const fullImage = image || seoConfig.ogImage;
	const absoluteImage = fullImage.startsWith("http")
		? fullImage
		: `${seoConfig.siteUrl}${fullImage}`;

	return {
		title: fullTitle,
		description: fullDescription,
		url: fullUrl,
		image: absoluteImage,
		type,
	};
}

/**
 * Structured Data (JSON-LD) for Organization
 */
export function generateOrganizationSchema() {
	const schema: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: seoConfig.siteName,
		url: seoConfig.siteUrl,
		logo: `${seoConfig.siteUrl}/android-chrome-512x512.png`,
		description: seoConfig.siteDescription,
		sameAs: Object.values(seoConfig.social).filter(Boolean),
	};

	if (seoConfig.email) {
		schema.contactPoint = {
			"@type": "ContactPoint",
			email: seoConfig.email,
			contactType: "Customer Service",
		};
	}

	return schema;
}

/**
 * Structured Data for SoftwareApplication (iOS App)
 */
export function generateAppSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: seoConfig.appName,
		url: seoConfig.siteUrl,
		description: seoConfig.siteDescription,
		applicationCategory: "EntertainmentApplication",
		operatingSystem: "iOS",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		screenshot: `${seoConfig.siteUrl}/phone-mockup.png`,
	};
}

/**
 * Structured Data for WebSite (for Google Search)
 */
export function generateWebsiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: seoConfig.siteName,
		url: seoConfig.siteUrl,
		description: seoConfig.siteDescription,
		inLanguage: seoConfig.language,
	};
}
