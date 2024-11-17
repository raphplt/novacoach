"use client";

import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function UserDetails() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/informations");
			}}
		>
			<Icon
				icon="mdi:dumbbell"
				width={24}
			/>
			<h1>Mes données sportives</h1>
		</PanelBox>
	);
}
