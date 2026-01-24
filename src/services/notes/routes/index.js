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
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.post('/notes', authenticateToken, validate(notePayloadSchema), addNote);
router.get('/notes', authenticateToken, validate(noteQuerySchema), getNotes);
router.get('/notes/:id', authenticateToken, getNoteById);
router.put(
  '/notes/:id',
  authenticateToken,
  validate(noteUpdatePayloadSchema),
  editNote,
);
router.delete('/notes/:id', authenticateToken, deleteNote);

export default router;
