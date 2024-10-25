import { Spinner } from "@nextui-org/react";

export default function PageLoader({ text }: { text: string }) {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-center">
				<Spinner />
				<p className="text-gray-500 mt-4">{text}</p>
			</div>
		</div>
	);
}
