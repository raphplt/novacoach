import { Avatar, Chip } from "@nextui-org/react";
import { maj } from "@utils/functions/text";

export default function Account({
	infosUser,
}: {
	infosUser?: {
		firstName: string;
		lastName: string;
		email: string;
		role: {
			name: string;
		};
	};
}) {
	if (!infosUser) return null;

	const { firstName, lastName, email, role } = infosUser;

	if (!firstName || !lastName || !email || !role || !role.name) {
		return null;
	}

	return (
		<div className="flex flex-row gap-5 items-center py-5">
			<Avatar
				src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
				size="lg"
			/>
			<div className="flex flex-col">
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold">
						{firstName + " " + lastName}
					</p>
					<Chip
						color="secondary"
						className="text-white"
					>
						{maj(role.name)}
					</Chip>
				</div>
				<p className="text-default-400">{email}</p>
			</div>
		</div>
	);
}
