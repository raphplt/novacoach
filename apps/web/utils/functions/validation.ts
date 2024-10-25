// validationUtils.ts

import { FieldValues, UseFormReturn } from "react-hook-form";

interface ValidationError {
	path: string[];
	message: string;
}

interface ValidationResult {
	success: boolean;
	data?: any;
	error?: any;
}

export const handleValidationErrors = (
	validateFields: ValidationResult,
	methods: UseFormReturn<FieldValues>,
): boolean => {
	if (!validateFields.success) {
		console.error(validateFields.error?.flatten());
		validateFields.error
			?.flatten()
			.errors.forEach((issue: ValidationError) => {
				if (issue.path[0]) {
					methods.setError(issue.path[0], {
						type: "manual",
						message: issue.message,
					});
				}
			});
		return false;
	}
	return true;
};
