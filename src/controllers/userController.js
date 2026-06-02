
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';


export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createHttpError(400, 'No file'));
    }
    const userId = req.user._id;
    const result = await saveFileToCloudinary(req.file.buffer, userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true, returnDocument: 'after' }
    );
    res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
};
