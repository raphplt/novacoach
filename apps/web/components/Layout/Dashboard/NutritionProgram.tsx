"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardNutritionProgram() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/coach/dashboard/NutritionProgram");
			}}
		>
			<Icon
				icon="fluent:food-24-filled"
				width={24}
			/>
			<h2 className="font-semibold text-xl">Programmes de nutrition</h2>
		</PanelBox>
	);
}
