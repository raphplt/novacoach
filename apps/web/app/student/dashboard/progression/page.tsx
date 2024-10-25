import DataGraph from "@components/Common/Graphs/DataGraph";

export default function Page() {
	return (
		<div className="min-h-screen">
			<h1 className="pt-20 text-center font-bold text-2xl">
				Progression
			</h1>
			<DataGraph />
		</div>
	);
}
