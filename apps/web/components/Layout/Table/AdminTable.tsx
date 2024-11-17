"use client";

import { Table } from "@nextui-org/react";

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
}

interface AdminTableProps {
	data: User[];
}

const AdminTable: React.FC<AdminTableProps> = ({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Email</th>
					<th>Rôle</th>
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.role}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AdminTable;
