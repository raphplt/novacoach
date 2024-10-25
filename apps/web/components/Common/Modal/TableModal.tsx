import {
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	Select,
	SelectItem,
	ModalFooter,
	Button,
} from "@nextui-org/react";
import { ChangeEvent } from "react";

export default function TableModal({
	isModalOpen,
	closeModal,
	editingCoach,
	setEditingCoach,
	handleSave,
	structures,
}: {
	isModalOpen: boolean;
	closeModal: () => void;
	editingCoach: any;
	setEditingCoach: any;
	handleSave: () => void;
	structures: any[];
}) {
	return (
		<Modal
			isOpen={isModalOpen}
			onClose={closeModal}
		>
			<ModalHeader>
				{editingCoach.id ? "Éditer" : "Ajouter"} Coach
			</ModalHeader>
			<ModalBody>
				<Input
					label="Description"
					placeholder="Description"
					value={editingCoach.description}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEditingCoach((prevCoach) => ({
							...prevCoach,
							description: e.target.value,
						}))
					}
				/>
				<Select
					label="Structure"
					placeholder="Sélectionnez une structure"
					selectedKeys={
						editingCoach.structureId !== null
							? new Set([editingCoach.structureId.toString()])
							: new Set()
					}
					onSelectionChange={(keys) => {
						const selectedId = Array.from(keys).pop() as string;
						const structureId = selectedId
							? parseInt(selectedId, 10)
							: null;
						setEditingCoach((prevCoach) => ({
							...prevCoach,
							structureId,
						}));
					}}
				>
					{structures.map((structure: Structure) => (
						<SelectItem
							key={structure.id.toString()}
							value={structure.id.toString()}
						>
							{structure.name}
						</SelectItem>
					))}
				</Select>
			</ModalBody>
			<ModalFooter>
				<Button
					color="warning"
					onClick={closeModal}
				>
					Annuler
				</Button>
				<Button onClick={handleSave}>Sauvegarder</Button>
			</ModalFooter>
		</Modal>
	);
}
