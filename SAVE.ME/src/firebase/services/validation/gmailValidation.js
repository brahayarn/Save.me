const gmailRequirements = {
    minLength: 5,
    maxLength: 30,
    domain: /@gmail\.com$/,
    hasValidFormat: /^[\w%+.-]+@gmail\.com$/,
};

export const validateGmail = (email) => {
    if (email.length < gmailRequirements.minLength || email.length > gmailRequirements.maxLength) {
        return `Email має бути від ${gmailRequirements.minLength} до ${gmailRequirements.maxLength} символів.`;
    }
    if (!gmailRequirements.domain.test(email)) {
        return 'Email повинен бути на домені gmail.com.';
    }
    if (!gmailRequirements.hasValidFormat.test(email)) {
        return 'Email має бути у правильному форматі (наприклад, example@gmail.com).';
    }
    return '';
};
