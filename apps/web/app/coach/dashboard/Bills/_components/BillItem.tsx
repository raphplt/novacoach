import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { BillType } from "type/billType";

interface BillItemProps {
	bill: BillType;
}

const BillItem: React.FC<BillItemProps> = ({ bill }) => {
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "paid":
				return "bg-green-100";
			case "pending":
				return "bg-yellow-100";
			case "canceled":
				return "bg-red-100";
			default:
				return "bg-gray-100";
		}
	};

	return (
		<div
			key={bill.idBill}
			className={`mb-4 p-4 border mx-auto drop-shadow-sm rounded-lg w-full flex flex-col justify-between ${getStatusColor(bill.status)}`}
		>
			<div>
				<h2 className="text-xl font-semibold">
					Montant: {bill.amount} €
				</h2>
				<p className="flex flex-row items-center gap-2">
					<Icon icon="mdi:calendar" /> Date d'émission:{" "}
					{new Date(bill.dateIssued).toLocaleDateString()}
				</p>
				<p className="flex flex-row items-center gap-2">
					<Icon icon="mdi:calendar" /> Date d'échéance:{" "}
					{new Date(bill.dateDue).toLocaleDateString()}
				</p>
				<p className="flex flex-row items-center gap-2">
					<Icon icon="mdi:ticket-outline" /> Statut: {bill.status}
				</p>
				<p className="flex flex-row items-center gap-2">
					<Icon icon="mdi:user" />
					Utilisateur: {bill.user.firstName} {bill.user.lastName}
				</p>
				<p className="flex flex-row items-center gap-2">
					<Icon icon="mdi:house" />
					Structure: {bill.structure.name}
				</p>
			</div>
		</div>
	);
};

export default BillItem;
