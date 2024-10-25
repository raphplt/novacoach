import AuthBlock from "@components/Layout/Home/AuthBlock";
import HomeBg from "../public/images/home-bg.jpg";

export default function Home() {
	return (
		<main
			className="flex items-center justify-start w-screen flex-col  h-screen"
			style={{
				backgroundImage: `url(${HomeBg.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="bg-white/30 backdrop-blur-sm rounded-xl mt-40 px-40 py-20">
				<h1 className="text-4xl font-semibold">
					Welcome to Novacoach !
				</h1>

				<p className=" text-center my-10 text-lg">
					The best platform for your coaching
				</p>

				<AuthBlock />
			</div>
		</main>
	);
}
