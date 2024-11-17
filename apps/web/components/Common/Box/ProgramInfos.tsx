import React from "react";
import { SportProgramType } from "type/sportProgram";
import { NutritionProgramType } from "type/nutritionProgram";

type ProgramProps = {
	program: SportProgramType | NutritionProgramType | null;
	isSportProgram: boolean;
};

const ProgramInfos: React.FC<ProgramProps> = ({
	program: programme,
	isSportProgram,
}) => {
	return (
		<>
			{programme ? (
				<div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
					<h2 className="text-2xl font-bold mb-4 text-gray-700">
						Programme : {programme.name}
					</h2>
					<p className="text-gray-600 mb-2">
						<strong>Durée:</strong> {programme.duration} minutes
					</p>
					<p className="text-gray-600 mb-2">
						<strong>Fréquence:</strong> {programme.frequency} fois
						par semaine
					</p>
					{isSportProgram && (
						<>
							<p className="text-gray-600 mb-2">
								<strong>Difficulté:</strong>{" "}
								{(programme as SportProgramType).difficulty}
							</p>
						</>
					)}
				</div>
			) : (
				<p className="text-center text-gray-600">Chargement...</p>
			)}
		</>
	);
};

export default ProgramInfos;
