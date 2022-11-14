import crypto from "crypto";

export const generatePassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return  {
        salt: salt,
        hash: crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    }
};

export const validPassword =  (user, password) => {
    const hash = crypto.pbkdf2Sync(password, user.password, 1000, 64, 'sha512').toString('hex');
    return user.hash === hash;
};