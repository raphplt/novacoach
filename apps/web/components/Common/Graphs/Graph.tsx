"use client";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import React, {ReactNode} from "react";

interface DataPoint {
	name: string;
	height?: number;
	weight?: number;
	fatMass?: number;
	bmi?: number;
	muscleMass?: number;
}

interface GraphProps {
	data: DataPoint[];
	children: ReactNode;
	width: number;
	height: number;
	unit: string;
}


export default function Graph({data, height, width, unit, children}:GraphProps)
{
	return (
		<LineChart
			width={width}
			height={height}
			data={data}
			className="rounded-2xl p-3 mx-auto bg-white/30 backdrop-blur-md shadow-lg"
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis tickFormatter={(value) => `${value}${unit}`} />
			<Tooltip 
				formatter={(value, name) => [`${value}${unit}`, name.toString().replace(/_/g, ' ')]}
			/>
			<Legend formatter={(value) => value.replace(/_/g, ' ')}/>
			{children}
		</LineChart>
	);
};