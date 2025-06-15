import { Helmet, HelmetProvider } from "react-helmet-async";

import Logo64 from "/assets/Miniature_64.webp";

export default function HelmetRendering() {
	const LdJson = {

		"@context": "https://schema.org/",
		"@type": "LocalBusiness",
		"name": "Crossfit Obernai",
		"legalName": "Crossfit Obernai",
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
		]
	}

	return (
		<HelmetProvider>
			<Helmet>
				<title>Crossfit Obernai</title>
				<meta name="description" content="Votre salle de CrossFit Hyrox et Fitness à Obernai" />
				<meta name="theme-color" content="#FFF" />
				<meta name="language" content="fr-FR" />
				<meta property="og:title" content="Crossfit Obernai" />
				<meta property="og:description" content="Votre salle de CrossFit Hyrox et Fitness à Obernai" />
				<meta property="og:image" content="./assets/Header_logo.png" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="fr_FR" />
				<link rel="icon" type="image/webp" href={Logo64} />
				<script type="application/ld+json">
					{JSON.stringify(LdJson)}
				</script>
			</Helmet>
		</HelmetProvider>
	);
}
