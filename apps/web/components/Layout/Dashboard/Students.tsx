"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import PanelBox from "@components/Common/Box/PanelBox";

export default function DashboardStudents() {
	const router = useRouter();

	return (
		<PanelBox onPress={() => router.push("/coach/dashboard/students")}>
			<h2 className="font-semibold text-xl ">Students</h2>
		</PanelBox>
	);
}
