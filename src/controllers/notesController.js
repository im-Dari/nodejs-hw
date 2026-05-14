import { Note } from '../models/note.js';
export const getAllNotes = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      tag,
      search,
    } = req.query;

    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);
    const skip = (pageNumber - 1) * perPageNumber;

    const totalNotes = await Note.countDocuments(filter);

    const notes = await Note.find(filter)
      .skip(skip)
      .limit(perPageNumber);

    res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalNotes,
      totalPages: Math.ceil(totalNotes / perPageNumber),
      notes,
    });
  } catch (error) {
    next(error);
  }
};