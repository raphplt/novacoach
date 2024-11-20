"use client";
import PageLoader from "@components/Common/Loaders/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetchProgram from "@hooks/useSportProgram";
import { useParams } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { handleValidationErrors } from "@utils/functions/validation";
import { sportProgramSchema } from "@utils/schemas/sportProgram.schema";
import axios from "axios";
import router from "next/router";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
	const params = useParams();

	const id = String(params.id);

	const { programme, error, loading } = useFetchProgram(id);


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

	const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
		try {
			const validateFields = sportProgramSchema.safeParse(data);
			const isValid = handleValidationErrors(validateFields, methods);
			if (!isValid) throw new Error("Invalid form data");

			const response = await axios.post(`${baseUrl}/sportPrograms`, data);

			if (response.status === 201) {
				toast.success("Programme créé avec succès");

				reset();
				router.push(
					`/coach/dashboard/SportProgram/addExercices` +
						`/${response.data.id}`,
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) return <PageLoader text="Chargement en cours" />;

	return (
		<div className="min-h-screen">
			<form onSubmit={handleSubmit(handleUpdate)}>
				<h1 className="mx-auto text-3xl font-bold text-gray-900 mt-20 text-center flex flex-row items-center justify-center">
					Modifier
					<p className="text-primary ml-2">{programme?.name}</p>
				</h1>
				<div className="mt-8 text-center w-1/2 mx-auto">
					<Input
						label="ID"
						{...register("id")}
						defaultValue={String(programme?.id)}
						readOnly
						className="mb-3"
					/>
					<Input
						label="Nom"
						{...register("name")}
						defaultValue={programme?.name}
						isInvalid={!!errors.name}
						className="mb-3"
						errorMessage={String(errors.name?.message)}
					/>
					<Input
						label="Difficulté"
						{...register("difficulty")}
						defaultValue={programme?.difficulty}
						isInvalid={!!errors.difficulty}
						className="mb-3"
						errorMessage={String(errors.difficulty?.message)}
					/>
					<Input
						type="number"
						label="Durée (en jours)"
						{...register("duration", { valueAsNumber: true })}
						defaultValue={String(programme?.duration)}
						isInvalid={!!errors.duration}
						className="mb-3"
						errorMessage={String(errors.duration?.message)}
					/>
					<Input
						type="number"
						label="Fréquence (fois par semaine)"
						{...register("frequency", { valueAsNumber: true })}
						defaultValue={String(programme?.frequency)}
						isInvalid={!!errors.frequency}
						className="mb-3"
						errorMessage={String(errors.frequency?.message)}
					/>

					<Input
						label="Sport"
						{...register("sportId")}
						defaultValue={String(programme?.sport.id)}
						isInvalid={!!errors.structureId}
						className="mb-3"
						errorMessage={String(errors.structureId?.message)}
					/>

					<Button
						type="submit"
						color="primary"
						className="w-full text-white"
					>
						Mettre à jour le programme
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Page;
