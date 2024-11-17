import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useAuth } from "contexts/AuthProvider";
import LeftContent from "./LeftContent";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { deleteSession } from "@lib/session";

const MobileHeader = ({ isAuth }: { isAuth: boolean }) => {
	const { user, setUser, setIsAuth } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = async () => {
		deleteSession();
		setUser(null);
		setIsAuth(false);
	};
	return (
		<div className="flex items-center justify-between w-full">
			<div
				style={{
					backgroundColor: "rgba(255, 255, 255, 0.9)",
				}}
				className="w-full fixed top-0 px-8 py-1 z-40 left-0 right-0 flex flex-row items-center justify-between"
			>
				<LeftContent />
				<button
					onClick={toggleMenu}
					className="text-2xl"
				>
					{isMenuOpen ? (
						<Icon icon="material-symbols:close" />
					) : (
						<Icon icon="material-symbols:menu" />
					)}
				</button>
			</div>
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="absolute top-12 left-0 w-full h-screen bg-white  flex flex-col items-center justify-center z-50"
					>
						<div className="flex flex-col items-center justify-center h-full gap-10">
							{isAuth && user ? (
								<>
									<Link
										as={Link}
										href="/messagerie"
										color="primary"
										onClick={toggleMenu}
										className="text-xl font-semibold"
									>
										Messagerie
									</Link>
									<Link
										as={Link}
										href="/profile"
										onClick={toggleMenu}
										className="text-xl font-semibold"
									>
										Mon profil
									</Link>
									<Link
										as={Link}
										color="primary"
										href={
											user?.role?.name === "student"
												? "/student/dashboard"
												: "/coach/dashboard"
										}
										onClick={toggleMenu}
										className="text-xl font-semibold"
									>
										Mon tableau de bord
									</Link>
									<Button
										as={Link}
										href="/auth/logout"
										onClick={handleLogout}
										color="danger"
										className="text-lg font-semibold"
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
										onClick={toggleMenu}
									>
										Connexion
									</Button>
									<Button
										as={Link}
										href="/auth/register"
										variant="flat"
										className="hover:text-white"
										onClick={toggleMenu}
									>
										Inscription
									</Button>
								</>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileHeader;
