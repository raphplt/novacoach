/* eslint-disable @next/next/no-img-element */
"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { deleteSession } from "@lib/session";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
} from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";

export default function RightContent({ isAuth }: { isAuth: boolean }) {
	const { user, setUser, setIsAuth } = useAuth();

	const handleLogout = async () => {
		deleteSession();
		setUser(null);
		setIsAuth(false);
	};
	return (
		<div className="flex items-center gap-4">
			{isAuth && user ? (
				<>
					<Button
						as={Link}
						href="/messagerie"
						color="primary"
						variant="ghost"
						className="font-semibold"
					>
						Messagerie
					</Button>
					{user.coachRole && (
						<Dropdown>
							<DropdownTrigger>
								<Button
									color="primary"
									variant="ghost"
									className="font-semibold hover:text-white"
								>
									Mes programmes
								</Button>
							</DropdownTrigger>

							<DropdownMenu>
								<DropdownItem>
									<Link href="/coach/dashboard/SportProgram">
										Programmes de sport
									</Link>
								</DropdownItem>
								<DropdownItem>
									<Link href="/coach/dashboard/NutritionProgram">
										Programmes de nutrition
									</Link>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}

					<Button
						as={Link}
						color="primary"
						href={
							user?.role?.name === "student"
								? "/student/dashboard"
								: "/coach/dashboard"
						}
						variant="ghost"
						className="font-semibold hover:text-white"
					>
						Mon tableau de bord
					</Button>

					<Dropdown>
						<DropdownTrigger>
							<Button
								color="primary"
								className="text-white"
								startContent={
									user.profileImageUrl ? (
										<Avatar
											src={user.profileImageUrl}
											size="sm"
											className="group-hover:opacity-75 transition-opacity duration-300"
										/>
									) : (
										<Icon
											icon="qlementine-icons:user-16"
											width={20}
										/>
									)
								}
							>
								{user?.firstName} {user?.lastName}
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem>
								<Link href="/profile">Mon profil</Link>
							</DropdownItem>

							<DropdownItem>
								<Button
									onClick={handleLogout}
									href="/logout"
									className="text-red-500"
								>
									Déconnexion
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
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
