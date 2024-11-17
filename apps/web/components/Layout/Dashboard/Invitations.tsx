"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardInvitation() {
	const router = useRouter();
	return (
		<PanelBox
			onPress={() => {
				router.push("/coach/dashboard/Invitations");
			}}
		>
			<Icon
				icon="line-md:link"
				width={24}
			/>
			<h2 className="font-semibold text-xl">Invitations</h2>
		</PanelBox>
	);
}
