var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = require('../../schemas/common'),
    UserSchema;

function setPassword(password) {
    var encodedPwd;

    this.salt = Math.random() + '';
    encodedPwd = this.encryptPassword(password);
    return encodedPwd;
}

UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    online: {
        type: Boolean
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    createDate: {
        type: String
    },
    updateDate: {
        type: String
    },
    budgets: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

UserSchema.setSetter('password', setPassword);
UserSchema.pre('save', function (next) {
    var now = new Date().getTime();

    this.updateDate = now;
    if (!this.createDate) {
        this.createDate = now;
    }
    next();
});

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.password;
};

module.exports = mongoose.model('User', UserSchema);