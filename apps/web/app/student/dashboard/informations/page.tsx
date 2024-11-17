"use client";

import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDetailsFormInputs, userDetailsSchema } from "./utils";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

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

	const getMostRecentValue = (dataArray: any) => {
		if (!dataArray || dataArray.length === 0) return 0;
		return dataArray.sort(
			(a: any, b: any) =>
				new Date(b.date).getTime() - new Date(a.date).getTime(),
		)[0].value;
	};

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

	const handleEditModeToggle = async () => {
		if (editMode) {
			setIsSaving(true);
			await handleSubmit(onSubmit)();
			setIsSaving(false);
		} else {
			const currentValues = getValues();
			reset(currentValues);
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
				console.error("Registration failed:", errorData.message);
				throw new Error(errorData.message || "Registration failed");
			}

			await response.json();
			setEditMode(false);
		} catch (error) {
			console.error("An error occurred:", error);
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
						disabled={!editMode}
						isDisabled={!editMode}
					/>

					<Input
						label="Masse (kg)"
						type="number"
						{...register("weight", { valueAsNumber: true })}
						errorMessage={String(errors.weight?.message)}
						isInvalid={Boolean(errors.weight)}
						disabled={!editMode}
						isDisabled={!editMode}
					/>

					<Input
						label="BMI (Indice de masse corporelle)"
						type="number"
						{...register("bmi", { valueAsNumber: true })}
						errorMessage={String(errors.bmi?.message)}
						isInvalid={Boolean(errors.bmi)}
						disabled={!editMode}
						isDisabled={!editMode}
					/>

					<Input
						label="Masse musculaire (kg)"
						type="number"
						{...register("muscleMass", { valueAsNumber: true })}
						errorMessage={String(errors.muscleMass?.message)}
						isInvalid={Boolean(errors.muscleMass)}
						disabled={!editMode}
						isDisabled={!editMode}
					/>

					<Input
						label="Masse grasse (kg)"
						type="number"
						{...register("fatMass", { valueAsNumber: true })}
						errorMessage={String(errors.fatMass?.message)}
						isInvalid={Boolean(errors.fatMass)}
						disabled={!editMode}
						isDisabled={!editMode}
					/>

					{!editMode ? (
						<p className="text-center text-sm text-gray-400">
							Cliquez sur "Modifier" pour mettre à jour vos
							données
						</p>
					) : (
						<Button
							onClick={handleEditModeToggle}
							className="w-full mx-auto text-black bg-gray-300"
							size="lg"
						>
							Annuler
						</Button>
					)}

					<Button
						onClick={handleEditModeToggle}
						className="w-full mx-auto text-white"
						color="primary"
						size="lg"
						disabled={isSaving}
					>
						{editMode ? "Enregistrer" : "Modifier"}
					</Button>
				</form>
			</div>
		</div>
	);
}