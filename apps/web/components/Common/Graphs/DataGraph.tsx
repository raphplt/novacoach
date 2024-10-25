"use client";
import { useAuth } from "contexts/AuthProvider";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import BlockLoader from "../Loaders/BlockLoader";

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
		return <BlockLoader text="Chargement des données..." />;

	// Transform the data
	const data = userDetails.heights.map((height, index) => ({
		name: new Date(height.date).toLocaleDateString(),
		height: height.value,
		weight: userDetails.weights[index]?.value,
		fatMass: userDetails.fatMasses[index]?.value,
		bmi: userDetails.bmis[index]?.value,
		muscleMass: userDetails.muscleMasses[index]?.value,
	}));

	const pageWidth = window.innerWidth;

	return (
		<div className="flex-1 w-full">
			<h2 className="text-center text-2xl font-bold py-3">Évolution</h2>
			<LineChart
				width={pageWidth > 768 ? pageWidth - 100 : pageWidth}
				height={pageWidth > 768 ? 400 : 200}
				data={data}
				className="w-full rounded-2xl p-3 mx-auto bg-white/30 backdrop-blur-md shadow-lg"
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="height"
					stroke="#8884d8"
				/>
				<Line
					type="monotone"
					dataKey="weight"
					stroke="#82ca9d"
				/>
				<Line
					type="monotone"
					dataKey="fatMass"
					stroke="#ffc658"
				/>
				<Line
					type="monotone"
					dataKey="bmi"
					stroke="#ff7300"
				/>
				<Line
					type="monotone"
					dataKey="muscleMass"
					stroke="#387908"
				/>
			</LineChart>
		</div>
	);
}
