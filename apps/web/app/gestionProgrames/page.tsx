"use client";
import React from "react";
import MaStructure from "../../components/Layout/Dashboard/MaStructure";

export default function Home() {
	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<label className="text-lg font-semibold text-gray-700">
					page de gestion des programmes
					<MaStructure />
				</label>
			</div>
		</>
	);
}
