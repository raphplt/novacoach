import DashboardInvitation from "@components/Layout/Dashboard/Invitations";
import DashboardProgram from "@components/Layout/Dashboard/NutritionProgram";
import DashboardSportProgram from "@components/Layout/Dashboard/SportProgram";
import DashboardStructure from "@components/Layout/Dashboard/Structure";
import Students from "@components/Layout/Dashboard/Students";
import React from "react";

export default async function Dashboard() {
	return (
		<main className="h-screen bg-gradient-to-r from-blue-100 to-blue-200">
			<h1 className="pt-20 text-center font-bold text-2xl">
				Tableau de bord Coach
			</h1>
			<div className="flex items-center justify-start flex-wrap w-10/12 py-12 mx-auto gap-5">
				<DashboardStructure />
				<DashboardInvitation />
				<DashboardProgram />
				<DashboardSportProgram />
				<Students />
			</div>
		</main>
	);
}
