import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary,config';

// Direct upload to Cloudinary
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: 'portfolio',
  } as any,
});

export const multerImageUpload = multer({ storage: imageStorage });

const storage = multer.memoryStorage();
export const upload = multer({ storage });


