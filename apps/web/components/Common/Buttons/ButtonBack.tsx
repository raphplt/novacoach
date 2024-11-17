import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const ButtonBack = ({ href }: { href: string }) => {
	return (
		<div className="pt-5 flex flex-row items-center justify-center gap-2">
			<Link
				href={href}
				className=" mb-6 text-center text-gray-800"
			>
				<Icon
					icon="akar-icons:arrow-left"
					className="inline-block mr-2"
				/>
				Retour
			</Link>
		</div>
	);
};

export default ButtonBack;
