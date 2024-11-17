import { useRouter } from "next/navigation";
import React from "react";

const ActionsSportPrograms = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<>
			<div className="flex space-x-2">
				<button
					className="bg-primary text-white px-4 py-2 rounded transition duration-200 hover:bg-secondary"
					onClick={() =>
						router.push(
							`/coach/dashboard/SportProgram/editProgram/${data.id}`,
						)
					}
				>
					Modifier
				</button>

				<button
					className="bg-green text-white px-4 py-2 rounded transition duration-200 hover:bg-greenDark"
					onClick={() =>
						router.push(
							`/coach/dashboard/SportProgram/addExercices/${data.id}`,
						)
					}
				>
					Ajouter un exercice
				</button>

				<button
					className="bg-tertiary text-white px-4 py-2 rounded transition duration-200 hover:bg-tertiaryDark"
					onClick={() =>
						router.push(
							`/coach/dashboard/SportProgram/assign/${data.id}`,
						)
					}
				>
					Assigner
				</button>
			</div>
		</>
	);
};

export default ActionsSportPrograms;