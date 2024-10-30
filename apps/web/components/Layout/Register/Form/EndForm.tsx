import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function EndForm() {
	const router = useRouter();
	const goToHome = () => {
		router.push("/coach/dashboard");
	};
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen">
			<h1 className="text-3xl font-bold text-center my-5">
				Félicitations, vous êtes inscrit sur Novacoach. Vous allez
				recevoir un email de confirmation.
			</h1>

			<p className="text-center">
				En attendant, vous pouvez continuer à naviguer sur le site.
			</p>

			<Button
				color="secondary"
				className="mt-5 text-white"
				onClick={goToHome}
			>
				Découvrir Novacoach
			</Button>
		</div>
	);
}
