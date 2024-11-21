// LastDays.tsx
import axios from "axios";
import { useAuth } from "contexts/AuthProvider";
import React, { useEffect, useState } from "react";

interface UserTrackProgram {
	id: number;
	startDate: string;
	endDate: string;
	iteration: number;
	levelDifficulty: number;
	commentaire: string;
}

const LastDays = () => {
	const { user } = useAuth();
	const [trackPrograms, setTrackPrograms] = useState<UserTrackProgram[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTrackPrograms = async () => {
			try {
				const userId = user?.id;
				const response = await axios.get<UserTrackProgram[]>(
					`${process.env.NEXT_PUBLIC_API_URL}/userTrackPrograms/last7Days/${userId}`,
				);
				setTrackPrograms(response.data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des programmes de suivi :",
					error,
				);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchTrackPrograms();
		}
	}, [user]);

	if (loading) {
		return <div>Chargement...</div>;
	}

	const isDateTracked = (date: Date) => {
		return trackPrograms.some(
			(program) =>
				new Date(program.startDate).toLocaleDateString() ===
				date.toLocaleDateString(),
		);
	};

	const getLast7Days = () => {
		const days = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			days.push(date);
		}
		return days.reverse(); // Reverse to show the most recent date first
	};

	return (
		<div className="mt-4 w-fit mx-auto">
			<h2 className="text-2xl font-bold mb-4 py-5 ">
				Séances des 7 derniers jours
			</h2>
			<ul className="flex flex-wrap items-center justify-start mx-auto gap-5">
				{getLast7Days().map((date) => (
					<li
						key={date.toISOString()}
						className="mb-2"
					>
						<label className="flex flex-col items-center space-y-3 p-2 rounded-lg border">
							<input
								type="checkbox"
								checked={isDateTracked(date)}
								readOnly
								className="form-checkbox h-5 w-5 text-blue-600"
							/>
							<span className="text-gray-700">
								{date.toLocaleDateString()}
							</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LastDays;
