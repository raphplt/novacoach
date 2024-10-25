import Table from "./Table";

export default function Page() {
	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-bold text-center mb-8 mt-12">
				Mes invitations
			</h1>
			<Table />
		</div>
	);
}
