"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

import TableModale from "@/components/Common/Modal/TableModale";
import DataTable, {
	ColumnHeaderProps,
} from "@/components/Common/Table/DataTableCustom";
import AdminNavigation from "../adminNavigation/AdminNavigation";

// Types
type Coach = {
	id: number;
	description: string;
	structure?: {
		id: number;
		name: string;
	} | null;
};

type EditingCoach = {
	id?: number;
	description: string;
	structureId: number | null;
};

type Structure = {
	id: number;
	name: string;
};

export default function CoachPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingCoach, setEditingCoach] = useState<EditingCoach>({
		description: "",
		structureId: null,
	});
	// const [currentPage, setCurrentPage] = useState(1);
	const [coaches, setCoaches] = useState<Coach[]>([]);
	const [structures, setStructures] = useState<Structure[]>([]);
	// const [total, setTotal] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isStructuresLoading, setIsStructuresLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	// Fonction pour récupérer les coachs
	const fetchCoaches = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`${apiUrl}/coaches`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("Données reçues pour les coachs :", data);
			if (!response.ok) {
				throw new Error(
					data.error || "Erreur lors de la récupération des coachs",
				);
			}
			setCoaches(data || []); // data est un tableau de coachs
			// setTotal(data.length);
			setIsLoading(false);
		} catch (error: any) {
			console.error("Erreur lors de la récupération des coachs :", error);
			setError(error.message);
			setIsLoading(false);
		}
	};

	// Fonction pour récupérer les structures
	const fetchStructures = async () => {
		try {
			setIsStructuresLoading(true);
			const response = await fetch(`${apiUrl}/structures`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("Données reçues pour les structures :", data);
			if (!response.ok) {
				throw new Error(
					data.error ||
						"Erreur lors de la récupération des structures",
				);
			}
			setStructures(data || []);
			setIsStructuresLoading(false);
		} catch (error: any) {
			console.error(
				"Erreur lors de la récupération des structures :",
				error,
			);
			setError(error.message);
			setIsStructuresLoading(false);
		}
	};

	useEffect(() => {
		fetchCoaches();
	}, []);

	useEffect(() => {
		fetchStructures();
	}, []);

	// const handlePageChange = (page: number) => {
	// 	setCurrentPage(page);
	// };

	// Ouvrir le modal pour ajouter/éditer
	const openModal = (coach: Coach | null = null) => {
		if (coach) {
			setEditingCoach({
				id: coach.id,
				description: coach.description,
				structureId: coach.structure?.id || null,
			});
		} else {
			setEditingCoach({ description: "", structureId: null });
		}
		setIsModalOpen(true);
	};

	// Fermer le modal
	const closeModal = () => {
		setIsModalOpen(false);
		setEditingCoach({ description: "", structureId: null });
	};

	// // Supprimer un coach
	// const handleDelete = async (id: number) => {
	// 	try {
	// 		await fetch(`${apiUrl}/coaches/${id}`, {
	// 			method: "DELETE",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		fetchCoaches();
	// 	} catch (error) {
	// 		console.error("Erreur lors de la suppression du coach", error);
	// 	}
	// };

	// Sauvegarder les modifications ou ajouter un coach
	const handleSave = async () => {
		if (!editingCoach) return;
		const coach = editingCoach;

		try {
			if (coach.id) {
				// Mettre à jour un coach existant
				await fetch(`${apiUrl}/coaches/${coach.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						description: coach.description,
						structureId: coach.structureId,
					}),
				});
			} else {
				// Ajouter un nouveau coach
				await fetch(`${apiUrl}/coaches`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						description: coach.description,
						structureId: coach.structureId,
					}),
				});
			}
			// Rafraîchir la liste des coachs après sauvegarde
			fetchCoaches();
			closeModal();
		} catch (error) {
			console.error("Erreur lors de la sauvegarde du coach", error);
		}
	};

	if (isLoading || isStructuresLoading) return <div>Chargement...</div>;
	if (error) return <div>Erreur : {error}</div>;

	const columnHeaders: ColumnHeaderProps[] = [
		{ key: "id", label: "ID", sortable: true },
		{ key: "description", label: "Description", sortable: true },
		{ key: "structure", label: "Structure", sortable: true },
		{ key: "actions", label: "Actions" },
	];

	const rows = coaches.map((coach) => ({
		id: coach.id.toString(),
		description: coach.description,
		structure: coach.structure?.name || "N/A",
	}));

	return (
		<div>
			<AdminNavigation />
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-4">Gestion des Coachs</h1>

				<Button
					className="mb-4"
					onClick={() => openModal()}
				>
					Ajouter un Coach
				</Button>

				<DataTable
					name="Table des Coachs"
					columnsHeaders={columnHeaders}
					rows={rows}
					isLoading={isLoading}
				/>

				{/* Pagination (à implémenter si nécessaire) */}
				{/* <Pagination
          total={Math.ceil(total / itemsPerPage)}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        /> */}
				<TableModale
					isModalOpen={isModalOpen}
					closeModal={closeModal}
					editingCoach={editingCoach}
					setEditingCoach={setEditingCoach}
					handleSave={handleSave}
					structures={structures}
				/>
			</div>
		</div>
	);
}
