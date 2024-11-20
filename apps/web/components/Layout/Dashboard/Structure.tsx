"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import PanelBox from "@components/Common/Box/PanelBox";

export default function DashboardStructure() {
	const { coachRoleData, loadingCoachData } = useAuth();
	const router = useRouter();

	const structure = coachRoleData?.structure;

	console.log(
		"coachRoleData",
		coachRoleData,
		"loadingCoachData",
		loadingCoachData,
		"structure",
		structure,
	);
	// if (loadingCoachData) {
	// 	return <PanelBox>Chargement...</PanelBox>;
	// }

	return (
		<PanelBox
			onPress={() =>
				structure
					? router.push(`/coach/dashboard/structure/${structure?.id}`)
					: router.push("/coach/dashboard/create-structure")
			}
		>
			<Icon
				icon="akar-icons:home"
				width={24}
			/>
			<h2 className="font-semibold text-xl">Ma structure</h2>
			{structure ? (
				<div>
					<p>{structure?.name}</p>
				</div>
			) : (
				<div>
					<p className="text-gray-500">
						Vous n'avez pas encore de structure
					</p>
					<div className="flex gap-2 items-center py-1 ">
						<p className="">Créer ma structure</p>
						<Icon
							icon="mdi:arrow-right"
							className="text-gray-500 cursor-pointer"
							width={24}
						/>
					</div>
				</div>
			)}
		</PanelBox>
	);
}
