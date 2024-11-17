"use client";
import { useQuery } from "@tanstack/react-query";

export interface FetchOptions {
	url: string;
	method?: Method;
	body?: any;
	enabled?: boolean;
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useFetchData = ({
	url,
	method = "GET",
	body = null,
	enabled = true,
}: FetchOptions) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!baseUrl) throw new Error("API URL is not defined");

	const fetchData = async () => {
		try {
			const response = await fetch(`${baseUrl}${url}`, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: body ? JSON.stringify(body) : null,
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong");
			}
			return { data };
		} catch (error) {
			return { error };
		}
	};

	const { isLoading, isError, data, error } = useQuery({
		queryKey: [url, method, body],
		queryFn: fetchData,
		enabled,
	});

	return { isLoading, isError, data, error };
};

export default useFetchData;