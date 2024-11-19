"use client";
import BillItem from "@app/coach/dashboard/Bills/_components/BillItem";
import PageLoader from "@components/Common/Loaders/PageLoader";
import useFetchData from "@hooks/useFetchData";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { BillType } from "type/billType";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const Page = () => {
	const { user } = useAuth();
	const [bills, setBills] = useState<BillType[]>([]);

	if (!user) return null;

	const { data, isLoading, error } = useFetchData({
		url: "/bills/user/" + user.id,
	});

	useEffect(() => {
		if (data && data.data) {
			setBills(data.data);
		}
	}, [data]);

	if (isLoading) return <PageLoader />;

	if (error) return <div>Erreur lors du chargement des données</div>;

	const payBill = async (id: number) => {
		try {
			const bill = await axios.put(`${baseUrl}/bills/pay/${id}`);
			if (bill) {
				const newBills = bills.map((bill: BillType) => {
					if (bill.idBill === id) {
						return { ...bill, status: "Paid" };
					}
					return bill;
				});
				setBills(newBills);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen">
			<h1 className="text-2xl font-semibold pt-20 text-center">
				Mes factures
			</h1>

			<p className="text-center py-4 text-lg font-semibold text-default-600">
				Reste à payer :{" "}
				{bills.reduce((acc, bill) => {
					if (bill.status === "Pending") {
						return acc + bill.amount;
					}
					return acc;
				}, 0)}
				€{" "}
			</p>

			<div className="flex flex-col items-center justify-center">
				{bills.map((bill: BillType) => (
					<div
						key={bill.idBill}
						className="flex items-center flex-col justify-between w-10/12 py-4 my-4 border-b border-gray-200"
					>
						<BillItem bill={bill} />
						{bill.status === "Pending" && (
							<Button
								color="primary"
								className="text-white w-full"
								onClick={() => payBill(bill.idBill)}
							>
								Payer
							</Button>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Page;
