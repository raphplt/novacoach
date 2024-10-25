"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function AdminNavigation() {
	return (
		<div className="flex justify-center space-x-4 mt-4">
			{/* Bouton pour naviguer vers la page des coachs */}
			<Link href="/admin/coach">
				<Button
					style={{ backgroundColor: "#E0F7FA", color: "#00796B" }}
					className="hover:bg-teal-500"
				>
					Gérer les Coachs
				</Button>
			</Link>

			{/* Bouton pour naviguer vers la page des structures */}
			<Link href="/admin/structures">
				<Button
					style={{ backgroundColor: "#E3F2FD", color: "#1976D2" }}
					className="hover:bg-blue-500"
				>
					Gérer les Structures
				</Button>
			</Link>
		</div>
	);
}
