import { Helmet, HelmetProvider } from "react-helmet-async";

import Logo64 from "/assets/Miniature_64.webp";
import LogoHeader from "/assets/Header_logo.webp";

export default function HelmetRendering() {
	// URL du site
	const siteUrl = window.location.origin;
	// URL canonique (page actuelle)
	const canonicalUrl = `${siteUrl}${window.location.pathname}`;

	const LdJson = {
		"@context": "https://schema.org/",
		"@type": "LocalBusiness",
		"name": "Crossfit Obernai",
		"legalName": "Crossfit Obernai",
		"url": siteUrl,
		"logo": `${siteUrl}/assets/Header_logo.webp`,
		"image": `${siteUrl}/assets/Header_logo.webp`,
		"description": "Votre salle de CrossFit Hyrox et Fitness à Obernai",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "4, Rue du Thal",
			"postalCode": "67210",
			"addressLocality": "Obernai",
			"addressCountry": "FR"
		},
		"telephone": "(+33 6) 14 03 06 94",
		"email": "crossfitobernai@gmail.com",
		"currenciesAccepted": "EUR",
		"openingHoursSpecification": [
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": [
					"Monday",
					"Friday"
				],
				"opens": "10:00",
				"closes": "20:30"
			},
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": [
					"Tuesday",
					"Thursday"
				],
				"opens": "12:30",
				"closes": "20:30"
			},
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": [
					"Wednesday"
				],
				"opens": "07:00",
				"closes": "20:30"
			},
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": [
					"Saturday", "Sunday"
				],
				"opens": "09:00",
				"closes": "12:00"
			}
		],
		"sameAs": [
			"https://www.facebook.com/crossfitobernai",
			"https://www.instagram.com/crossfitobernai/"
		]
	}

	return (
		<HelmetProvider>
			<Helmet>
				<html lang="fr" />
				<title>Crossfit Obernai</title>
				<meta name="description" content="Votre salle de CrossFit Hyrox et Fitness à Obernai. Programmes adaptés à tous les niveaux, coaching personnalisé et communauté motivante." />
				<meta name="keywords" content="crossfit, obernai, hyrox, fitness, alsace, salle de sport, coach sportif" />
				<meta name="author" content="Crossfit Obernai" />
				<meta name="theme-color" content="#FFF" />
				<meta name="language" content="fr-FR" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href={canonicalUrl} />
				<meta property="og:title" content="Crossfit Obernai | Fitness & Hyrox à Obernai" />
				<meta property="og:description" content="Votre salle de CrossFit Hyrox et Fitness à Obernai. Programmes adaptés à tous les niveaux, coaching personnalisé et communauté motivante." />
				<meta property="og:image" content={`${siteUrl}/assets/Header_logo.webp`} />
				<meta property="og:image:alt" content="Logo Crossfit Obernai" />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="fr_FR" />
				<meta property="og:site_name" content="Crossfit Obernai" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Crossfit Obernai | Fitness & Hyrox à Obernai" />
				<meta name="twitter:description" content="Votre salle de CrossFit Hyrox et Fitness à Obernai" />
				<meta name="twitter:image" content={`${siteUrl}/assets/Header_logo.webp`} />
				<link rel="icon" type="image/webp" href={Logo64} />
				<link rel="apple-touch-icon" href={Logo64} />
				<script type="application/ld+json">
					{JSON.stringify(LdJson)}
				</script>
			</Helmet>
		</HelmetProvider>
	);
}
