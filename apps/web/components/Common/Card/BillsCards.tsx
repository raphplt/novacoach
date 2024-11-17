/* eslint-disable @next/next/no-img-element */
"use client";
import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BillType } from "type/billType";

const BillsCards = () => {
	const { coachRoleData } = useAuth();
	const router = useRouter();

	if (!coachRoleData || !coachRoleData?.structure?.id) {
		return null;
	}

	const [bills, setBills] = useState<BillType[]>([]);

	const { data: billsData, isLoading } = useFetchData({
		url: `/bills/structure/${coachRoleData?.structure?.id}`,
		enabled: !!coachRoleData?.structure?.id,
	});

	useEffect(() => {
		if (billsData) {
			setBills(billsData.data as any);
		}
	}, [billsData]);

	return (
		<div className="flex-1 mx-auto py-10 px-5 border rounded-lg bg-slate-50 drop-shadow-sm">
			<h2 className="text-2xl font-extrabold text-gray-900 text-center mb-4">
				Mes factures ({bills?.length})
			</h2>

			{isLoading && (
				<div className="w-full py-5 flex flex-col gap-3 items-center justify-center">
					<p>Récupération des factures...</p>
					<Spinner />
				</div>
			)}

			<div className="flex flex-row flex-wrap gap-5 items-start justify-start"></div>
		</div>
	);
};

export default BillsCards;
