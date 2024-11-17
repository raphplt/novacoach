"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { invitationSchema } from "@utils/schemas/invitation.schema";
import { useEffect, useState } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "contexts/AuthProvider";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function CreateInvitationForm() {
	const { user } = useAuth();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [invitationLink, setInvitationLink] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const methods = useForm({
		resolver: zodResolver(invitationSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = methods;

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsSubmitting(true);
		setError(null);
		setSuccessMessage(null);
		setInvitationLink(null);
		setCopied(false);

		if (!user?.coachRole) {
			setError("You must be a coach to generate an invitation link");
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await axios.post(
				`${urlBase}` + "/invitations/generate",
				{
					coachId: user?.coachRole?.id,
					studentEmail: data.email,
				},
			);
			const link = response.data.link;
			setSuccessMessage(`Lien d'invitation généré !`);
			setInvitationLink(urlBase + link);
		} catch (error: any) {
			setError(error.response?.data?.error || "An error occurred");
		} finally {
			setIsSubmitting(false);
		}
	};

	const copyToClipboard = () => {
		if (invitationLink) {
			navigator.clipboard.writeText(invitationLink);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<>
			<FormProvider {...methods}>
				<form
					className="flex flex-col gap-5 w-1/3 mx-auto"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input
						label="Email de l'élève"
						placeholder="Email"
						{...register("email")}
						errorMessage={String(errors.email?.message)}
						isClearable
					/>
					<Button
						color="primary"
						className="text-white"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting
							? "Envoi en cours..."
							: "Envoyer l'invitation"}
					</Button>
					{error && <span className="text-red-500">{error}</span>}
					{successMessage && (
						<span className="text-green-500 font-semibold">
							{successMessage}
						</span>
					)}
					{invitationLink && (
						<div>
							<Input
								label="Lien d'invitation"
								value={invitationLink}
								readOnly
								endContent={
									<Button
										color="secondary"
										className="text-white"
										onClick={copyToClipboard}
										isIconOnly
									>
										<Icon
											icon={
												copied
													? "mdi:check"
													: "mdi:content-copy"
											}
										/>
									</Button>
								}
							/>
						</div>
					)}
				</form>
			</FormProvider>
		</>
	);
}
