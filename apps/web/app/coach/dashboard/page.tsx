import BillsCards from "@components/Common/Card/BillsCards";
import StudentsCards from "@components/Common/Card/StudentsCards";
import Bill from "@components/Layout/Dashboard/Bills";
import DashboardInvitation from "@components/Layout/Dashboard/Invitations";
import DashboardNutritionProgram from "@components/Layout/Dashboard/NutritionProgram";
import DashboardSportProgram from "@components/Layout/Dashboard/SportProgram";
import DashboardStructure from "@components/Layout/Dashboard/Structure";
import Students from "@components/Layout/Dashboard/Students";
import React from "react";

export default async function Dashboard() {
	return (
		<main className="min-h-screen">
			<h1 className="pt-20 text-4xl font-extrabold text-gray-900  text-center">
				Mon tableau de bord
			</h1>
			<div className="flex items-center justify-between flex-wrap w-11/12 py-12 mx-auto gap-5">
				<DashboardStructure />
				<DashboardInvitation />
				<DashboardNutritionProgram />
				<DashboardSportProgram />
				<Students />
				<Bill />
			</div>
			<div className="flex flex-row items-between justify-center w-11/12 mx-auto gap-5">
				<StudentsCards />
				<BillsCards />
			</div>
		</main>
	);
}
