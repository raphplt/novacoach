"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import PanelBox from "@components/Common/Box/PanelBox";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserType } from "type/user";
import { useAuth } from "contexts/AuthProvider";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardStudents() {
	const router = useRouter();
	const { user } = useAuth();

	const [students, setStudents] = useState<UserType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchStudents = async () => {
			if (user && user.coachRole?.id) {
				setIsLoading(true);
				try {
					const response = await axios.get(
						`${baseUrl}/user/studentsByCoachId/${user.coachRole.id}`,
					);
					setStudents(response.data);
				} catch (error) {
					console.error("Error fetching students:", error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchStudents();
	}, [user]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<PanelBox
			className="flex justify-center items-center"
			onPress={() => router.push("/coach/dashboard/students")}
			disable={!students.length}
		>
			<Icon
				icon="mdi:account-group"
				width={24}
			/>
			<h2 className="font-semibold text-xl text-center">Élèves</h2>
		</PanelBox>
	);
}
