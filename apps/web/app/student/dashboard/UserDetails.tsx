import PanelBox from "@/components/Common/Box/PanelBox";
import Link from "next/link";

export default function UserDetails() {
	return (
		<PanelBox>
			<Link
				className="flex flex-row items-center justify-center gap-2"
				href={"/student/dashboard/informations"}
			>
				<h1>Mes informations</h1>
			</Link>
		</PanelBox>
	);
}
