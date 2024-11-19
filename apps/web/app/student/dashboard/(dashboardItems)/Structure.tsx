
"use client";
import PanelBox from '@components/Common/Box/PanelBox';
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "contexts/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";

const Structure = () => {
	const router = useRouter();
	const { user } = useAuth();

	if (user?.coach) {
		return null;
	}

	return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/structure");
			}}
		>
			<Icon
				icon="mdi:teacher"
				width={24}
			/>
			<h1>Liste des structures</h1>
		</PanelBox>
	);
};

export default Structure