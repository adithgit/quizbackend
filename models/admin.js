const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'you must provide {PATH}'],
        trim: true,
        minlength: [3, '{PATH} must be at least 4 charecters, got {VALUE}'],
    },
    email: {
        type: String,
        required: [true, 'you must provide {PATH}'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'you must provide {PATH}'],
    },
    admintype: String,
});

adminSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

adminSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;

    return user;
}

adminSchema.methods.isValidPassword = async function (password) {
    const user = this;
    
    return await bcrypt.compare(password, user.password);
}

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;