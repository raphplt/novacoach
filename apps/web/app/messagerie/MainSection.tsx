"use client";

import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "contexts/AuthProvider";
import { useEffect, useState } from "react";
import { UserType } from "type/user";

export default function MainSection() {
	const { user } = useAuth();
	const [students, setStudents] = useState<UserType[]>([]);
	const [fetchUrl, setFetchUrl] = useState<string | undefined>();

	useEffect(() => {
		if (user?.coach?.id) {
			setFetchUrl(`/user/coach/${user.coach.id}`);
		} else if (user?.coachRole?.id) {
			setFetchUrl(`/user/studentsByCoachId/${user.coachRole.id}`);
		}
	}, [user]);

	const {
		data: studentsData,
		isLoading,
		isError,
	} = useFetchData({
		url: fetchUrl || "",
		enabled: !!fetchUrl,
	});

	useEffect(() => {
		if (studentsData) {
			if (user?.coachRole?.id) {
				setStudents(studentsData.data as UserType[]);
			} else {
				setStudents([studentsData.data.user] as UserType[]);
			}
		}
	}, [studentsData]);

	if (!user) {
		return <div>Chargement...</div>;
	}

	if (isLoading) {
		return <div>Chargement des élèves...</div>;
	}

	if (isError) {
		return <div>Erreur lors du chargement des élèves</div>;
	}

	console.log(students);
	console.log("user", user);

	return (
		<div className="w-10/12 mx-auto">
			<h1 className="text-xl font-semibold mb-4">Section principale</h1>
			{Object.keys(students).length > 0 ? (
				students.map((student) => (
					<a
						key={student.id}
						className="flex items-center py-2 border-b border-gray-200 gap-2"
						href={`messagerie/conversation/${student.id}`}
					>
						<Icon
							icon="codicon:account"
							className="text-green-500"
						/>
						{student.firstName} {student.lastName}
					</a>
				))
			) : (
				<div className="text-center text-gray-500">
					Vous n'avez encore de coach ou d'élève.
				</div>
			)}
		</div>
	);
}
