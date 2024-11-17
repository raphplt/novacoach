"use client";

import { Avatar, Button, Chip, Input } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import PageLoader from "@components/Common/Loaders/PageLoader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAccountSchema } from "@utils/schemas/editAccount.schema";
import ButtonEdit from "@components/Common/Buttons/ButtonEdit";
import { handleValidationErrors } from "@utils/functions/validation";
import useMutate from "@hooks/useMutation";
import { useAuth } from "contexts/AuthProvider";
import { maj } from "@utils/functions/text";
import ModalProfil from "./ModalProfil";
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function UserSection() {
	const [editMode, setEditMode] = useState(false);
	const { user, setUser, loading } = useAuth();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const methods = useForm({
		resolver: zodResolver(editAccountSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = methods;

	useEffect(() => {
		if (user) {
			reset({
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				email: user.email || "",
				phone: user.phone || "",
				address: user.address || "",
			});
		}
	}, [user, reset]);

	const { mutate, isError, error, isPending } = useMutate({
		method: "PUT",
		url: "/users",
	});

	if (!user || loading)
		return <PageLoader text="Chargement de vos informations" />;
	if (isPending)
		return <PageLoader text="Enregistrement de vos informations" />;

	const handleEdit: SubmitHandler<FieldValues> = (data) => {
		const validateFields = editAccountSchema.safeParse(data);
		const isValid = handleValidationErrors(validateFields, methods);

		const dataWithId = { ...data, id: user.id };

		if (!isValid) throw new Error("Invalid form data");

		mutate(dataWithId, {
			onSuccess: (result) => {
				setUser(result);
				setEditMode(false);
			},
			onError: (error) => {
				console.error(error);
			},
		});
	};

	const handleFileUpload = async () => {
		if (!selectedFile || !user) {
			console.warn(
				"Aucun fichier sélectionné ou utilisateur non trouvé.",
			);
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/profile-image`,
				{
					method: "PUT",
					body: formData,
				},
			);

			if (response.ok) {
				const updatedUser = await response.json();
				toast.success("Image de profil mise à jour avec succès");
				setUser(updatedUser);
				setSelectedFile(null);
			} else {
				console.error("Erreur lors de l'upload de l'image de profil");
			}
		} catch (error) {
			console.error("Erreur lors de la requête :", error);
		}
	};

	const handleAvatarClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);
		if (file) {
			setIsModalVisible(true);
		}
	};

	return (
		<section className="bg-white/30 backdrop-blur-sm min-w-[40%] mx-auto rounded-xl px-10 py-5">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-center font-bold text-xl">Mon profil</h1>
			</div>

			<div className="flex flex-row gap-5 items-center py-5">
				<button
					className="relative group"
					onClick={handleAvatarClick}
				>
					<Avatar
						src={user.profileImageUrl}
						size="lg"
						className="group-hover:opacity-75 transition-opacity duration-300"
					/>
					<Icon
						icon="material-symbols:edit"
						className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style={{ fontSize: "24px" }}
					/>
				</button>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<p className="text-lg font-semibold">
							{user.firstName + " " + user.lastName}
						</p>
						<Chip
							color="secondary"
							className="text-white"
						>
							{user.role && maj(user.role.name)}
						</Chip>
					</div>
					<p className="text-default-400">{user.email}</p>
				</div>
			</div>

			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>

			<ModalProfil
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				handleFileUpload={handleFileUpload}
			/>

			<div className="flex items-center justify-between w-full mt-8 mb-4">
				<h3 className=" text-default-500 font-semibold">
					Mes informations
				</h3>
				<ButtonEdit
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			</div>

			<form
				className="flex flex-col gap-5 w/full mx-auto"
				onSubmit={handleSubmit(handleEdit)}
			>
				<Input
					label="Prénom"
					isDisabled={!editMode}
					{...register("firstName")}
					isInvalid={!!errors.firstName}
				/>
				<Input
					label="Nom"
					isDisabled={!editMode}
					{...register("lastName")}
					isInvalid={!!errors.lastName}
				/>
				<Input
					label="Email"
					isDisabled={!editMode}
					{...register("email")}
					isInvalid={!!errors.email}
				/>
				<Input
					label="Téléphone"
					isDisabled={!editMode}
					{...register("phone")}
					isInvalid={!!errors.phone}
				/>
				<Input
					label="Adresse"
					isDisabled={!editMode}
					{...register("address")}
					isInvalid={!!errors.address}
				/>

				{editMode && (
					<Button
						color="primary"
						className="text-white"
						type="submit"
					>
						Enregistrer
					</Button>
				)}
			</form>
			{isError && (
				<div className="text-red-500 text-sm">{error?.message}</div>
			)}
		</section>
	);
}