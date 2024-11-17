import { StructureData } from "type/structure";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { verifySession } from "@lib/dal";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListStructures({ tStructures }: { tStructures?: StructureData[] }) {
	const [session, setSession] = useState<any>({ userId: 0 });
	useEffect(() => {
		verifySession().then((data) => {
			if (data) {
				setSession(data);
			}
		});
	}, []);
	const handleClick = async (id: number) => {
		try {
			await axios.put(baseUrl + "/users/" + session?.userId, {
				structure: {id: parseInt(String(id))}
			});
			window.location.href = "/";
		} catch (error) {
			console.error(
				"Erreur lors de la modification de l'utilisateur:",
				error,
			);
		}
	};
	return (
		<main className="min-h-screen">
			<Button
				onClick={() => (window.location.href = "/")}
				color="primary"
				className="mb-4 text-white mx-auto block"
				size="lg"
			>
				Page d'accueil
			</Button>

			<h2 className="text-3xl font-bold mb-4 text-center">
				Liste des structures
			</h2>
			<p className="text-gray-600 font-semibold text-xl text-center py-4">
				Trouvez votre structure idéale selon vos besoins.
			</p>

			<div className="h-full block relative w-11/12 mx-auto py-10">
				{tStructures && tStructures.length > 0 ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{tStructures.map((structure) => (
							<li
								key={structure.id}
								className="border p-5 rounded-lg shadow-lg bg-white transition-all transform hover:scale-105 hover:shadow-2xl"
							>
								<div className="flex items-center mb-4">
									{structure.logo && (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={structure.logo}
											alt={`Logo de ${structure.name}`}
											className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200"
										/>
									)}
									<h3 className="text-xl font-semibold text-gray-800">
										{structure.name}
									</h3>
								</div>
								<div className="text-gray-600 mb-4 space-y-2">
									{structure.description && (
										<p className="text-sm">
											{structure.description}
										</p>
									)}
									{structure.address && (
										<p className="text-sm">
											<strong>Adresse:</strong> {structure.address}
										</p>
									)}
									{structure.phone && (
										<p className="text-sm">
											<strong>Téléphone:</strong> {structure.phone}
										</p>
									)}
								</div>
								<Button
									className="mt-3 w-full text-white"
									onClick={() => handleClick(structure.id)}
									color="primary"
								>
									Rejoindre la structure
								</Button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-500">
						Aucune structure disponible.
					</p>
				)}
			</div>
		</main>
	);
}
