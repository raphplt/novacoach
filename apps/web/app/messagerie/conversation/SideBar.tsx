"use client";

import useFetchData from "@hooks/useFetchData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import { useEffect, useState } from "react";
import { UserType } from "type/user";

export default function SideBar() {
	const { user } = useAuth();
	const [users, setUsers] = useState<UserType[]>([]);
	const [fetchUrl, setFetchUrl] = useState<string | undefined>();

	useEffect(() => {
		if (user?.coach?.id) {
			setFetchUrl(`/user/coach/${user.coach.id}`);
		} else if (user?.coachRole?.id) {
			setFetchUrl(`/user/studentsByCoachId/${user.coachRole.id}`);
		}
	}, [user]);

	const {
		data: conversations,
		isLoading,
		isError,
	} = useFetchData({
		url: fetchUrl || "",
		enabled: !!fetchUrl,
	});

	useEffect(() => {
		if (conversations) {
			if (user?.coachRole?.id) {
				setUsers(conversations.data as UserType[]);
			} else {
				setUsers([conversations.data.user] as UserType[]);
			}
		}
	}, [conversations]);

	if (isLoading) {
		return <div>Chargement...</div>;
	}

	if (isError) {
		return <div>Erreur lors du chargement des conversations</div>;
	}

	return (
		<div className="w-1/6 flex flex-col flex-shrink-00">
			<div className=" px-2">
				<h1 className="text-lg font-bold text-center text-gray-900 py-4">
					Toutes les conversations
				</h1>
			</div>
			{users.map((user) => (
				<a
					key={user.id}
					className="flex items-center justify-start py-2 border-b border-gray-200 gap-2 mx-2"
					href={`/messagerie/conversation/${user.id}`}
				>
					{user.profileImageUrl ? (
						<Avatar
							src={user.profileImageUrl}
							alt="profile"
							size="md"
						/>
					) : (
						<Icon
							icon="codicon:account"
							className="text-green-500"
						/>
					)}
					<div className="flex-1">
						<div className="text-sm font-semibold">
							{user.firstName} {user.lastName}
						</div>
						<div className="text-xs text-gray-500">
							Dernier message
						</div>
					</div>
				</a>
			))}
		</div>
	);
}
