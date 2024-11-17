import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import React from "react";

const ContactUs = () => {
	return (
		<section className="py-20">
			<div className="flex flex-col items-center justify-center gap-5 w-1/2 mx-auto">
				<h2 className="text-center text-2xl font-bold text-default-900 py-10 w-1/2 mx-auto">
					Vous avez des questions ? Vous souhaitez en savoir plus sur
					NovaCoach ? Contactez-nous dès maintenant !
				</h2>

				<div className="flex flex-row gap-3 items-center w-full">
					<Input
						type="email"
						placeholder="Votre adresse email"
						className="gap-1 "
					/>
					<Button
						color="primary"
						className="text-white"
					>
						Envoyer
						<Icon
							icon="material-symbols:send"
							width={30}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
