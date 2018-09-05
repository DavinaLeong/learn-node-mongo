const mongoose = require('mongosse');

const NoteSchema = mongoose.schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);