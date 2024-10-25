import { ReactNode } from "react";

export default function PanelBox({
	children,
	onPress,
}: {
	children: ReactNode;
	onPress?: () => void;
}) {
	return (
		<button
			className="bg-white/30 backdrop-blur-md border border-default-300 rounded-xl p-14 transition-transform transform hover:scale-105 hover:shadow-lg min-w-80 min-h-56"
			onClick={onPress}
		>
			{children}
		</button>
	);
}