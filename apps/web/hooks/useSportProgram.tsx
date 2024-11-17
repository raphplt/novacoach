import { useEffect, useState } from "react";
import { SportProgramType } from "type/sportProgram";

const useFetchProgram = (id: string | number) => {
	const [programme, setProgramme] = useState<SportProgramType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const url = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const fetchProgramme = async () => {
			try {
				const response = await fetch(`${url}/sportProgram/${id}`);
				if (!response.ok) {
					throw new Error(
						`Erreur lors de la récupération du programme ${id}`,
					);
				}
				const programmeData = await response.json();
				setProgramme(programmeData);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProgramme();
	}, [id, url]);

	return { programme, error, loading };
};

export default useFetchProgram;
