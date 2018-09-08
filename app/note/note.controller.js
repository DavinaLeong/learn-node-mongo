const Note = require('./note.model');

module.exports = {
    create: (req, res) => {
        if (! req.body.content) {
            return res.status(400).send({
                message: "Note content is required."
            });
        }

        const note = new Note({
            title: req.body.title || "Untitled Note",
            content: req.body.content
        });

        note.save()
            .then(data => {
                console.log('line 18: ', data);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occurred while creating a note."
                })
            });
    },

    findAll: (req, res) => {
        Note.find()
            .then(notes => {
                res.send(notes)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving all notes."
                });
            });
    },

    findOne: (req, res) => {
        Note.findById(req.params.noteId)
            .then(note => {
                if (! note) {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });
                }
                res.send(note);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });
                }

                res.status(500).send({
                    message: err.message || `An error occurred while retrieving note of id ${req.params.noteId}.`
                });
            });
    },

    update: (req, res) => {
        if (! req.body.content) {
            return res.status(400).status({
                message: "Note content is required."
            });
        }

        Note.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, { new: true })
            .then(note => {
                if (! note) {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });
                }
                res.send(note);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });
                }

                res.status(500).send({
                    message: err.message || `An error occurred while updating note of id ${req.params.noteId}.`
                });
            });
    },

    delete: (req, res) => {
        Note.findByIdAndDelete(req.params.noteId)
            .then(note => {
                if(!note) {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });
                }
                res.send({message: `Deleted note of id ${res.params.noteId}`});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: `Note of id ${req.params.noteId} not found.`
                    });                
                }
                return res.status(500).send({
                    message: err.message || `An error occurred while deleting note of id ${req.params.noteId}.`
                });
            });
    }
};