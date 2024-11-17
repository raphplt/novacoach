import {SportType} from "../../../type/sportType";
import React from "react";
interface SportSelectProps {
	sportList: SportType[],
	isInvalid?: boolean,
	register:any
}

export default function SportSelect({
	sportList,
	register,
	isInvalid,
}: SportSelectProps) {
	return (
		<>
			<label
				htmlFor="sportSelect"
				className="block text-sm font-medium mb-2 text-gray-700"
			>
				Choisir un sport
			</label>
			<select
				id="sportSelect"
				name="sportSelect"
				className={`w-full px-3 py-2 rounded mb-3 ${isInvalid ? "border-danger-50 bg-danger-50 text-danger" : ""}`}
				{...register}
			>
				<option value="">Sélectionnez un sport</option>
				{sportList.map((sport) => (
					<option
						key={sport.id}
						value={sport.id}
					>
						{sport.name}
					</option>
				))}
			</select>
		</>
	);
}
