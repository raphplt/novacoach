import { User } from "@nextui-org/react";

export default function UserCard({
	infosUser,
}: {
	infosUser: {
		firstName: string;
		lastName: string;
		email: string;
	};
}) {
	return (
		<User
			name={infosUser.firstName + " " + infosUser.lastName}
			description={infosUser.email}
			avatarProps={{
				src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
			}}
		/>
	);
}
