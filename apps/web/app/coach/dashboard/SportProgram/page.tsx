import React from "react";
import Link from "next/link";

import TablePrograms from "./TablePrograms";
import TableExercises from "./TableExercises";
import { Icon } from "@iconify/react/dist/iconify.js";

const Page = () => {
	return (
		<div className="container mx-auto p-6 mt-4 min-h-screen">
			<div className="sm:absolute top-14 left-14 p-4 bg-white rounded-lg shadow-lg hidden ">
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
				<h1 className="text-3xl font-extrabold text-gray-900 mt-5 flex items-center">
					<Icon
						icon="mdi:dumbbell"
						className="text-default-700 mr-2"
						width={29}
					/>
					Gestion de vos programmes de sport
				</h1>

				<p className="text-gray-600 text-center mt-4 w-1/2">
					Cette page vous permet de gérer vos programmes de sport.
					Vous pouvez créer des programmes, ajouter des exercices à un
					programme, et consulter les programmes que vous avez créés.
				</p>
			</div>

			<div className="flex justify-center items-center  gap-5 py-6">
				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium hover:bg-secondary transition-colors hover:shadow-lg"
					href="/coach/dashboard/SportProgram/createProgram"
					role="button"
				>
					Créer un programme
				</Link>

				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium hover:bg-secondary transition-colors hover:shadow-lg"
					href="/coach/dashboard/SportProgram/createExercise"
					role="button"
				>
					Créer un exercice
				</Link>
			</div>
			<div className="flex flex-col gap-10">
				<TablePrograms />
				<TableExercises />
			</div>
		</div>
	);
};

export default Page;
