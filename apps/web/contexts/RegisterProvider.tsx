"use client";

import { initialUser } from "@utils/data/register.data";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { Role } from "type/role";
import { UserType } from "type/user";

interface RegisterContextProps {
	role: Role;
	setRole: (role: Role) => void;
	step: number;
	setStep: (step: number) => void;
	user: UserType | undefined;
	setUser: (user: UserType) => void;
}

export const RegisterContext = createContext<RegisterContextProps>({
	role: "student",
	setRole: () => {},
	step: 0,
	setStep: () => {},
	user: initialUser,
	setUser: () => {},
});

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
	// States
	const [role, setRoleState] = useState<Role>("student");
	const [step, setStep] = useState<number>(0);
	const [user, setUser] = useState<UserType>();
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedRole = localStorage.getItem("role");
			if (savedRole) {
				setRoleState(savedRole as Role);
			}
		}
	}, []);
	// Update localStorage whenever the role changes
	const setRole = (role: Role) => {
		setRoleState(role);
		if (typeof window !== "undefined") {
			localStorage.setItem("role", role);
		}
	};
	return (
		<RegisterContext.Provider
			value={{ role, setRole, step, setStep, user, setUser }}
		>
			{children}
		</RegisterContext.Provider>
	);
};

export const useRegister = () => {
	const context = useContext(RegisterContext);
	if (context === undefined) {
		throw new Error("useRegister must be used within a RegisterProvider");
	}
	return context;
};