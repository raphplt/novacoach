"use client";
import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { UserType } from "type/user";

const Page = () => {
	const { user } = useAuth();
	const [students, setStudents] = useState<UserType[]>([]);
	const [coachId, setCoachId] = useState<number | undefined>();
	const [showModal, setShowModal] = useState<boolean>(false); // État pour afficher la modale
	const [modalContent, setModalContent] = useState<string>(""); // Contenu de la modale

	useEffect(() => {
		if (user?.coachRole?.id) {
			setCoachId(user.coachRole?.id);
		}
	}, [user]);

	const {
		data: studentsData,
		isLoading,
		isError,
	} = useFetchData({
		url: `/user/studentsByCoachId/${coachId}`,
		enabled: !!coachId,
	});

	useEffect(() => {
		if (studentsData) {
			setStudents(studentsData.data as any);
		}
	}, [studentsData]);

	const handleButtonClick = (program: string) => {
		setModalContent(program);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="container mx-auto p-6">
			{/* Section Title */}
			<h2 className="text-4xl font-extrabold text-gray-900 mt-6 text-center">
				Liste des élèves
			</h2>

			{/* Students Table */}
			<div className="mt-10 overflow-x-auto">
				<table className="table-auto w-full text-left border-collapse">
					<thead>
						<tr className="bg-indigo-600 text-white">
							<th className="px-4 py-2 text-center">Nom</th>
							<th className="px-4 py-2 text-center">Mass (kg)</th>
							<th className="px-4 py-2 text-center">
								Muscle Mass (kg)
							</th>
							<th className="px-4 py-2 text-center">
								Height (cm)
							</th>
							<th className="px-4 py-2 text-center">
								Fat Mass (%)
							</th>
							<th className="px-4 py-2 text-center">BMI</th>
							<th className="px-4 py-2 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{students.length === 0 ? (
							<tr>
								<td
									colSpan={7}
									className="text-center text-gray-600 py-4"
								>
									Aucun élève trouvé.
								</td>
							</tr>
						) : (
							students.map((student) => (
								<tr
									key={student.id}
									className="bg-white border-b hover:bg-gray-100 transition-colors"
								>
									<td className="px-4 py-2 text-center align-middle text-indigo-600 font-semibold">
										{student.firstName} {student.lastName}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{Number(
											student.userDetails?.mass || 0,
										).toFixed(2)}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{Number(
											student.userDetails?.muscleMass ||
												0,
										).toFixed(2)}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{Number(
											student.userDetails?.height || 0,
										).toFixed(2)}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{Number(
											student.userDetails?.fatMass || 0,
										).toFixed(2)}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										{Number(
											student.userDetails?.bmi || 0,
										).toFixed(2)}
									</td>
									<td className="px-4 py-2 text-center align-middle">
										<button
											onClick={() =>
												handleButtonClick(
													"Nutrition Program",
												)
											}
											className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
										>
											Nutrition Program
										</button>
										<button
											onClick={() =>
												handleButtonClick(
													"Sport Program",
												)
											}
											className="bg-indigo-600 text-white px-4 py-2 ml-1 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
										>
											Sport Program
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
						<h3 className="text-2xl font-semibold mb-4">
							{modalContent}
						</h3>
						<p className="text-gray-700">Not implemented</p>
						<button
							onClick={closeModal}
							className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page;
