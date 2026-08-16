import Dexie from 'dexie';
class FileDB extends Dexie {
    fileData;
    constructor() {
        super("FileDB");
        this.version(1).stores({
            fileData: '++id'
        });
        this.fileData = this.table("fileData");
    }
}
const db = new FileDB();
class FileDataService {
    static async getFileData(id) {
        return db.fileData.get(id);
    }
    static async addFileData(fileData) {
        return db.fileData.add(fileData);
    }
    static async updateFileData(id, changes) {
        return db.fileData.update(id, changes);
    }
    static async deleteFileData(id) {
        await db.fileData.delete(id);
    }
    static async deleteAllFileData() {
        await db.fileData.clear();
    }
}
export default FileDataService;
