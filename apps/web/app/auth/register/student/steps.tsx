"use client";
import CreateAccount from "@/components/Layout/Register/Form/CreateAccount";
import JoinStructure from "@/components/Layout/Register/Form/JoinStructure";
import { useRegister } from "contexts/RegisterProvider";

export default function RegisterStudentSteps() {
	const { step, role } = useRegister();

	console.log("role", role);

	switch (step) {
		case 0:
			return <CreateAccount />;
		case 1:
			return <JoinStructure />;
		default:
			return null;
	}
}
