import ContactUs from "@components/Layout/Home/ContactUs";
import Medias from "@components/Layout/Home/Medias";
import Presentation from "@components/Layout/Home/Presentation";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import Metadata from "./metadata";

export default function Home() {
	return (
		<>
			<Metadata />
			<main className="flex flex-col min-h-screen">
				<div className="flex flex-col items-center justify-around flex-grow h-screen">
					<div className="flex flex-col items-center justify-center gap-10 pt-20">
						<Image
							src="/images/laptop.png"
							alt="Un écran d'ordinateur affichant des outils de gestion"
							priority
							width={400}
							height={400}
							className="absolute bottom-1/3 right-10 z-0 "
						/>

						<h1 className="text-7xl font-bold text-center z-10">
							Programmes, nutrition, élèves
						</h1>
						<h2 className="text-7xl font-bold text-default-500 text-center z-10">
							au même endroit
						</h2>
						<h3 className="text-lg font-semibold text-default-500 text-center z-10">
							Gérez efficacement votre structure et gagnez en
							productivité
						</h3>
						<Button
							as={Link}
							color="primary"
							aria-label="Je me lance"
							size="lg"
							className="text-white"
							href="/auth/register"
						>
							Je me lance
						</Button>
					</div>
					<Medias />
				</div>
				<Presentation />
				<ContactUs />
			</main>
		</>
	);
}