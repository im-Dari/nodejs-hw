import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function saveFileToCloudinary(buffer, userId) {
	return new Promise((resolve, reject) => {
		const options = {
			resource_type: 'image',
			folder: `user-avatars/${userId}`,
			public_id: userId,
			overwrite: true,
			unique_filename: false,
		};
		const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
		Readable.from(buffer).pipe(stream);
	});
}
