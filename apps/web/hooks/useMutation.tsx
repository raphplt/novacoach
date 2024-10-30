import { useMutation } from "@tanstack/react-query";

const useMutate = ({
	url,
	method = "GET",
}: {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
}) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!baseUrl) throw new Error("API URL is not defined");

	const fetchData = async (data: any) => {
		const userId = data.id;
		if (!userId) return { message: "User not found" };

		const response = await fetch(`${baseUrl}${url}/${userId}`, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : null,
		});
		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.message || "Something went wrong");
		}
		return result;
	};

	const mutation = useMutation({
		mutationFn: fetchData,
		onError: (error) => {
			console.error("Mutation error:", error);
		},
		onSuccess: (data) => {
			console.log("Mutation success:", data);
		},
	});

	return mutation;
};

export default useMutate;
