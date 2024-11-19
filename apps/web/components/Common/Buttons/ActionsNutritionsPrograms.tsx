import { useRouter } from "next/navigation";
import React from "react";

const ActionsNutritionPrograms = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<>
			<div className="flex space-x-2">
				<button
					className="bg-primary text-white px-4 py-2 rounded transition duration-200 hover:bg-secondary"
					onClick={() =>
						router.push(
							`/coach/dashboard/NutritionPrograms/editProgram/${data.id}`,
						)
					}
				>
					Modifier
				</button>
				<button
					className="bg-secondary text-white px-4 py-2 rounded transition duration-200 hover:bg-primary"
					onClick={() =>
						router.push(
							`/coach/dashboard/NutritionPrograms/programDetails/${data.id}`,
						)
					}
				>
					Voir les détails
				</button>

				<button
					className="bg-greenPrimary text-white px-4 py-2 rounded transition duration-200 hover:bg-greenDark"
					onClick={() =>
						router.push(
							`/coach/dashboard/NutritionProgram/addMeals/${data.id}`,
						)
					}
				>
					Ajouter un repas
				</button>

				<button
					className="bg-tertiary text-white px-4 py-2 rounded transition duration-200 hover:bg-tertiaryDark"
					onClick={() =>
						router.push(
							`/coach/dashboard/NutritionProgram/assign/${data.id}`,
						)
					}
				>
					Assigner
				</button>
			</div>
		</>
	);
};

export default ActionsNutritionPrograms;