import CreateInvitationForm from "@components/Layout/Forms/CreateInvitationForm";
import ListInvitations from "./ListInvitations";

export default function CreateInvitation() {
	return (
		<main className="h-screen bg-gradient-to-r from-slate-100 to-slate-300">
			<h1 className="pt-12 text-center font-bold text-2xl">
				Créer une invitation
			</h1>
			<div className="flex items-center justify-start w-10/12 py-20 mx-auto gap-5">
				<CreateInvitationForm />
			</div>
			<ListInvitations />
		</main>
	);
}
