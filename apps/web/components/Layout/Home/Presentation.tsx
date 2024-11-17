import Image from "next/image";
import React from "react";

const Presentation = () => {
	return (
		<div
			className="flex flex-col gap-3"
			id="presentation"
		>
			<div className="flex flex-row items-center justify-around">
				<div className="flex-1 flex flex-col items-center justify-center gap-2">
					<Image
						src="/images/illustrations/home1.png"
						alt="Personal trainer"
						width={500}
						height={500}
					/>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center gap-5">
					<h2 className="text-2xl font-bold text-center">
						Qu'est ce que Novacoach ?
					</h2>
					<p className="w-2/3 mx-auto text-center">
						NovaCoach est la plateforme ultime pour les coachs
						sportifs qui veulent libérer leur potentiel et celui de
						leurs clients. Pensée pour simplifier et optimiser
						chaque aspect du coaching, NovaCoach centralise toutes
						les fonctions essentielles : création de programmes
						d'entraînement sur-mesure, suivi nutritionnel, et
						communication fluide avec les clients. Fini le temps
						perdu à jongler entre plusieurs outils — avec NovaCoach,
						tout est à portée de main, dans un espace sécurisé et
						intuitif.la nutrition et les élèves au même endroit.
					</p>
				</div>
			</div>
			<div className="flex flex-row justify-around items-center">
				<div className="flex-1 flex flex-col items-center justify-center gap-5">
					<h2 className="text-2xl font-bold text-center">
						Comment ça fonctionne ?
					</h2>
					<p className="w-2/3 mx-auto text-center">
						NovaCoach est conçu pour vous offrir une expérience de
						coaching ultra-efficace. Depuis un tableau de bord
						complet, créez des programmes personnalisés, suivez les
						progrès de vos clients grâce à des graphiques clairs et
						motivants, et communiquez en direct avec eux via un chat
						intégré. Avec une architecture performante et des normes
						de sécurité renforcées, NovaCoach vous permet de vous
						concentrer sur l’essentiel : l’accompagnement et la
						réussite de vos clients, en toute sérénité.
					</p>
				</div>
				<div className="flex-1 flex flex-col items-center justify-center gap-2">
					<Image
						src="/images/illustrations/home2.png"
						alt="Personal trainer"
						width={500}
						height={500}
					/>
				</div>
			</div>
			<div className="flex flex-row justify-around items-center">
				<div className="flex-1 flex flex-col items-center justify-center gap-2">
					<Image
						src="/images/illustrations/home3.png"
						alt="Personal trainer"
						width={500}
						height={500}
					/>
				</div>
				<div className="flex-1 flex flex-col items-center justify-center gap-5">
					<h2 className="text-2xl font-bold text-center">
						À qui s'adresse NovaCoach ?
					</h2>
					<p className="w-2/3 mx-auto text-center">
						NovaCoach s'adresse aux coachs indépendants et
						passionnés de performance, qu'ils soient spécialisés en
						fitness, nutrition ou préparation physique. Notre
						plateforme répond aux besoins des coachs qui souhaitent
						offrir un suivi complet et personnalisé, tout en
						optimisant leur temps. Grâce à NovaCoach, vous pouvez
						vous démarquer, fidéliser vos clients et leur offrir une
						expérience inégalée.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Presentation;
