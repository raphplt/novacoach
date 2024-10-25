import PanelBox from "@components/Common/Box/PanelBox";
import Link from "next/link";
import React from "react";

export default function DashboardProgram() {
	return (
		<PanelBox>
			<Link href={"/coach/dashboard/NutritionProgram"}>
				<h2 className="font-semibold text-xl">Nutrition Programs</h2>
			</Link>
		</PanelBox>
	);
}
