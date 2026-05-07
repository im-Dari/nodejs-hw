import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};