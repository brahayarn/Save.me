const passwordRequirements = {
    minLength: 6,
    maxLength: 30,
    hasLowerCase: /[a-z]/,
    hasUpperCase: /[A-Z]/,
    hasNumber: /\d/,
};

export const validatePassword = (password) => {
    if (password.length < passwordRequirements.minLength || password.length > passwordRequirements.maxLength) {
        return `Пароль має бути від ${passwordRequirements.minLength} до ${passwordRequirements.maxLength} символів.`;
    }
    if (!passwordRequirements.hasLowerCase.test(password)) {
        return 'Пароль повинен містити принаймні одну літеру нижнього регістру.';
    }
    if (!passwordRequirements.hasUpperCase.test(password)) {
        return 'Пароль повинен містити принаймні одну літеру верхнього регістру.';
    }
    if (!passwordRequirements.hasNumber.test(password)) {
        return 'Пароль повинен містити принаймні одну цифру.';
    }
    return '';
};
