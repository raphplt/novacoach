"use client";
import PanelBox from "@components/Common/Box/PanelBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

const MyProgram = () => {
	const router = useRouter();
	return (
		<PanelBox onPress={() => router.push("/student/dashboard/program")}>
			<Icon
				icon="fluent:list-16-filled"
				width={24}
			/>
			<h1>Mon programme</h1>
		</PanelBox>
	);
};

export default MyProgram;
