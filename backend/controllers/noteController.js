const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

// @desc Get Notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

// @desc Create Note
// @route POST /api/notes/
// @access Private
const createNote = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please add a title and a content field");
  }

  const goal = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc Update Notes
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const note = Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //update own notes
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

// @desc delete Note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  await note.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
