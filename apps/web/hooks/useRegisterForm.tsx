"use client";
import { createSession } from "@/lib/session";
import { registerSchema } from "@/utils/schemas/register.schema";
import {
	registerInitialState,
	structureSchema,
} from "@/utils/schemas/structure.schema";
import axios from "axios";
import { useRegister } from "contexts/RegisterProvider";
import { useState } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { RegisterData, RegisterState } from "type/register";
import { Role } from "type/role";
import { StructureData } from "type/structure";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const useRegisterForm = (methods: UseFormReturn<FieldValues>, role: Role) => {
	if (!methods) {
		throw new Error("useRegisterForm must be used within a FormProvider");
	}

	if (!urlBase) {
		throw new Error("NEXT_PUBLIC_API_URL is not defined");
	}

	const { setUser } = useRegister();

	const handleCreateAccount = async (
		registerData: RegisterData,
	): Promise<boolean> => {
		const { firstName, lastName, email, password } = registerData;

		const validateFields = registerSchema.safeParse({
			email,
			firstName,
			lastName,
			password,
		});

		if (!validateFields.success) {
			console.error(validateFields.error.flatten());
			validateFields.error.errors.forEach((issue: any) => {
				methods.setError(issue.path[0], {
					type: "manual",
					message: issue.message,
				});
			});
			return false;
		}

		const registerWithRole = { ...registerData, roleName: role };

		try {
			const response = await fetch(`${urlBase}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerWithRole),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error(data.error + " Registration failed");
				methods.setError("credentials", {
					type: "manual",
					message: data.error || "Registration failed",
				});

				throw new Error(data.error || "Registration failed");
			}

			// Set user in context
			setUser(data);

			console.log("User created", data);
			if (role === "coach") {
				// Create coach
				const coachResponse = await fetch(`${urlBase}/coaches`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: {
							id: data.id,
						},
					}),
				});

				const coachData = await coachResponse.json();
				console.log("Coach created", coachData);

				if (!coachResponse.ok) {
					throw new Error(
						coachData.message || "Coach creation failed",
					);
				}
			}
			// Create session with the user ID
			await createSession(data.id);

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const handleCreateStructure = async (data: StructureData) => {
		try {
			const { name, description, address, phone, logo } = data;

			const validateFields = structureSchema.safeParse({
				name,
				description,
				address,
				phone,
				logo,
			});

			if (!validateFields.success) {
				console.error(validateFields.error.flatten());
				validateFields.error.errors.forEach((issue: any) => {
					methods.setError(issue.path[0], {
						type: "manual",
						message: issue.message,
					});
				});
				return false;
			}

			const response = await axios.post(`${urlBase}/structures`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.data;

			if (!response.status) {
				throw new Error(
					responseData.message || "Structure creation failed",
				);
			}

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	return { handleCreateAccount, handleCreateStructure };
};

export default useRegisterForm;