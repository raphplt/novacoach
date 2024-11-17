import PageLoader from "@components/Common/Loaders/PageLoader";
import ListStructures from "@components/Layout/structures/listStructures";
import { getAllStructures } from "@lib/dal";
import { useEffect, useState } from "react";
import { StructureData } from "type/structure";

export default function JoinStructure() {
	const [tStructures, setStructuresList] = useState<StructureData[] | null>(
		null,
	);
	useEffect(() => {
		getAllStructures()
			.then((data) => {
				setStructuresList(data || []);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des structures:",
					error,
				);
				setStructuresList([]);
			});
	}, []);

	if (tStructures === null)
		return <PageLoader text="Chargement des structures" />;

	return (
		<main className="flex flex-col min-h-screen pt-20 mx-auto justify-start items-center bg-gradient-to-r from-gray-100 to-indigo-200">
			<ListStructures tStructures={tStructures} />
		</main>
	);
}
