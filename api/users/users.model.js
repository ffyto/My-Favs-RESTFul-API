const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    favLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FavList',
      },
    ],
    passwordResetActivationToken: String,
    passwordResetActivationExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function save(next) {
  const user = this;

  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (e) {
    next(e);
  }
});

UserSchema.virtual('profile').get(function profile() {
  const { userName, name, lastName, email } = this;

  return {
    userName,
    name,
    lastName,
    email,
  };
});

UserSchema.methods.comparePassword = async function comparepassword(
  enteredPassword,
  next
) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    return isMatch;
  } catch (e) {
    next(e);
    return false;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
