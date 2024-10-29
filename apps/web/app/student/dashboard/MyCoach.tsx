"use client";
import PanelBox from "@/components/Common/Box/PanelBox";
import { useAuth } from "contexts/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "type/user";

export default function MyCoach() {
	const { user } = useAuth();
	const [coach, setCoach] = useState<UserType>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError]: any = useState(null);

	useEffect(() => {
		if (!user?.coach) {
			setIsLoading(false);
			return;
		}

		const fetchCoach = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/coach/${user.coach?.id}`,
				);
				if (!response.data) {
					setIsLoading(false);
					return;
				}
				setCoach(response.data.coach.user);
				setIsLoading(false);
			} catch (err) {
				setIsError(true);
				setError(err);
				setIsLoading(false);
			}
		};

		fetchCoach();
	}, [user?.coach?.id]);

	if (!user) return null;

	if (!user?.coach) {
		return (
			<PanelBox>
				<p>Vous n'avez pas encore de coach</p>
			</PanelBox>
		);
	}

	if (isLoading) {
		return <PanelBox>Loading...</PanelBox>;
	}
	if (isError) {
		return <PanelBox>Error: {error?.message}</PanelBox>;
	}

	return (
		<PanelBox>
			<div>
				<h1>Mon coach</h1>
				{coach && (
					<div>
						<p className="text-lg font-semibold">
							{coach?.firstName} {coach.lastName}
						</p>
					</div>
				)}
			</div>
		</PanelBox>
	);
}
