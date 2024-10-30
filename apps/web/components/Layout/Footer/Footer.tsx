"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
	const pathname = usePathname();

	if (pathname.startsWith("/messagerie") || pathname.startsWith("/auth"))
		return null;

	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 className="text-lg font-bold mb-4">Entreprise</h3>
					<ul>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								À propos de nous
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Carrières
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Presse
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-bold mb-4">Support</h3>
					<ul>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Centre d'aide
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Contactez-nous
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Politique de confidentialité
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
					<ul>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Facebook
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Twitter
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline"
							>
								Instagram
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="text-center mt-8">
				<p>
					&copy; {new Date().getFullYear()} Novacoach. Tous droits
					réservés.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
