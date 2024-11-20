"use client";
import BillItem from "@app/coach/dashboard/Bills/_components/BillItem";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { BillType } from "type/billType";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const BillsCards = () => {
	const { coachRoleData } = useAuth();

	const [bills, setBills] = useState<BillType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchBills = async () => {
			if (coachRoleData?.structure?.id) {
				setIsLoading(true);
				try {
					const response = await axios.get(
						`${baseUrl}/bills/structure/${coachRoleData.structure.id}`,
					);
					setBills(response.data);
				} catch (error) {
					console.error("Error fetching bills:", error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchBills();
	}, [coachRoleData]);

	console.log("coachRoleData", coachRoleData);

	if (!coachRoleData || !coachRoleData?.structure?.id) {
		return null;
	}

	return (
		<div className="flex-1 mx-auto py-10 px-5 border rounded-lg bg-slate-50 drop-shadow-sm">
			<h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">
				Mes factures ({bills?.length ?? 0})
			</h2>

			{isLoading && (
				<div className="w-full py-5 flex flex-col gap-3 items-center justify-center">
					<p>Récupération des factures...</p>
					<Spinner />
				</div>
			)}

			<div className="flex flex-row flex-wrap items-start justify-start">
				<>
					{bills &&
						bills.slice(0, 3).map((bill: BillType) => (
							<BillItem
								bill={bill}
								key={bill.idBill}
							/>
						))}

					{bills.length > 3 && (
						<Button
							color="primary"
							className="text-white"
							as={"a"}
							href={"/coach/dashboard/Bills"}
						>
							<p className="text-sm font-bold">Voir plus</p>
						</Button>
					)}
				</>
			</div>
		</div>
	);
};

export default BillsCards;
