"use client";

import { useState, useEffect } from "react";
import {
	useForm,
	SubmitHandler,
	FormProvider,
	FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@utils/schemas/register.schema";
import { Button, Input } from "@nextui-org/react";
import useRegisterForm from "@hooks/useRegisterForm";
import { RegisterData } from "type/register";
import { useRegister } from "contexts/RegisterProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import FormWrapper from "@components/Common/Container/FormWrapper";
import Link from "next/link";

export default function CreateAccount() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { role, setStep, step } = useRegister();
	const methods = useForm({
		resolver: zodResolver(registerSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		watch,
	} = methods;

	const { handleCreateAccount } = useRegisterForm(methods, role);
	const [passwordCriteria, setPasswordCriteria] = useState({
		length: false,
		uppercase: false,
		number: false,
		specialChar: false,
	});

	const password = watch("password");

	useEffect(() => {
		setPasswordCriteria({
			length: password?.length >= 12,
			uppercase: /[A-Z]/.test(password),
			number: /[0-9]/.test(password),
			specialChar: /[^a-zA-Z0-9]/.test(password),
		});
	}, [password]);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsSubmitting(true);
			const success = await handleCreateAccount(data as RegisterData);
			if (success) {
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
				<Link href="/auth/register" className="flex flex-row gap-2 w-11/12 mx-auto">
					<Icon icon="mdi:arrow-left" className="text-gray-500 cursor-pointer" width={24} />
					Retour
				</Link>
				<h1 className="text-3xl pt-10 font-bold text-center my-5">
					Créer un compte {role === "student" ? "Élève" : "Coach"}
				</h1>
				<FormProvider {...methods}>
					<form
						className="w-1/2 mx-auto flex flex-col gap-4 bg-slate-50 px-10 py-5"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex gap-2 items-center">
							<Input type="text" {...register("firstName")} label="Prénom" isInvalid={!!errors.firstName} />
							<Input type="text" {...register("lastName")} label="Nom" isInvalid={!!errors.lastName} />
						</div>
						<Input
							type="email"
							{...register("email")}
							label="Email"
							isInvalid={!!errors.email}
							startContent={<Icon icon="mdi:email" className="text-gray-500" width={24} />}
						/>

						<Input
							type="text"
							{...register("phone")}
							label="Téléphone"
							isInvalid={!!errors.phone}
							startContent={<Icon icon="mdi:phone" className="text-gray-500" width={24} />}
						/>
						<Input
							type="text"
							{...register("address")}
							label="Adresse"
							isInvalid={!!errors.address}
							startContent={<Icon icon="mdi:home" className="text-gray-500" width={24} />}
						/>

						<Input
							type="password"
							{...register("password")}
							label="Mot de passe"
							isInvalid={!!errors.password}
						/>

						<div className="mt-2">
							<p className={`text-sm ${passwordCriteria.length ? "text-green-500" : "text-red-500"}`}>
								• Au moins 12 caractères
							</p>
							<p className={`text-sm ${passwordCriteria.uppercase ? "text-green-500" : "text-red-500"}`}>
								• Au moins une majuscule
							</p>
							<p className={`text-sm ${passwordCriteria.number ? "text-green-500" : "text-red-500"}`}>
								• Au moins un chiffre
							</p>
							<p className={`text-sm ${passwordCriteria.specialChar ? "text-green-500" : "text-red-500"}`}>
								• Au moins un caractère spécial
							</p>
						</div>

						<Button isLoading={isSubmitting} type="submit" className="w-full font-bold text-white" color="primary">
							S'inscrire
						</Button>
						{errors.credentials && (
							<div className="flex items-center justify-start gap-5 bg-red-300 rounded-xl py-3 px-5 w-full mx-auto">
								<Icon icon="mdi:alert" className="text-white" width={24} />
								<p className="text-white text-center">
									{String(errors.credentials.message)}
								</p>
							</div>
						)}
					</form>
				</FormProvider>
			</div>
		</FormWrapper>
	);
}