"use client";
import CreateAccount from "@components/Layout/Register/Form/CreateAccount";
import CreateStructure from "@components/Layout/Register/Form/CreateStructure";
import EndForm from "@components/Layout/Register/Form/EndForm";
import { useRegister } from "contexts/RegisterProvider";

export default function RegisterCoachSteps() {
	const { step } = useRegister();

	switch (step) {
		case 0:
			return <CreateAccount />;
		case 1:
			return <CreateStructure />;
		case 2:
			return <EndForm />;
		default:
			return null;
	}
}
