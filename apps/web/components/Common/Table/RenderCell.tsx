import { Button, TableCell } from "@nextui-org/react";
import { ColumnHeaderProps } from "./DataTable";

export default function renderCell({
	data,
	column,
}: {
	data: any;
	column: ColumnHeaderProps;
}) {
	const cellValue = data[column.key];

	switch (column.key) {
		case "actions":
			return (
				<div>
					<Button>Modifier</Button>
					<Button>Supprimer</Button>
				</div>
			);
		default:
			return String(cellValue);
	}
}
