"use client";

import React from "react";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function TrackProgram() {
	const router = useRouter();

	return (
		<div>
			<PanelBox
				onPress={() => {
					router.push("/student/dashboard/ma-seance");
				}}
			>
				<Icon
					icon="ant-design:form-outlined"
					width={24}
				/>
				<h1>Déclarer ma séance</h1>
			</PanelBox>
		</div>
	);
}
