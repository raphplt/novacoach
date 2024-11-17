"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import PageLoader from "@components/Common/Loaders/PageLoader";
import SportSelect from "@components/Common/Select/sportSelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleValidationErrors } from "@utils/functions/validation";
import { sportProgramSchema } from "@utils/schemas/sportProgram.schema";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/AuthProvider";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
	const router = useRouter();
	const { user, loading, coachRoleData } = useAuth();
	const [sportList, setSportList] = useState(null);
	const [programCreated, setProgramCreated] = useState(false);

	const methods = useForm({
		resolver: zodResolver(sportProgramSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = methods;

	useEffect(() => {
		const fetchSports = async () => {
			try {
				const response = await axios.get(baseUrl + "/sports");
				setSportList(response.data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des sports:",
					error,
				);
			}
		};

		fetchSports();
	}, []);

	if (!user || loading || !sportList || !coachRoleData)
		return <PageLoader text="Chargement en cours" />;

	if (!coachRoleData.structure)
		return (
			<section className="container mx-auto p-6 mt-4 min-h-screen">
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-6">
						Impossible de créer un programme sportif car vous n'avez
						pas de structure.
					</h1>
				</div>
			</section>
		);

	const handleCreation: SubmitHandler<FieldValues> = async (data) => {
		try {
			const validateFields = sportProgramSchema.safeParse(data);
			const isValid = handleValidationErrors(validateFields, methods);
			if (!isValid) throw new Error("Invalid form data");

			const dataWithSportObject = {
				...data,
				sport: { id: data.sportId },
				idStructure: coachRoleData?.structure?.id,
			};

			const response = await axios.post(
				`${baseUrl}/sportPrograms`,
				dataWithSportObject,
			);

			if (response.status === 201) {
				toast.success("Programme créé avec succès");

				setProgramCreated(true);
				reset();
				router.push(
					`/coach/dashboard/SportProgram/addExercices` +
						`/${response.data.id}`,
				);
			} else {
				console.error(
					"Erreur lors de la création du programme :",
					response,
				);
				setProgramCreated(false);
			}
		} catch (error: any) {
			console.error(
				"Erreur lors de la soumission :",
				error.response?.data || error.message,
			);
			setProgramCreated(true);
		}
	};

	return (
		<section className="container mx-auto p-6 mt-4 min-h-screen ">
			<div className="flex flex-col items-center justify-start pt-20">
				{programCreated && (
					<div className="bg-success border-success rounded px-5 py-5 mb-3">
						<span className="text-white font-bold">
							Le programme à été créé avec succès.
						</span>
					</div>
				)}
				<h1 className="text-2xl font-bold mb-6">
					Créer un programme de sport
				</h1>
				<form
					onSubmit={handleSubmit(handleCreation)}
					className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md"
				>
					<div className="mb-4">
						<SportSelect
							sportList={sportList}
							isInvalid={!!errors.sportId}
							register={register("sportId", {
								valueAsNumber: true,
							})}
						/>
						{errors.sportId && (
							<span className="text-danger">
								{String(errors.sportId?.message)}
							</span>
						)}
					</div>
					<Input
						label="Nom du programme"
						{...register("name")}
						isInvalid={!!errors.name}
						className="mb-3"
						errorMessage={String(errors.name?.message)}
					/>

					<Input
						label="Niveau de difficulté"
						{...register("difficulty")}
						isInvalid={!!errors.difficulty}
						className="mb-3"
						errorMessage={String(errors.difficulty?.message)}
					/>

					<Input
						type="number"
						label="Durée (en jours)"
						{...register("duration", { valueAsNumber: true })}
						isInvalid={!!errors.duration}
						className="mb-3"
						errorMessage={String(errors.duration?.message)}
					/>

					<Input
						label="Fréquence (jours par semaine)"
						{...register("frequency", { valueAsNumber: true })}
						isInvalid={!!errors.frequency}
						className="mb-3"
						type="number"
						errorMessage={String(errors.frequency?.message)}
					/>

					<Button
						type="submit"
						color="primary"
						className="w-full text-white"
						disabled={loading}
					>
						{loading ? "Création..." : "Créer le programme"}
					</Button>
				</form>
			</div>
		</section>
	);
};
export default Page;