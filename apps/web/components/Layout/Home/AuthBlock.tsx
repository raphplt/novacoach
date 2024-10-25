"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function AuthBlock() {
	return (
		<div className="flex flex-col items-center justify-center mt-4 gap-10 w-full">
			<Button
				as={Link}
				href="/auth/login"
				className=" text-white w-64"
				color="primary"
				size="lg"
			>
				J'ai déjà un compte
			</Button>

			<Button
				as={Link}
				className="w-64"
				href="/auth/register"
				size="lg"
			>
				Je n'ai pas de compte
			</Button>
		</div>
	);
}
