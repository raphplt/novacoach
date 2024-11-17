import DataGraph from "@components/Common/Graphs/DataGraph";
import Invitations from "./(dashboardItems)/Invitations";
import MyCoach from "./(dashboardItems)/MyCoach";
import UserDetails from "./(dashboardItems)/UserDetails";
import Graphics from "./(dashboardItems)/Graphics";
import MyProgram from "./(dashboardItems)/MyProgram";
import Structure from "./(dashboardItems)/Structure";

export default function DashboardStudent() {
	return (
		<>
			<div className="flex items-center justify-center flex-wrap w-10/12 py-12 mx-auto gap-9">
				<MyCoach />
				<Invitations />
				<UserDetails />
				<MyProgram />
				<Graphics />
				<Structure />
			</div>
			<DataGraph />
		</>
	);
}
