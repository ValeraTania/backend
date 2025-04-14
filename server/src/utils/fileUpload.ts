import fs from 'fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

class FileUploadService {
  async save(file: any) {
    const fileExtension = file.mimetype.split('/')[1]; // get the extension of the img
    const fileName = uuidv4() + '.' + fileExtension;
    const filePath = path.resolve('static', fileName);
    await file.mv(filePath);
    return fileName;
  }
  async delete(fileName: string) {
    try {
      const filePath = path.resolve('static', fileName);
      await fs.promises.unlink(filePath);
    } catch (error: unknown) {
      console.log(`Failed to delete file:`, fileName, error);
    }
  }
}

export default new FileUploadService();
