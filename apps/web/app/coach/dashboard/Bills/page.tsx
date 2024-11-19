import { BillsProvider } from "contexts/BillsProvider";
import React from "react";
import BillsList from "./_components/BillsList";
import CreateBill from "./_components/CreateBill";

const Bills = () => {
	return (
		<BillsProvider>
			<div className=" min-h-screen">
				<h1 className="text-2xl font-bold mb-6 text-center pt-14">
					Gestion des factures
				</h1>
				<div className="flex flex-row gap-5 mt-10 mb-10 h-full w-full">
					<BillsList />
					<CreateBill />
				</div>
			</div>
		</BillsProvider>
	);
};

export default Bills;
