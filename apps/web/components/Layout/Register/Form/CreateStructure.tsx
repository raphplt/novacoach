"use client";

import FormWrapper from "@components/Common/Container/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterForm from "@hooks/useRegisterForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Link } from "@nextui-org/react";
import { structureSchema } from "@utils/schemas/structure.schema";
import { useAuth } from "contexts/AuthProvider";
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
	const [address, setAddress] = useState<string | undefined>(undefined);
	const [phone, setPhone] = useState<string | undefined>(undefined);
	const { step, setStep, user } = useRegister();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { user: currentUser } = useAuth();
	const router = useRouter();

	const methods = useForm({
		resolver: zodResolver(structureSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		setValue,
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
				selectedFile,
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

	useEffect(() => {
		if (currentUser?.address) {
			setAddress(currentUser.address);
		}
		if (currentUser?.phone) {
			setPhone(currentUser.phone);
		}
	}, [currentUser]);

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
							isClearable
						/>
						<Input
							{...register("description")}
							label="Description"
							isInvalid={!!errors.description}
							type="textarea"
							isClearable
						/>
						<Input
							{...register("address")}
							label="Adresse"
							placeholder="Adresse"
							isInvalid={!!errors.address}
							type="text"
							value={address}
							defaultValue={currentUser?.address}
							onChange={(e) => setAddress(e.target.value)}
							isClearable
						/>
						{!address && (
							<Button
								onClick={() => {
									setValue("address", currentUser?.address);
									setAddress(currentUser?.address);
								}}
							>
								Utiliser mon adresse
							</Button>
						)}
						<Input
							{...register("phone")}
							label="Téléphone"
							placeholder="Téléphone"
							isInvalid={!!errors.phone}
							type="tel"
							value={phone}
							defaultValue={currentUser?.phone}
							onChange={(e) => setPhone(e.target.value)}
							isClearable
						/>

						{!phone && (
							<Button
								onClick={() => {
									setValue("phone", currentUser?.phone);
									setPhone(currentUser?.phone);
								}}
							>
								Utiliser mon numéro de téléphone
							</Button>
						)}

						<Input
							type="file"
							label="Logo"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
									setSelectedFile(file);
								}
							}}
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
