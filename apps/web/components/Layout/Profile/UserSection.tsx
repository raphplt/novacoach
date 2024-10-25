"use client";

import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

import PageLoader from "@components/Common/Loaders/PageLoader";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAccountSchema } from "@utils/schemas/editAccount.schema";
import Account from "./Account";
import ButtonEdit from "@components/Common/Buttons/ButtonEdit";
import { handleValidationErrors } from "@utils/functions/validation";
import useMutate from "@hooks/useMutation";
import { useAuth } from "contexts/AuthProvider";

export default function UserSection() {
    const [editMode, setEditMode] = useState(false);
    const { user, setUser, loading } = useAuth();

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

    return (
		<section className="bg-white/30 backdrop-blur-sm min-w-[40%] mx-auto rounded-xl px-10 py-5">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-center font-bold text-xl">Mon profil</h1>
			</div>

			<Account infosUser={user} />

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