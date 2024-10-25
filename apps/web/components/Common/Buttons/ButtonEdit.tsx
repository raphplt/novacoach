import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";

export default function ButtonEdit({
	width = 18,
	editMode,
	setEditMode,
}: {
	width?: number;
	editMode: boolean;
	setEditMode: (edit: boolean) => void;
}) {
	return (
		<Button
			isIconOnly
			onClick={() => setEditMode(!editMode)}
		>
			<Icon
				icon={
					editMode
						? "material-symbols:edit-off"
						: "material-symbols:edit"
				}
				color="#000"
				width={width}
			/>
		</Button>
	);
}
