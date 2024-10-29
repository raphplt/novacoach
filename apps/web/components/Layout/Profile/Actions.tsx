"use client";
import ButtonAction from "@components/Common/Buttons/ButtonAction";
import { Icon } from "@iconify/react";
import { deleteSession } from "@lib/session";

export default function UserActions() {
	const handleLogout = async () => {
		deleteSession();
	};

	return (
		<div className="flex items-center justify-center mx-auto">
			<ButtonAction
				label="Déconnexion"
				onClick={handleLogout}
				icon={
					<Icon
						icon="material-symbols:logout"
						color="white"
						width={20}
					/>
				}
				className=" bg-error mt-12 text-md text-white"
			/>
		</div>
	);
}
