import DashboardStudent from "./Dashboard";

export default async function Dashboard() {
	return (
		<main className="min-h-screen bg-gradient-to-br py-5 from-[#bcd3e9] ] to-[#8ec0f8]">
			<h1 className="pt-12 text-center font-bold text-2xl">
				Tableau de bord Élève
			</h1>
			<DashboardStudent />
		</main>
	);
}
