import { Spinner } from "@nextui-org/react";

export default function BlockLoader({ text }: { text?: string }) {
	return (
		<div className="flex items-center justify-center relative mx-auto">
			<div className="flex flex-col items-center justify-center">
				<Spinner />
				<p className="text-gray-500 mt-4">{text ?? "Chargement..."}</p>
			</div>
		</div>
	);
}
