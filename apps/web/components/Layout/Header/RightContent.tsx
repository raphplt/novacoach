"use client";
import { deleteSession } from "@lib/session";
import { Button, Link } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";

export default function RightContent({ isAuth }: { isAuth: boolean }) {

	const { user, setUser } = useAuth();

	const handleLogout = () => {
		deleteSession();
		setUser(null);
	};

	if (!user) return null;

	return (
		<div className="flex items-center gap-4">
			{isAuth ? (
				<>
					<Button
						as={Link}
						href="/messagerie"
					>
						Messagerie
					</Button>
					<Button
						as={Link}
						href="/profile"
						variant="ghost"
					>
						Mon profil
					</Button>
					<Button
						as={Link}
						href={
							user?.role?.name === "student"
								? "/student/dashboard"
								: "/coach/dashboard"
						}
						variant="ghost"
					>
						Mon tableau de bord
					</Button>
					<Button
						href="/auth/logout"
						color="primary"
						variant="flat"
						onPress={handleLogout}
					>
						Déconnexion
					</Button>
				</>
			) : (
				<>
					<Button
						as={Link}
						href="/auth/login"
						color="primary"
						className="text-white"
					>
						Connexion
					</Button>
					<Button
						as={Link}
						href="/auth/register"
						variant="flat"
						className=" hover:text-white"
					>
						Inscription
					</Button>
				</>
			)}
		</div>
	);
}
