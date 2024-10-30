"use client";

import { createSession } from "@/lib/session";
import { loginSchema } from "@/utils/schemas/login.schema";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { LoginData } from "type/login";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const useLoginForm = (methods: UseFormReturn<FieldValues>) => {
    if (!methods) {
        throw new Error("useLoginForm must be used within a FormProvider");
    }

    if (!urlBase) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const handleCreateAccount = async (data: LoginData) => {
        const { email, password } = data;

        const validateFields = loginSchema.safeParse({
            email,
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
            return null;
        }

        const snapshot = await fetch(`${urlBase}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!snapshot.ok) {
            const error = await snapshot.json();
            console.error(error);
            methods.setError("apiError", {
                type: "manual",
                message: error.message,
            });
            return null;
        }

        const responseData = await snapshot.json();

        console.log("responseData", responseData);

        try {
            await createSession(responseData.userId);
            return responseData; // Return response data on success
        } catch (error) {
            console.error(
                "Error during session creation or redirection",
                error,
            );
            methods.setError("apiError", {
                type: "manual",
                message: "Failed to create session or redirect",
            });
            return null;
        }
    };
    return { handleCreateAccount };
};

export default useLoginForm;