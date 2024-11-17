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
import { mealSchema } from "@utils/schemas/mealSchema";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
	const router = useRouter();
	const { user, loading, coachRoleData } = useAuth();
	const [repasCreated, setRepasCreated] = useState(false);

	const methods = useForm({
		resolver: zodResolver(mealSchema),
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
						Impossible de créer des repas car vous n'avez pas de
						structure.
					</h1>
				</div>
			</section>
		);

	const handleCreation: SubmitHandler<FieldValues> = async (data) => {
		try {
			const validateFields = mealSchema.safeParse(data);
			const isValid = handleValidationErrors(validateFields, methods);
			if (!isValid) throw new Error("Invalid form data");

			const datas = {
				...data,
				idStructure: coachRoleData?.structure?.id,
			};

			const response = await axios.post(`${baseUrl}/meal`, datas);

			if (response.status === 201) {
				toast.success("Repas créé avec succès");

				setRepasCreated(true);
				reset();
				router.push(`/coach/dashboard/NutritionProgram`);
			} else {
				console.error(
					"Erreur lors de la création des repas :",
					response,
				);
				setRepasCreated(false);
			}
		} catch (error: any) {
			console.error(
				"Erreur lors de la soumission :",
				error.response?.data || error.message,
			);
			setRepasCreated(true);
		}
	};

	return (
		<section className="container mx-auto p-6 mt-4 min-h-screen">
			<div className="flex flex-col items-center justify-start pt-20">
				{repasCreated && (
					<div className="bg-success border-success rounded px-5 py-5 mb-3">
						<span className="text-white font-bold">
							Les repas ont été créé avec succès.
						</span>
					</div>
				)}
				<h1 className="text-2xl font-bold mb-6">Créer des repas</h1>
				<form
					onSubmit={handleSubmit(handleCreation)}
					className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md"
				>
					<Input
						label="Nom des repas"
						{...register("name")}
						isInvalid={!!errors.name}
						className="mb-3"
						errorMessage={String(errors.name?.message)}
					/>

					<Input
						label="Entrée"
						{...register("mealStarter")}
						isInvalid={!!errors.MealStarter}
						className="mb-3"
						errorMessage={String(errors.MealStarter?.message)}
					/>

					<Input
						label="Plat"
						{...register("mealMainCourse")}
						isInvalid={!!errors.mealMainCourse}
						className="mb-3"
						errorMessage={String(errors.mealMainCourse?.message)}
					/>

					<Input
						label="Dessert"
						{...register("mainDessert")}
						isInvalid={!!errors.mainDessert}
						className="mb-3"
						errorMessage={String(errors.mainDessert?.message)}
					/>

					<Input
						type="date"
						label="endDate"
						{...register("endDate", { valueAsDate: true })}
						isInvalid={!!errors.endDate}
						className="mb-3"
						errorMessage={String(errors.endDate?.message)}
					/>

					<Input
						label="Compléments alimentaires"
						{...register("complements")}
						isInvalid={!!errors.complements}
						className="mb-3"
						errorMessage={String(errors.complements?.message)}
					/>

					<Input
						type="time"
						label="Heure du repas"
						{...register("dayTime")}
						isInvalid={!!errors.dayTime}
						className="mb-3"
						errorMessage={String(errors.dayTime?.message)}
					/>

					<Button
						type="submit"
						color="primary"
						className="w-full text-white"
						disabled={loading}
					>
						{loading ? "Création..." : "Créer le repas"}
					</Button>
				</form>
			</div>
		</section>
	);
};
export default Page;
