var mongoose = require('mongoose'),
    Schema = require('../../schemas/common'),
    RemoteLocationSchema;


RemoteLocationSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RemoteLocation', RemoteLocationSchema);