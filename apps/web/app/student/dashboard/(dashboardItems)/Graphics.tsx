"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function Graphics() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/progression");
			}}
		>
			<Icon
				icon="mdi:graph-line"
				width={24}
			/>
			<h1>Voir ma progression</h1>
		</PanelBox>
	);
}
