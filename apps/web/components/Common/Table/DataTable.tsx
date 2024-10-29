import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Spinner,
} from "@nextui-org/react";

export type ColumnHeaderProps = {
	key: string;
	label: string;
	sortable?: boolean;
};

export type DataTableProps = {
	name: string;
	columnsHeaders: ColumnHeaderProps[];
	rows: any[];
	isLoading: boolean;
	renderCell?: (data: any, columnKey: string) => React.ReactNode;
};

export default function DataTable({
	name,
	columnsHeaders,
	rows,
	isLoading,
	renderCell,
}: DataTableProps) {
	return (
		<Table
			selectionMode="multiple"
			aria-label={"Table " + name}
		>
			<TableHeader columns={columnsHeaders}>
				{(column) => (
					<TableColumn
						key={column.key}
						allowsSorting={column.sortable}
					>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				emptyContent="Aucune donnée trouvée"
				items={rows}
				loadingContent={<Spinner />}
				isLoading={isLoading}
			>
				{(row) => (
					<TableRow key={row.id}>
						{(columnKey: any) => (
							<TableCell key={columnKey}>
								{renderCell
									? renderCell(row, columnKey)
									: row[columnKey]}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
