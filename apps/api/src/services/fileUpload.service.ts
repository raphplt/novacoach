import { AppDataSource } from "../../ormconfig";
import cloudinary from "../cloudinaryConfig";
import { Message } from "../entity/message";

export class FileUploadService {
	private messageRepository = AppDataSource.getRepository(Message);

	async uploadFile(filePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			cloudinary.uploader.upload(filePath, (error, result) => {
				if (error) {
					reject(error);
				} else {
					if (!result) {
						reject("No result from cloudinary");
					} else {
						resolve(result.secure_url);
					}
				}
			});
		});
	}

	async saveMessageWithFile(
		conversationId: string,
		senderId: string,
		content: string,
		filePath: string,
	) {
		const fileUrl = await this.uploadFile(filePath);
		const newMessage = this.messageRepository.create({
			conversation: { id: parseInt(conversationId) },
			sender: { id: parseInt(senderId) },
			content,
			fileUrl,
		});
		return this.messageRepository.save(newMessage);
	}
}
