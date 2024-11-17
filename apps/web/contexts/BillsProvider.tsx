"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { BillType } from "type/billType";
import { useAuth } from "./AuthProvider";
import useFetchData from "@hooks/useFetchData";

interface BillContextProps {
	bills: BillType[];
	setBills: (bills: BillType[]) => void;
}

export const BillContext = createContext<BillContextProps>({
	bills: [],
	setBills: () => {},
});

export const BillsProvider = ({ children }: { children: ReactNode }) => {
	const [bills, setBills] = useState<BillType[]>([]);
	const { coachRoleData } = useAuth();

	const { data, error } = useFetchData({
		url: `/bills/structure/${coachRoleData?.structure?.id}`,
		enabled: !!coachRoleData?.structure?.id,
	});

	useEffect(() => {
		if (data) {
			console.log("data", data);
			setBills(data.data as any);
		} else if (error) {
			console.error("Failed to fetch bills:", error);
		}
	}, [data, error]);

	console.log("bills", bills);

	return (
		<BillContext.Provider value={{ bills, setBills }}>
			{children}
		</BillContext.Provider>
	);
};

export const useBills = () => {
	const context = useContext(BillContext);
	if (context === undefined) {
		throw new Error("useBills must be used within a BillsProvider");
	}
	return context;
};