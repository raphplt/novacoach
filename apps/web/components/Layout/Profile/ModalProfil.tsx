import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

const ModalProfil = ({
	isModalVisible,
	setIsModalVisible,
	handleFileUpload,
}: {
	isModalVisible: boolean;
	setIsModalVisible: (value: boolean) => void;
	handleFileUpload: () => void;
}) => {
	return (
		<Modal
			isOpen={isModalVisible}
			onOpenChange={() => setIsModalVisible(false)}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>
							<h3>Mettre à jour votre photo de profil</h3>
						</ModalHeader>
						<ModalBody>
							<p>
								Voulez-vous vraiment mettre à jour votre photo
								de profil ?
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								onClick={onClose}
							>
								Annuler
							</Button>
							<Button
								onClick={() => {
									handleFileUpload();
									setIsModalVisible(false);
								}}
							>
								Confirmer
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalProfil;
