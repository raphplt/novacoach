"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import PanelBox from "@components/Common/Box/PanelBox";

export default function DashboardStudents() {
	const router = useRouter();

	return (
		<PanelBox
			className="flex justify-center items-center"
			onPress={() => router.push("/coach/dashboard/students")}
		>
			<Icon
				icon="mdi:account-group"
				width={24}
			/>
			<h2 className="font-semibold text-xl text-center">Élèves</h2>
		</PanelBox>
	);
}
