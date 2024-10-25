import DashboardStudent from "./Dashboard";

export default async function Dashboard() {
	return (
		<main className="h-screen bg-gradient-to-br from-[#bcd3e9] ] to-[#8ec0f8]">
			{" "}
			<h1 className="pt-20 text-center font-bold text-2xl">
				Tableau de bord Élève
			</h1>
			<DashboardStudent />
		</main>
	);
}
