"use client";
import { useBills } from "contexts/BillsProvider";
import React from "react";
import { BillType } from "type/billType";

const BillsList = () => {
	const { bills } = useBills();

	console.log(bills);

	return (
		<div className="flex-1">
			<h1>Liste des factures ({bills.length})</h1>

			{bills.map((bill: BillType) => (
				<div key={bill.id}>
					<h2>{bill.amount}</h2>
					{/* <p>{bill.dateIssued?.toDateString()}</p> */}
					{/* <p>{bill.dateDue?.toDateString()}</p> */}
					<p>{bill.status}</p>
				</div>
			))}
		</div>
	);
};

export default BillsList;
