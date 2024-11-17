"use client";
import Image from "next/image";
import { useRegister } from "contexts/RegisterProvider";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

export default function ChoiceBlock() {
	const router = useRouter();
	const { setRole } = useRegister();

	const handleClick = ({
		link,
		role,
	}: {
		link: string;
		role: "coach" | "student";
	}) => {
		setRole(role);
		router.push(link);
	};

	const buttonStyle =
		"w-full flex flex-col items-center justify-center text-lg hover:bg-primary backdrop-blur-sm rounded-xl border hover:text-white px-14 py-8 transition duration-300 ease-in-out";

	const boxStyle = "flex-1 flex items-center justify-center w-1/2";

	return (
		<div className="flex flex-col items-center justify-evenly gap-20 w-full min-h-screen pb-16">
			<div className="flex flex-col items-center justify-center gap-10">
				<Image
					src="/images/novacoach.png"
					alt="Logo"
					width={200}
					height={200}
					priority={true}
				/>
				<h1 className="text-4xl font-bold text-center">
					Choisissez votre rôle pour continuer votre inscription
				</h1>
				<p className="text-lg text-center text-default-700 w-1/2 mx-auto">
					En tant que coach, vous pourrez proposer vos services de
					coaching et accompagner des élèves dans leur progression. Et
					en tant qu'élève, vous pourrez trouver un coach qui répondra
					à vos besoins.
				</p>
			</div>
			<div className="flex flex-row justify-center items-center w-8/12 mx-auto gap-10">
				<div className={boxStyle}>
					<button
						onClick={() =>
							handleClick({
								link: "/auth/register/coach",
								role: "coach",
							})
						}
						className={buttonStyle}
					>
						<div className="text-xl font-bold">
							Je suis un coach
						</div>
						<Image
							src="/images/illustrations/coach.png"
							alt="Coach"
							width={200}
							height={100}
							priority={true}
						/>
					</button>
				</div>
				<div className={boxStyle}>
					<button
						onClick={() =>
							handleClick({
								link: "/auth/register/student",
								role: "student",
							})
						}
						className={buttonStyle}
					>
						<div className="text-xl font-bold">
							Je suis un élève
						</div>
						<Image
							src="/images/illustrations/student.png"
							alt="Student"
							width={200}
							height={100}
							priority={true}
						/>
					</button>
				</div>
			</div>
			<Link
				href="/auth/login"
				className="text-primary hover:text-secondary"
			>
				J'ai déjà un compte
			</Link>
		</div>
	);
}
