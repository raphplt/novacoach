import DashboardStudent from "./Dashboard";

export default async function Dashboard() {
	return (
		<main className="min-h-screen pb-12">
			<h1 className="pt-12 text-center font-bold text-2xl">
				Tableau de bord Élève
			</h1>
			<DashboardStudent />
		</main>
	);
}
