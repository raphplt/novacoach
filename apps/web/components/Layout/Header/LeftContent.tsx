import Image from "next/image";
import Link from "next/link";

export default function LeftContent() {
	return (
		<Link
			href="/"
			className="cursor-pointer"
		>
			<Image
				src="/images/novacoach.png"
				alt="Novacoach"
				width={200}
				height={200}
				className="w-24"
			/>
		</Link>
	);
}
