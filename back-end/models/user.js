let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 6;
const LOCK_TIME = 2 * 60 * 60 * 1000;



let UserSchema = new Schema(
    {
        username: {
            type: String, trim: true, index: {
                unique: true,
                partialFilterExpression: { username: { $type: "string" } }
            }
        },
        password: { type: String },
        email: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
        name: { type: String, default: '' },
        role: { type: String, enum: ['Manager', 'Developer', 'Assistant', 'QA tester'] },
        screenRole: { type: String, enum: ['admin', 'user'], default: 'user' }

        // loginAttempts: { type: Number, required: true, default: 0 },
        // lockUntil: { type: Number }
    }
);

UserSchema.pre('save', function (next) {
    let user = this;

    if (user.password) {
        if (!user.isModified('password')){
            return next();
        }
            
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        console.log('oi')

        user.password = '1234';

        if (!user.isModified('password'))
            return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        })
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        console.log(err);
    }
    return false;
}



module.exports = mongoose.model('User', UserSchema);