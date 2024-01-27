const mongoose = require('mongoose')
const Schema = mongoose.Schema

const musicSchema = new Schema({
    musiclist: {
        type: Object, require: true,
        title: { type: String, require: true },
        singer: { type: String, require: true },
        music_url: { type: String, require: true },
        cover: { type: String, require: true },
        createdAt: { type: Date, require: true }

    }
})

module.exports = mongoose.model("music", musicSchema)