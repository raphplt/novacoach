"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserType } from "type/user";
import useFetchData from "@hooks/useFetchData";

const UserProfile = () => {
	const { id: userId } = useParams();
	const [user, setUser] = useState<UserType | null>(null);

	const { data: userData } = useFetchData({
		url: userId ? `/users/${userId}` : "",
		enabled: !!userId,
	});

	useEffect(() => {
		if (userData) {
			setUser(userData.data as UserType);
		}
	}, [userData]);

	console.log(user);

	if (!user) return <div className="text-center mt-4">Loading...</div>;

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-gray-200 mt-5">
				<h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
					User Profile
				</h2>

				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">Name:</span>{" "}
					{user.firstName} {user.lastName}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Email:
					</span>{" "}
					{user.email}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Phone:
					</span>{" "}
					{user.phone}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">
						Address:
					</span>{" "}
					{user.address}
				</p>
				<p className="mb-4 text-gray-700">
					<span className="font-semibold text-indigo-500">Role:</span>{" "}
					{user.role?.name}
				</p>

				{user.coachRole && (
					<p className="mb-4 text-gray-700">
						<span className="font-semibold text-indigo-500">
							Coach Role:
						</span>{" "}
						{user.coachRole.description}
					</p>
				)}

				{user.structure && (
					<div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
						<h3 className="text-xl font-semibold text-indigo-600 mb-2">
							Structure Details
						</h3>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Name:</span>{" "}
							{user.structure.name}
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Description:</span>{" "}
							{user.structure.description}
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Address:</span>{" "}
							{user.structure.address}
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Phone:</span>{" "}
							{user.structure.phone}
						</p>
					</div>
				)}

				{user.userDetails && (
					<div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
						<h3 className="text-xl font-semibold text-indigo-600 mb-2">
							Physical Details
						</h3>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Height:</span>{" "}
							{user.userDetails.heights[0]?.value} cm
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Weight:</span>{" "}
							{user.userDetails.weights[0]?.value} kg
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">BMI:</span>{" "}
							{user.userDetails.bmis[0]?.value}
						</p>
						<p className="mb-2 text-gray-700">
							<span className="font-semibold">Muscle Mass:</span>{" "}
							{user.userDetails.muscleMasses[0]?.value} kg
						</p>
					</div>
				)}

				{user.userSportPrograms &&
					user.userSportPrograms.length > 0 && (
						<div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
							<h3 className="text-xl font-semibold text-indigo-600 mb-2">
								Sport Programs
							</h3>

							{user.userSportPrograms.map((program, index) => (
								<div
									key={index}
									className="mb-4"
								>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											Program Name:
										</span>{" "}
										{program.sportProgram.name}
									</p>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											Difficulty:
										</span>{" "}
										{program.sportProgram.difficulty}
									</p>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											Frequency:
										</span>{" "}
										{program.sportProgram.frequency}{" "}
										sessions/week
									</p>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											Duration:
										</span>{" "}
										{program.sportProgram.duration} days
									</p>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											Start Date:
										</span>{" "}
										{new Date(
											program.startDate,
										).toLocaleDateString()}
									</p>
									<p className="mb-2 text-gray-700">
										<span className="font-semibold">
											End Date:
										</span>{" "}
										{new Date(
											program.endDate,
										).toLocaleDateString()}
									</p>
								</div>
							))}
						</div>
					)}
			</div>
		</div>
	);
};

export default UserProfile;
