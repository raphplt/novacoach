"use client";

import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDetailsFormInputs, userDetailsSchema } from "./utils";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function UserDetailsForm() {
	const [editMode, setEditMode] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { user, userDetails } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
		watch,
	} = useForm<UserDetailsFormInputs>({
		resolver: zodResolver(userDetailsSchema),
		defaultValues: {
			height: 0,
			bmi: 0,
			muscleMass: 0,
			fatMass: 0,
			weight: 0,
		},
	});

	const height = watch("height");
	const weight = watch("weight");

	useEffect(() => {
		if (userDetails) {
			reset({
				height: getMostRecentValue(userDetails.heights),
				bmi: getMostRecentValue(userDetails.bmis),
				muscleMass: getMostRecentValue(userDetails.muscleMasses),
				fatMass: getMostRecentValue(userDetails.fatMasses),
				weight: getMostRecentValue(userDetails.weights),
			});
		}
	}, [userDetails, reset]);

	useEffect(() => {
		if (height > 0 && weight > 0) {
			const bmi = weight / (height / 100) ** 2;
			setValue("bmi", parseFloat(bmi.toFixed(2)));
		}
	}, [height, weight, setValue]);

	const getMostRecentValue = (dataArray: any) =>
		dataArray?.sort(
			(a: any, b: any) =>
				new Date(b.date).getTime() - new Date(a.date).getTime(),
		)[0]?.value ?? 0;

	const handleEditModeToggle = () => {
		if (editMode) {
			reset(getValues());
		}
		setEditMode(!editMode);
	};

	const onSubmit = async (data: UserDetailsFormInputs) => {
		if (!user) {
			console.error("User not found");
			return;
		}

		try {
			const formattedData = {
				heights: [{ value: data.height }],
				weights: [{ value: data.weight }],
				fatMasses: [{ value: data.fatMass }],
				bmis: [{ value: data.bmi }],
				muscleMasses: [{ value: data.muscleMass }],
			};

			const response = await fetch(
				`${urlBase}/userdetails/user/${user.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formattedData),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Échec de l'enregistrement",
				);
			}

			await response.json();
			toast.success("Données mises à jour avec succès");
			setEditMode(false);
		} catch (error) {
			toast.error("Une erreur s'est produite.");
			console.error(error);
		}
	};

	return (
		<div className="pt-20 max-w-2xl mx-auto min-h-screen flex flex-col justify-start items-center">
			<Link
				href="/student/dashboard"
				className="text-blue-500 hover:underline py-2"
			>
				Retour au tableau de bord
			</Link>

			<div className="bg-gray-200 mx-auto py-10 px-20 rounded-xl shadow-lg w-full">
				<h1 className="text-3xl font-bold text-center mb-4 mx-2">
					Mes données sportives
				</h1>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<Input
						label="Taille (cm)"
						type="number"
						{...register("height", { valueAsNumber: true })}
						errorMessage={String(errors.height?.message)}
						isInvalid={Boolean(errors.height)}
						readOnly={!editMode}
						startContent={<Icon icon="material-symbols:height" />}
					/>

					<Input
						label="Masse (kg)"
						type="number"
						{...register("weight", { valueAsNumber: true })}
						errorMessage={String(errors.weight?.message)}
						isInvalid={Boolean(errors.weight)}
						readOnly={!editMode}
						startContent={<Icon icon="material-symbols:weight" />}
					/>

					<Input
						label="BMI (Indice de masse corporelle)"
						type="number"
						value={
							height > 0 && weight > 0
								? (weight / (height / 100) ** 2).toFixed(1)
								: ""
						}
						readOnly
						startContent={<Icon icon="icon-park-solid:weight" />}
					/>

					<Input
						label="Masse musculaire (kg)"
						type="number"
						{...register("muscleMass", { valueAsNumber: true })}
						errorMessage={String(errors.muscleMass?.message)}
						isInvalid={Boolean(errors.muscleMass)}
						readOnly={!editMode}
						startContent={<Icon icon="icon-park-outline:muscle" />}
					/>

					<Input
						label="Masse grasse (kg)"
						type="number"
						{...register("fatMass", { valueAsNumber: true })}
						errorMessage={String(errors.fatMass?.message)}
						isInvalid={Boolean(errors.fatMass)}
						readOnly={!editMode}
						startContent={<Icon icon="mdi:stomach" />}
					/>

					<div className="flex space-x-4">
						<Button
							onClick={handleEditModeToggle}
							className="w-full text-white"
							color="primary"
							size="lg"
						>
							{editMode ? "Annuler" : "Modifier"}
						</Button>

						{editMode && (
							<Button
								type="submit"
								className="w-full text-white"
								color="success"
								size="lg"
								disabled={isSaving}
							>
								Enregistrer
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
