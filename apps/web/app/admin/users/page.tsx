"use client";
import useFetchData from "@hooks/useFetchData";

export default function UserPage() {
	const { data, error, isError } = useFetchData({ url: "/users" });

	console.log(data);

	return (
		<div>
			<h1 className="mt-12 font-bold text-center text-xl">User page</h1>
			{isError && <p>Error: {String(error && error.message)}</p>}
			{data &&
				data.data.map((user: any) => (
					<div key={user.id}>
						<p>
							{user.firstName} {user.lastName}
						</p>
						<p>{user.email}</p>
					</div>
				))}
		</div>
	);
}
