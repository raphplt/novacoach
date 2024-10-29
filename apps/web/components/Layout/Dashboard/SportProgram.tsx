import PanelBox from "@/components/Common/Box/PanelBox";
import Link from "next/link";
import React from "react";

export default function DashboardSportProgram() {
	return (
		<PanelBox>
			<Link href={"/coach/dashboard/SportProgram"}>
				<h2 className="font-semibold text-xl">Sport Programs</h2>
			</Link>
		</PanelBox>
	);
}
