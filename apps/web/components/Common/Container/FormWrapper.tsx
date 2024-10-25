import Image from "next/image";

export default function FormWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-row items-center justify-center w-full h-screen">
			<Image
				src={"/images/fitness.jpg"}
				alt="Form"
				width={1920}
				height={1275}
				priority={true}
				className="flex-1 h-full w-1/2 object-cover"
			/>
			{children}
		</div>
	);
}
