import { Button } from "@nextui-org/react";

export default function ButtonAction({
	label,
	onClick,
	disabled = false,
	color = "primary",
	icon,
	...props
}: {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	color?: "default" | "primary" | "secondary" | "success" | "warning";
	icon?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<>
			<Button
				onClick={onClick}
				disabled={disabled}
				color={color}
				startContent={icon}
				{...props}
			>
				{label}
			</Button>
		</>
	);
}
