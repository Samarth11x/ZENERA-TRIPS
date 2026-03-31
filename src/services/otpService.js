export const generateOTP = () => {
    // 4-digit numeric code
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export const verifyOTP = (input, actual) => {
    return input === actual;
};

export const otpService = {
    generate: generateOTP,
    verify: verifyOTP
};
