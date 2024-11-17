"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardSportProgram() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/coach/dashboard/SportProgram");
			}}
		>
			<Icon
				icon="icon-park-outline:dumbbel-line"
				width={24}
			/>
			<h2 className="font-semibold text-xl">Programmes sportifs</h2>
		</PanelBox>
	);
}
