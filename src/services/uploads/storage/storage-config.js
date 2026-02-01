/* import fs from 'fs';
import path from 'path'; */
import multer from 'multer';
import ClientError from '../../../exceptions/client-error.js';

/* Menggunakan Disk Storage
export const UPLOAD_FOLDER = path.resolve(
  process.cwd(),
  'src/services/uploads/files/images',
);

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
*/

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5Mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new ClientError('Only image files are allowed'), false);
  },
});

//export default { UPLOAD_FOLDER, storage, upload };
export default { storage, upload };
