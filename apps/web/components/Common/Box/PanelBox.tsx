import { ReactNode } from "react";

interface PanelBoxProps {
	children: ReactNode;
	onPress?: () => void;
	className?: string;
	disable?: boolean;
}

export default function PanelBox({
	children,
	onPress,
	className = "",
	disable = false,
}: PanelBoxProps) {
	return (
		<button
			className={` hover:bg-redLight backdrop-blur-md flex flex-col items-center
            justify-center gap-2 border rounded-xl p-10
            transform hover:scale-105 hover:shadow-lg w-11/12 h-28 sm:w-80 sm:min-h-56 transition-all duration-300 ease-in-out ${className}`}
			onClick={onPress}
			disabled={disable}
			style={{
				transition:
					"background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
			}}
			aria-label={onPress ? "Cliquez pour accéder" : undefined}
		>
			{children}
		</button>
	);
}