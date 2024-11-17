"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import useFetchData from "@hooks/useFetchData";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import { useBills } from "contexts/BillsProvider";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserType } from "type/user";
import { z } from "zod";

const billSchema = z.object({
	amount: z.coerce.number().positive(),
	dateIssued: z.date(),
	dateDue: z.date(),
	status: z.string(),
	userId: z.coerce.number(),
	structureId: z.coerce.number(),
});

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const CreateBill = () => {
	const { user, coachRoleData } = useAuth();
	const { bills, setBills } = useBills();
	const [students, setStudents] = React.useState<UserType[]>([]);

	if (!user) {
		return <p>Loading</p>;
	}

	const { data: studentsData } = useFetchData({
		url: `/user/studentsByCoachId/${user?.coachRole?.id}`,
		enabled: !!user?.coachRole?.id,
	});

	useEffect(() => {
		if (studentsData) {
			setStudents(studentsData.data as any);
		}
	}, [studentsData]);

	const methods = useForm({
		resolver: zodResolver(billSchema),
		mode: "onSubmit",
		defaultValues: {
			amount: 0,
			dateIssued: new Date().toISOString().split("T")[0],
			dateDue: new Date().toISOString().split("T")[0],
			status: "pending",
			userId: 0,
			structureId: coachRoleData?.structure?.id,
		},
	});

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = methods;

	const handleCreate: SubmitHandler<FieldValues> = async (data) => {
		try {
			console.log(data);

			const response = await axios.post(urlBase + "/bills", data);
			console.log(response);

			if (response.status === 201) {
				toast.success("Facture créée avec succès");
			}

			const newBill = response.data;
			setBills([...bills, newBill]);
		} catch (error) {
			console.error(error);
			toast.error("Erreur lors de la création de la facture");
		}
	};

	return (
		<div className="flex-1">
			<h1 className="text-lg font-bold mb-6 text-center">
				Nouvelle facture
			</h1>
			<form
				onSubmit={handleSubmit(handleCreate)}
				className="w-2/3 mx-auto flex flex-col gap-3 bg-white border  rounded-lg drop-shadow-sm px-5 py-10"
			>
				<Input
					label="Montant (€)"
					type="number"
					{...register("amount", { valueAsNumber: true })}
					isInvalid={!!errors.amount}
					errorMessage={String(errors.amount?.message)}
					aria-label="Montant"
				/>

				<Input
					label="Date d'émission"
					type="date"
					{...register("dateIssued", { valueAsDate: true })}
					isInvalid={!!errors.dateIssued}
					errorMessage={String(errors.dateIssued?.message)}
					arial-label="Date d'émission"
				/>

				<Input
					label="Date d'échéance"
					type="date"
					{...register("dateDue", { valueAsDate: true })}
					isInvalid={!!errors.dateDue}
					errorMessage={String(errors.dateDue?.message)}
					arial-label="Date d'échéance"
				/>

				<Select
					label="Statut"
					{...register("status")}
					isInvalid={!!errors.status}
					errorMessage={String(errors.status?.message)}
					arial-label="Statut"
				>
					<SelectItem
						value="pending"
						key={"Pending"}
						textValue="En attente"
					>
						En attente
					</SelectItem>
					<SelectItem
						value="paid"
						key={"Paid"}
						textValue="Payée"
						aria-label="Payée"
					>
						Payée
					</SelectItem>
					<SelectItem
						value="canceled"
						key={"Canceled"}
						textValue="Annulée"
						aria-label="Annulée"
					>
						Annulée
					</SelectItem>
				</Select>

				<Select
					label="Structure"
					{...register("structureId", { valueAsNumber: true })}
					isInvalid={!!errors.structureId}
					errorMessage={String(errors.structureId?.message)}
					aria-label="Structure"
				>
					<SelectItem
						value={coachRoleData?.structure?.id}
						key={String(coachRoleData?.structure?.id)}
						textValue={coachRoleData?.structure?.name}
						aria-label={coachRoleData?.structure?.name}
					>
						{coachRoleData?.structure?.name}
					</SelectItem>
				</Select>

				<Select
					label="Élève"
					{...register("userId", { valueAsNumber: true })}
					isInvalid={!!errors.userId}
					errorMessage={String(errors.userId?.message)}
					aria-label="Élève"
				>
					{students.map((student) => (
						<SelectItem
							key={student.id}
							value={student.id}
							textValue={String(
								student.firstName + " " + student.lastName,
							)}
							aria-label={String(
								student.firstName + " " + student.lastName,
							)}
						>
							{student.firstName} {student.lastName}
						</SelectItem>
					))}
				</Select>
				<Button
					className="font-bold text-white"
					color="primary"
					type="submit"
					aria-label="Créer la facture"
				>
					Créer la facture
				</Button>
			</form>
		</div>
	);
};

export default CreateBill;