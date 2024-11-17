"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginForm from "@hooks/useLoginForm";
import { Input, Button, Link } from "@nextui-org/react";
import { loginSchema } from "@utils/schemas/login.schema";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoginData } from "type/login";

export default function LoginForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const methods = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		setError,
		clearErrors,
	} = methods;

	const { handleLogin } = useLoginForm(methods);

	// Submit form
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsSubmitting(true);
			clearErrors("apiError");
			await handleLogin(data as LoginData);
		} catch (error: any) {
			console.error("error during login", error);
			setError("apiError", {
				type: "manual",
				message: error.message,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<form
				className="max-w-2xl mx-auto flex flex-col gap-4 bg-gray-200 px-14 py-10 rounded-xl"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-3xl  font-bold text-center">
					Connexion à Novacoach
				</h1>

				{errors.apiError && (
					<div className="text-red-500 text-center">
						{String(errors.apiError.message)}
					</div>
				)}
				<Input
					type="text"
					{...register("email")}
					label="Adresse email"
					isInvalid={!!errors.email}
				/>
				<Input
					type="password"
					{...register("password")}
					label="Mot de passe"
					isInvalid={!!errors.password}
					autoComplete="current-password"
				/>
				<Button
					type="submit"
					className="w-full font-bold text-white mt-3"
					isLoading={isSubmitting}
					disabled={isSubmitting}
					color="primary"
				>
					Connexion
				</Button>
				<div className="flex items-center justify-center mt-3">
					<Link href="/auth/register">
						Inscription en tant que coach ou élève
					</Link>
				</div>
			</form>
		</div>
	);
}
