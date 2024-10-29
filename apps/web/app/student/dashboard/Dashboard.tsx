import DataGraph from "@/components/Common/Graphs/DataGraph";
import Invitations from "./Invitations";
import MyCoach from "./MyCoach";
import UserDetails from "./UserDetails";
import Graphics from "./Graphics";

export default function DashboardStudent() {
	return (
		<>
			<div className="flex items-center justify-start flex-wrap w-10/12 py-12 mx-auto gap-5">
				<MyCoach />
				<Invitations />
				<UserDetails />
				<Graphics />
			</div>
			<DataGraph />
		</>
	);
}
