import express from 'express';
import {
  addNote,
  getNotes,
  getNoteById,
  editNote,
  deleteNote,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  notePayloadSchema,
  noteQuerySchema,
  noteUpdatePayloadSchema,
} from '../validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), addNote);
router.get('/notes', validate(noteQuerySchema), getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(noteUpdatePayloadSchema), editNote);
router.delete('/notes/:id', deleteNote);

export default router;
