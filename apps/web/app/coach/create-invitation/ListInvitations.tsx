"use client";

import PageLoader from "@/components/Common/Loaders/PageLoader";
import DataTable from "@/components/Common/Table/DataTableCustom";
import useFetchData from "@/hooks/useFetchDatas";
import { useAuth } from "contexts/AuthProvider";

export default function ListInvitations() {
	const { user } = useAuth();

	const { data, isLoading, isError } = useFetchData({
		url: `/invitations/coach/${user?.coachRole?.id}`,
	});

	if (isLoading || isError || !data || !user?.coachRole?.id) {
		return <PageLoader text="Loading Invitations" />;
	}

	const columnsHeaders = [
		{ key: "id", label: "ID" },
		{ key: "token", label: "Token" },
		{ key: "expiresAt", label: "Expires At" },
		{ key: "usedAt", label: "Used At" },
		{ key: "coachId", label: "Coach ID" },
		{ key: "structureId", label: "Structure ID" },
	];

	const rows = data.data.invitations.map((invitation: any) => ({
		id: invitation.id,
		token: invitation.token,
		expiresAt: invitation.expiresAt,
		usedAt: invitation.usedAt,
		coachId: invitation.coachId,
		structureId: invitation.structureId,
	}));

	return (
		<div className="w-11/12 mx-auto min-h-screen">
			<h1 className="text-2xl font-bold mb-4">Invitations</h1>
			<DataTable
				name="Invitations"
				columnsHeaders={columnsHeaders}
				rows={rows}
				isLoading={isLoading}
			/>
		</div>
	);
}
