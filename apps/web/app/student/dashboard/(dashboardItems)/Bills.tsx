"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { BillType } from "type/billType";

export default function Bills() {
	const router = useRouter();
	const { user } = useAuth();
	if (!user) return null;

	const { data, isLoading, error } = useFetchData({
		url: "/bills/user/" + user.id,
	});

	return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/bills");
			}}
		>
			<Icon
				icon="tdesign:money"
				width={24}
			/>
			<h1>Mes factures</h1>
			{isLoading ? (
				<p>Chargement...</p>
			) : (
				<>
					<p>
						Reste à payer :{" "}
						{data?.data.reduce((acc: any, bill: any) => {
							if (bill.status === "Pending") {
								return acc + bill.amount;
							}
							return acc;
						}, 0)}{" "}
						€
					</p>
					<p>
						Factures en attente :{" "}
						{
							data?.data.filter(
								(bill: BillType) => bill.status === "Pending",
							).length
						}
					</p>
				</>
			)}
		</PanelBox>
	);
}
