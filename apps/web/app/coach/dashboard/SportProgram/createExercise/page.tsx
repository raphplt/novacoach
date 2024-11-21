"use client";
import React, { useState } from "react";
import axios from "axios";
import PageLoader from "@components/Common/Loaders/PageLoader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleValidationErrors } from "@utils/functions/validation";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/AuthProvider";
import { toast } from "sonner";
import { exerciceSchema } from "@utils/schemas/exerciceSchema";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
	const router = useRouter();
	const { user, loading, coachRoleData } = useAuth();
	const [exerciceCreated, setExerciceCreated] = useState(false);

	const methods = useForm({
		resolver: zodResolver(exerciceSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = methods;

	if (!user || loading || !coachRoleData)
		return <PageLoader text="Chargement en cours" />;

	if (!coachRoleData.structure)
		return (
			<section className="container mx-auto p-6 mt-4 min-h-screen">
				<div className="flex flex-col items-center justify-center min-h-screen">
					<h1 className="text-2xl font-bold mb-6">
						Impossible de créer un exercice car vous n'avez pas de
						structure.
					</h1>
				</div>
			</section>
		);

	const handleCreation: SubmitHandler<FieldValues> = async (data) => {
		try {
			const validateFields = exerciceSchema.safeParse(data);
			const isValid = handleValidationErrors(validateFields, methods);
			if (!isValid) throw new Error("Invalid form data");

			const dataWithSportObject = {
				...data,
				sport: { id: data.sportId },
				idStructure: coachRoleData?.structure?.id,
			};

			const response = await axios.post(
				`${baseUrl}/exercices`, dataWithSportObject);

			if (response.status === 201) {
				toast.success("Exercice créé avec succès");

				setExerciceCreated(true);
				reset();
				router.push(`/coach/dashboard/SportProgram`);
			} else {
				console.error(
					"Erreur lors de la création de l'exercice :",
					response,
				);
				setExerciceCreated(false);
			}
		} catch (error: any) {
			console.error(
				"Erreur lors de la soumission :",
				error.response?.data || error.message,
			);
			setExerciceCreated(true);
		}
	};

	return (
		<section className="container mx-auto p-6 mt-4 min-h-screen">
			<div className="flex flex-col items-center justify-start pt-20">
				{exerciceCreated && (
					<div className="bg-success border-success rounded px-5 py-5 mb-3">
						<span className="text-white font-bold">
							L'exercice à été créé avec succès.
						</span>
					</div>
				)}
				<h1 className="text-2xl font-bold mb-6">Créer un exercice</h1>
				<form
					onSubmit={handleSubmit(handleCreation)}
					className="bg-gray-200 p-6 rounded-xl shadow-md w-1/2"
				>
					<Input
						label="Nom de l'exercice"
						{...register("name")}
						isInvalid={!!errors.name}
						className="mb-3"
						errorMessage={String(errors.name?.message)}
					/>

					<Input
						label="Description"
						{...register("description")}
						isInvalid={!!errors.description}
						className="mb-3"
						errorMessage={String(errors.description?.message)}
					/>

					<Input
						type="number"
						label="Durée (en secondes)"
						{...register("duration", { valueAsNumber: true })}
						isInvalid={!!errors.duration}
						className="mb-3"
						errorMessage={String(errors.duration?.message)}
					/>

					<Input
						type="number"
						label="Répétitions"
						{...register("reps", { valueAsNumber: true })}
						isInvalid={!!errors.reps}
						className="mb-3"
						errorMessage={String(errors.reps?.message)}
					/>

					<Input
						type="number"
						label="Séries"
						{...register("sets", { valueAsNumber: true })}
						isInvalid={!!errors.sets}
						className="mb-3"
						errorMessage={String(errors.sets?.message)}
					/>

					<Input
						type="number"
						label="Temps de pause (en secondes)"
						{...register("breakTime", { valueAsNumber: true })}
						isInvalid={!!errors.breakTime}
						className="mb-3"
						errorMessage={String(errors.breakTime?.message)}
					/>

					<Button
						type="submit"
						color="primary"
						className="w-full text-white"
						disabled={loading}
					>
						{loading ? "Création..." : "Créer l'exercice"}
					</Button>
				</form>
			</div>
		</section>
	);
};
export default Page;
