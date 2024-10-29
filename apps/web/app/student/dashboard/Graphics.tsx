import PanelBox from "@/components/Common/Box/PanelBox";
import Link from "next/link";

export default function Graphics() {
	return (
		<PanelBox>
			<Link
				className="flex flex-row items-center justify-center gap-2"
				href={"/student/dashboard/progression"}
			>
				<h1>Voir ma progression</h1>
			</Link>
		</PanelBox>
	);
}
