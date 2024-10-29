import UserActions from "@/components/Layout/Profile/Actions";
import UserSection from "@/components/Layout/Profile/UserSection";

export default function Profile() {
	return (
		<main className="flex flex-col h-screen pt-20 mx-auto justify-start items-center bg-gradient-to-r from-gray-100 to-indigo-200 min-w-[50%]">
			<UserSection />
			<UserActions />
		</main>
	);
}
