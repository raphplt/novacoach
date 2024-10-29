import PanelBox from "@/components/Common/Box/PanelBox";

import Link from "next/link";
import React from "react";

export default function DashboardInvitation() {
	return (
		<PanelBox>
			<Link href={"/coach/create-invitation"}>
				<h2 className="font-semibold text-xl">Invitations</h2>
			</Link>
		</PanelBox>
	);
}
