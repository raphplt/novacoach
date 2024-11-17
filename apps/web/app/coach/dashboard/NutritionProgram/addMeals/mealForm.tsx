import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const mealSchema = z.object({
	mealStarter: z.string().optional(),
	mealMain: z.string().optional(),
	dessert: z.string().optional(),
	endDate: z.date().optional(),
	complements: z.string().optional(),
	dayTime: z.date().optional(),
});

const MealForm = () => {
	const methods = useForm({
		resolver: zodResolver(mealSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = methods;

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data);
	};

	return (
		<div className="my-10">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-2xl mx-auto flex flex-col gap-4 bg-gray-200 px-14 py-10 rounded-xl w-1/2"
			>
				<h1 className="text-xl font-bold text-center">
					Ajouter un repas
				</h1>
				<Input
					label="Entrée"
					{...register("mealStarter")}
					type="string"

				/>

				<Input
					label="Plat"
					{...register("mealMainCourse")}
					type="string"

				/>

				<Input
					label="Dessert"
					{...register("mainDessert")}
					type="string"
				/>

				<Input
					label="endDate"
					{...register("endDate")}
					type="date"
				/>

				<Input
					label="Compléments alimentaires"
					{...register("complements")}
					type="string"
				/>

				<Input
					label="Heure du repas"
					{...register("dayTime")}
					type="date"
				/>

				<Button type="submit">Ajouter</Button>
			</form>
		</div>
	);
};

export default MealForm;
