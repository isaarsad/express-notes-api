import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import NoteRepositories from '../repositories/repositories.js';

export const addNote = async (req, res, next) => {
  const { title, tags, body } = req.validated;
  const note = await NoteRepositories.addNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }
  return response(res, 201, 'Catatan berhasil ditambahkan', {
    noteId: note.id,
  });
};

export const getNotes = async (req, res) => {
  const notes = await NoteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', { notes: notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;

  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const deleteNote = await NoteRepositories.deleteNote(id);

  if (!deleteNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', deleteNote);
};
