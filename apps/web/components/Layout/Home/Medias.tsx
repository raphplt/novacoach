"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const images = [
	"/images/medias/TF1.png",
	"/images/medias/Lequipe.png",
	"/images/medias/Cnews.png",
	"/images/medias/Rmc.png",
];

const Medias = () => {
	const logosRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (logosRef.current) {
			const ul = logosRef.current;
			ul.insertAdjacentHTML("afterend", ul.outerHTML);
			(ul.nextSibling as Element)?.setAttribute("aria-hidden", "true");
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-full overflow-hidden">
			<h2 className="text-lg font-bold text-center text-default-500 pb-10">
				Ils parlent de nous
			</h2>
			<div className="overflow-hidden w-full relative">
				<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
					<ul
						ref={logosRef}
						className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
					>
						{[...images, ...images].map((src, index) => (
							<li key={index}>
								<Image
									src={src}
									alt={`media-${index}`}
									width={100}
									height={100}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<a
				className="flex items-center justify-center absolute bottom-5"
				href="#presentation"
			>
				<Icon
					icon="akar-icons:chevron-down"
					className="text-4xl text-default-500 animate-bounce mt-12"
				/>
			</a>

			<style jsx>{`
				@keyframes infinite-scroll {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-100%);
					}
				}
				.animate-infinite-scroll {
					animation: infinite-scroll 25s linear infinite;
				}
				/* Ajoutez cette règle pour masquer le débordement horizontal */
				.overflow-hidden {
					overflow-x: hidden;
				}
			`}</style>
		</div>
	);
};

export default Medias;
