"use client";

import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Spinner } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import { useEffect, useState } from "react";
import { UserType } from "type/user";

export default function SideBar() {
	const { user } = useAuth();
	const [fetchUrl, setFetchUrl] = useState<string | undefined>();

	// Determine fetch URL based on user's role
	useEffect(() => {
		if (user?.coach?.id) {
			setFetchUrl(`/user/coach/${user.coach.id}`);
		} else if (user?.coachRole?.id) {
			setFetchUrl(`/user/studentsByCoachId/${user.coachRole.id}`);
		}
	}, [user]);

	// Fetch conversation data
	const {
		data: conversations,
		isLoading,
		isError,
	} = useFetchData({
		url: fetchUrl || "",
		enabled: !!fetchUrl,
	});

	// Handle loading and error states
	if (isLoading) {
		return (
			<div className="w-1/6 flex flex-col flex-shrink-0">
				<p className="text-center text-gray-500 text-sm py-4">
					Chargement des conversations...
				</p>
				<Spinner />
			</div>
		);
	}

	if (isError) {
		return <div>Erreur lors du chargement des conversations</div>;
	}

	// Render conversations
	return (
		<div className="w-1/6 flex flex-col flex-shrink-0">
			<div className="px-2">
				<h1 className="text-lg font-bold text-center text-gray-900 py-4">
					Toutes les conversations
				</h1>
			</div>
			{conversations?.data.map((user: UserType) => (
				<a
					key={user.id}
					className="flex items-center justify-start py-2 border-b border-gray-200 gap-2 mx-2"
					href={`/messagerie/conversation/${user.id}`}
				>
					{/* User Avatar */}
					{user.profileImageUrl ? (
						<Avatar
							src={user.profileImageUrl}
							alt="profile"
							size="md"
						/>
					) : (
						<Icon
							icon="bi:person-circle"
							width={20}
						/>
					)}

					{/* User Info */}
					<div className="flex-1">
						<div className="text-sm font-semibold">
							{user.firstName} {user.lastName}
						</div>
						<p className="text-xs text-gray-500">Dernier message</p>
					</div>
				</a>
			))}
		</div>
	);
}