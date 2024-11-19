"use client";
import React, { useState } from "react";
import { useBills } from "contexts/BillsProvider";
import { BillType } from "type/billType";
import { Button } from "@nextui-org/react";
import BillItem from "./BillItem";

const BillsList = () => {
	const { bills } = useBills();

	const [filters, setFilters] = useState({
		status: "",
		sortBy: "",
	});

	const [visibleCount, setVisibleCount] = useState(5);

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const filteredAndSortedBills = bills
		.filter((bill) =>
			filters.status
				? bill.status.toLowerCase() === filters.status.toLowerCase()
				: true,
		)
		.sort((a, b) => {
			if (filters.sortBy === "amount") {
				return b.amount - a.amount;
			}
			if (filters.sortBy === "dateIssued") {
				return (
					new Date(b.dateIssued).getTime() -
					new Date(a.dateIssued).getTime()
				);
			}
			return 0;
		});

	const visibleBills = filteredAndSortedBills.slice(0, visibleCount);

	const loadMore = () => {
		setVisibleCount((prev) => prev + 5);
	};

	return (
		<div className="flex-1">
			<h1 className="text-lg font-bold mb-6 text-center">
				Liste des factures ({filteredAndSortedBills.length})
			</h1>

			{/* Filtres */}
			<div className="flex gap-4 mb-4 pb-5 justify-center">
				<select
					name="status"
					className="border rounded px-4 py-2"
					onChange={handleFilterChange}
					value={filters.status}
				>
					<option value="">Tous les statuts</option>
					<option value="paid">Payé</option>
					<option value="pending">En attente</option>
					<option value="canceled">Annulé</option>
				</select>

				<select
					name="sortBy"
					className="border rounded px-4 py-2"
					onChange={handleFilterChange}
					value={filters.sortBy}
				>
					<option value="">Trier par</option>
					<option value="amount">Montant</option>
					<option value="dateIssued">Date d'émission</option>
				</select>
			</div>

			{/* Liste des factures */}
			<div className="flex flex-col items-center justify-center mx-auto w-11/12">
				{visibleBills.map((bill: BillType) => (
					<BillItem
						key={bill.idBill}
						bill={bill}
					/>
				))}
			</div>

			{/* Bouton Voir plus */}
			{visibleCount < filteredAndSortedBills.length && (
				<div className="mt-6 text-center">
					<Button
						onClick={loadMore}
						color="primary"
						className="text-white"
					>
						Voir plus
					</Button>
				</div>
			)}
		</div>
	);
};

export default BillsList;
