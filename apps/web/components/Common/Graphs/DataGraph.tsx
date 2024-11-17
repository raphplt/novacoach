"use client";
import { useAuth } from "contexts/AuthProvider";
import { Line } from "recharts";
import Link from "next/link";
import React from "react";
import Graph from "@components/Common/Graphs/Graph";

const createDataEntry = (dataArray:any[], valueKey:any) => {
	if (!dataArray || !dataArray[0] || !dataArray[0].date) {
		return [];
	}
	return [{
		name: new Date(dataArray[0].date).toLocaleDateString('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}),
		[valueKey]: dataArray[0].value ?? null
	}];
};
export default function DataGraph() {
	const { userDetails } = useAuth();

	if (
		!userDetails ||
		!userDetails.heights ||
		!userDetails.weights ||
		!userDetails.fatMasses ||
		!userDetails.bmis ||
		!userDetails.muscleMasses
	)
	return (
		<div className="flex-1 w-full">
			<h2 className="text-center text-2xl font-bold py-3">Pas encore de données pour le graphique.</h2>
			<div className="flex justify-center">
				<Link
					className="mt-3 px-4 py-2 text-white bg-primary rounded-medium"
					href="/student/dashboard/informations"
					role="button"
				>
					Ajouter mes informations
				</Link>
			</div>
		</div>
	);
	
	const dataHeight 	 = createDataEntry(userDetails.heights, "taille");
	const dataWeight 	 = createDataEntry(userDetails.weights, "poids");
	const dataFatMass    = createDataEntry(userDetails.fatMasses, "masse_grasse");
	const dataBmi 		 = createDataEntry(userDetails.bmis, "imc");
	const dataMuscleMass = createDataEntry(userDetails.muscleMasses, "masse_musculaire");

	const pageWidth 	 = window.innerWidth;
	let graphWidth 		 = pageWidth > 768 ? (pageWidth * .45) : pageWidth *.9;
	let graphHeight 	 = pageWidth > 768 ? 400 : 200;
	return (
		<div className="flex-1 w-full">
			<h2 className="text-center text-2xl font-bold py-3 mb-5">Évolution</h2>
			<div className="flex flex-wrap mb-5">
				<Graph data={dataHeight} width={graphWidth} height={graphHeight} unit="cm">
					<Line type="monotone" dataKey="taille" stroke="#8884d8" />
				</Graph>				
				<Graph data={dataWeight} width={graphWidth} height={graphHeight} unit="kg">
					<Line type="monotone" dataKey="poids" stroke="#82ca9d" />
				</Graph>
			</div>
			<div className="flex flex-wrap mb-5">
				<Graph data={dataFatMass} width={graphWidth} height={graphHeight} unit="kg">
					<Line type="monotone" dataKey="masse_grasse" stroke="#ffc658" />
				</Graph>
				<Graph data={dataBmi} width={graphWidth} height={graphHeight} unit="">
					<Line type="monotone" dataKey="imc" stroke="#ff7300" />
				</Graph>
			</div>
			<Graph data={dataMuscleMass} width={graphWidth} height={graphHeight} unit="kg">
				<Line type="monotone" dataKey="masse_musculaire" stroke="#387908" />
			</Graph>
		</div>
	);
}
