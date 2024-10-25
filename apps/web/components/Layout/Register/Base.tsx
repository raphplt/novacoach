export default function Base() {
	return (
		<div className=" min-h-screen">
			<div className="mt-20 flex items-center justify-center ">
				<h1 className="text-xl font-bold">
					Bienvenue sur Novacoach, la plateforme n°1 de coaching
					sportif en ligne
				</h1>
			</div>
			<div className="flex flex-row items-center">
				<div>
					<button>Je suis un coach</button>
				</div>
				<div>
					<button>Je suis un élève</button>
				</div>
			</div>
		</div>
	);
}
