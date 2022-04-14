const asyncHandler = require('express-async-handler')

// @desc Get Notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Retrieve Notes" });
});

// @desc Create Note
// @route POST /api/notes/
// @access Private
const createNote =asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  ;
  res.status(200).json({ message: "Create Notes" });
});

// @desc Update Notes
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Update Note ${req.params.id}` });
});

// @desc delete Note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote =asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Note ${req.params.id}` });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
