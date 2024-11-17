"use client";
import { useAuth } from "contexts/AuthProvider";
import React from "react";
import PageLoader from "@components/Common/Loaders/PageLoader";
import Link from "next/link";
import TablePrograms from "./TableProgram";
import TableMeals from "./TableMeal";
import { Icon } from "@iconify/react/dist/iconify.js";

const Page: React.FC = () => {

	const { user, loading, coachRoleData } = useAuth();

	if (!user || loading || !coachRoleData)
		return <PageLoader text="Chargement en cours" />;

	if (!coachRoleData.structure)
		return (
			<section className="container mx-auto p-6 mt-4 min-h-screen">
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-6">
						Impossible de créer un programme de nutrition car vous n'avez
						pas de structure.
					</h1>
				</div>
			</section>
		);

	return (
		<div className="container mx-auto p-6 mt-4 min-h-screen">
			<div className="absolute top-14 left-14 p-4 bg-white rounded-lg shadow-lg">
				<Link
					href="/coach/dashboard"
					role="button"
					className="flex items-center gap-2"
				>
					<Icon
						icon="bi:arrow-left"
						className="text-gray-500"
					/>
					Retour au dashboard
				</Link>
			</div>

			<div className="flex flex-col items-center justify-start pt-5">
				<h1 className="text-3xl font-extrabold text-gray-900 mt-5 text-center flex items-center gap-2">
					<Icon
						icon="fluent:food-16-regular"
						className="text-gray-500 mr-2"
					/>
					Gestion de vos programmes de nutrition
				</h1>

				<p className="text-gray-600 text-center mt-4 w-1/2">
					Cette page vous permet de gérer vos programmes de nutrition.
					Vous pouvez créer des programmes, ajouter des repas à un
					programme, et consulter les programmes que vous avez créés.
				</p>
			</div>

			<div className="flex justify-center items-center  gap-5 py-6">
				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium hover:bg-secondary transition-colors hover:shadow-lg"
					href="/coach/dashboard/NutritionProgram/createProgram"
					role="button"
				>
					Créer un programme
				</Link>

				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium hover:bg-secondary transition-colors hover:shadow-lg"
					href="/coach/dashboard/NutritionProgram/createMeal"
					role="button"
				>
					Créer un repas
				</Link>
			</div>
			<div className="flex flex-col gap-10">
				<TablePrograms />
				<TableMeals />
			</div>
		</div>
	);
};



export default Page;