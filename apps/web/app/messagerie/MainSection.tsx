"use client";

import PageLoader from "@components/Common/Loaders/PageLoader";
import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";
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
		return <PageLoader text="Chargement des conversations" />;
	}

	if (isLoading) {
		return <PageLoader text="Chargement des conversations" />;
	}

	if (isError) {
		return <div>Erreur lors du chargement des élèves</div>;
	}

	return (
		<div className="w-10/12 mx-auto">
			<h1 className="text-xl font-semibold mb-4">Mes conversations</h1>
			<section className="flex flex-col  w-2/3 mx-auto h-full">
				{Object.keys(students).length > 0 ? (
					students.map((student) => (
						<a
							key={student.id}
							className="flex items-center py-2 border-b border-gray-200 gap-2 hover:bg-gray-100 rounded-lg px-2"
							href={`messagerie/conversation/${student.id}`}
						>
							{student.profileImageUrl ? (
								<Avatar
									src={student.profileImageUrl}
									alt="profile"
									size="md"
								/>
							) : (
								<Icon
									icon="codicon:account"
									className="w-8 h-8"
								/>
							)}
							{student.firstName} {student.lastName}
						</a>
					))
				) : (
					<div className="text-center text-gray-500">
						Vous n'avez encore de coach ou d'élève.
					</div>
				)}
			</section>
		</div>
	);
}
