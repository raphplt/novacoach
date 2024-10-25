"use client";

import Link from "next/link";

export default function LeftContent() {
	return (
		<div className="flex items-center">
			<Link href="/">
				<img
					src="/images/novacoach.png"
					alt="Novacoach"
					width={100}
					height={100}
				/>
			</Link>
		</div>
	);
}
