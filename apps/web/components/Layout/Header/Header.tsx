import React from "react";
import RightContent from "./RightContent";
import LeftContent from "./LeftContent";

export default function Header({ isAuth }: { isAuth: boolean }) {
	return (
		<header className="flex items-center justify-between w-full fixed top-0 px-12 py-1 bg-transparent">
			<LeftContent />
			<RightContent isAuth={isAuth} />
		</header>
	);
}