"use client";
import React, { useState, useEffect } from "react";
import RightContent from "./RightContent";
import LeftContent from "./LeftContent";
import MobileHeader from "./MobileHeader";
import { useMediaQuery } from "react-responsive";

export default function Header({ isAuth }: { isAuth: boolean }) {
	const [isMounted, setIsMounted] = useState(false);
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<header className="flex items-center justify-between w-full fixed top-0 px-12 py-1 bg-transparent z-40">
			{isMobile ? (
				<MobileHeader isAuth={isAuth} />
			) : (
				<>
					<LeftContent />
					<RightContent isAuth={isAuth} />
				</>
			)}
		</header>
	);
}
