"use client";
import ButtonAction from "@components/Common/Buttons/ButtonAction";
import { Icon } from "@iconify/react/dist/iconify.js";
import { deleteSession } from "@lib/session";
import { useAuth } from "contexts/AuthProvider";

export default function UserActions() {

	const { setUser, setIsAuth } = useAuth();

	const handleLogout = async () => {
		deleteSession();
		setUser(null);
		setIsAuth(false);
	};

	const { loading } = useAuth();

	if (loading) return null;

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
