"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

export default function Bill() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/coach/dashboard/Bills");
			}}
		>
			<Icon
				icon="tdesign:money"
				width={24}
			/>
			<h2 className="font-semibold text-xl">Mes factures</h2>
		</PanelBox>
	);
}
