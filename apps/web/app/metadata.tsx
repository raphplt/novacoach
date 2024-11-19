import Head from "next/head";
import React from "react";

const Metadata = () => {
	return (
		<Head>
			<title>Gérez votre structure : Programmes, Nutrition, Élevés</title>
			<meta
				name="description"
				content="Gérez efficacement votre structure avec nos outils dédiés : programmes, nutrition, et élèves au même endroit."
			/>
			<meta
				name="robots"
				content="index, follow"
			/>
			<meta
				property="og:title"
				content="Gérez votre structure : Programmes, Nutrition, Élevés"
			/>
			<meta
				property="og:description"
				content="Gérez efficacement votre structure avec nos outils dédiés : programmes, nutrition, et élèves au même endroit."
			/>
			<meta
				property="og:image"
				content="/images/laptop.png"
			/>
			<meta
				property="og:url"
				content="https://votre-site.com"
			/>
			<meta
				name="twitter:card"
				content="summary_large_image"
			/>
		</Head>
	);
};

export default Metadata;
