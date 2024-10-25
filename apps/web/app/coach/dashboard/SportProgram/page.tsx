"use client";

import React, { useState, useEffect } from "react";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import { SportProgramType } from "type/sportProgram";
import { Link } from "@nextui-org/react";
import PageLoader from "@components/Common/Loaders/PageLoader";

const Page = () => {
	const { user, coachRoleData } = useAuth();
	const [sportPrograms, setSportPrograms] = useState<SportProgramType[]>([]);

	const { data: sportProgramData } = useFetchData({
		url: coachRoleData
			? `/sportProgram/structure/${coachRoleData?.structure?.id}`
			: "",
		enabled: !!coachRoleData?.structure,
	});

	useEffect(() => {
		if (sportProgramData) {
			setSportPrograms(sportProgramData.data as SportProgramType[]);
		}
	}, [sportProgramData]);

	if (!user || !coachRoleData || !coachRoleData.structure) {
		return <PageLoader text="Chargement en cours" />;
	}

	return (
		<div className="container mx-auto p-6 mt-4 min-h-screen">
			<h2 className="text-4xl font-extrabold text-gray-900 mt-6 text-center">
				Mes programmes de Sport
			</h2>
			<div className="flex justify-end">
				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium"
					href="/coach/dashboard/SportProgram/createProgram"
					role="button"
				>
					Créer un programme
				</Link>
			</div>

			<div className="mt-5 overflow-x-auto">
				<table className="table-auto w-full text-left border-collapse mt-5">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-4 py-2 text-center">
								Program Name
							</th>
							<th className="px-4 py-2 text-center">Duration</th>
							<th className="px-4 py-2 text-center">Frequency</th>
							<th className="px-4 py-2 text-center">
								Difficulty
							</th>
							<th className="px-4 py-2 text-center">Sport</th>
						</tr>
					</thead>
					<tbody>
						{sportPrograms.length === 0 ? (
							<tr>
								<td
									colSpan={4}
									className="text-center text-gray-600 py-4"
								>
									Aucun programme trouvé.
								</td>
							</tr>
						) : (
							sportPrograms.map((program) => (
								<tr
									key={program.id}
									className="bg-white border-b hover:bg-gray-100 transition-colors"
								>
									<td className="px-4 py-2 text-center align-middle text-indigo-600 font-semibold">
										{program.name}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{program.duration}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{program.frequency}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{program.difficulty}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{program.sport?.name || "N/A"}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Page;