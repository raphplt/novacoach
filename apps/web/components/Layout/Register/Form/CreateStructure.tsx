"use client";

import FormWrapper from "@components/Common/Container/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterForm from "@hooks/useRegisterForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Link } from "@nextui-org/react";
import { structureSchema } from "@utils/schemas/structure.schema";
import { useRegister } from "contexts/RegisterProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";

export default function CreateStructure({
	forceRedirect,
}: {
	forceRedirect?: boolean;
}) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [coachId, setCoachId] = useState<number | null>(null);
	const { step, setStep, user } = useRegister();
	const router = useRouter();

	const methods = useForm({
		resolver: zodResolver(structureSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = methods;

	const { handleCreateStructure } = useRegisterForm(methods, "coach");

	const fetchCoachId = async (userId: number) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/coaches/user/${userId}`,
			);
			const data = await response.json();
			if (response.ok) {
				setCoachId(data.id);
			} else {
				console.error("Failed to fetch coach data", data);
			}
		} catch (error) {
			console.error("Error fetching coach data", error);
		}
	};

	useEffect(() => {
		if (user?.id) {
			fetchCoachId(user.id);
		}
	}, [user]);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsSubmitting(true);
			const mergedData = {
				...data,
				coachId: coachId || null,
			};
			await handleCreateStructure(mergedData as any);
			if (forceRedirect) {
				router.push("/coach/dashboard");
			} else {
				setStep(step + 1);
			}
		} catch (error: any) {
			throw new Error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<FormWrapper>
			<div className="flex-1">
				<Link
					href="/coach/dashboard"
					className="absolute top-20 right-12 flex items-center gap-2"
				>
					Je le ferai plus tard
					<Icon
						icon="akar-icons:arrow-right"
						className="text-2xl"
					/>
				</Link>
				<h1 className="text-3xl pt-10 font-bold text-center my-5">
					Je crée ma structure
				</h1>
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-1/2 mx-auto flex flex-col gap-4 bg-slate-50 px-10 py-5"
					>
						<Input
							type="text"
							{...register("name")}
							label="Nom de la structure"
							isInvalid={!!errors.name}
						/>
						<Input
							{...register("description")}
							label="Description"
							isInvalid={!!errors.description}
							type="textarea"
						/>
						<Input
							{...register("address")}
							label="Adresse"
							placeholder="Adresse"
							isInvalid={!!errors.address}
							type="text"
						/>
						<Input
							{...register("phone")}
							label="Téléphone"
							placeholder="Téléphone"
							isInvalid={!!errors.phone}
							type="tel"
						/>
						<Input
							{...register("logo")}
							label="Logo"
							placeholder="Logo"
							isInvalid={!!errors.logo}
							type="text"
						/>
						<Button
							isLoading={isSubmitting}
							type="submit"
							className="w-full font-bold text-white"
							color="primary"
						>
							Créer ma structure
						</Button>
					</form>
				</FormProvider>
			</div>
		</FormWrapper>
	);
}