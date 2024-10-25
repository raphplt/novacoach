"use client";
import Image from "next/image";
import { useRegister } from "contexts/RegisterProvider";
import { useRouter } from "next/navigation";

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
		"w-fit flex flex-col items-center justify-center text-lg bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-xl px-20 py-10";

	const boxStyle = "w-1/2 h-full flex items-center justify-center ";

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-row justify-center items-center w-full mx-auto h-screen">
				<div
					className={
						boxStyle + " bg-gradient-to-r from-zinc-800 to-zinc-600"
					}
				>
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
							width={400}
							height={100}
							priority={true}
						/>
					</button>
				</div>
				<div
					className={
						boxStyle + "bg-gradient-to-r from-sky-700 to-sky-900"
					}
				>
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
							alt="Coach"
							width={400}
							height={100}
							priority={true}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}