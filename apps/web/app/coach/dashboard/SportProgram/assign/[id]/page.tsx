"use client";
import ProgramInfos from "@components/Common/Box/ProgramInfos";
import ButtonBack from "@components/Common/Buttons/ButtonBack";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SportProgramType } from "type/sportProgram";
import ListStudents from "../ListStudents";
import { toast } from "sonner";

const Assign = () => {
	const params = useParams();
	const [programme, setProgramme] = useState<SportProgramType | null>(null);

	const url = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const fetchProgramme = async () => {
			try {
				const response = await fetch(
					`${url}/sportProgram/${params.id}`,
				);
				if (!response.ok) {
					console.error(
						`Erreur lors de la récupération du programme ${params.id}`,
					);
					return;
				}
				const programmeData = await response.json();
				setProgramme(programmeData);
			} catch (error) {
				console.error(
					`Erreur lors de la récupération du programme ${params.id}:`,
					error,
				);
			}
		};

		fetchProgramme();
	}, [params.id]);

	return (
		<main className="container mx-auto p-6 mt-4 min-h-screen">
			<ButtonBack href={`/coach/dashboard/SportProgram`} />
			<h1 className="text-3xl font-extrabold text-gray-900 mt-5 text-center flex flex-row items-center gap-2 justify-center">
				Assigner le programme
				<p className=" text-primary">{programme?.name}</p>à un élève{" "}
			</h1>

			<ProgramInfos program={programme} isSportProgram={false} />
			<ListStudents program={programme} />
		</main>
	);
};

export default Assign;
