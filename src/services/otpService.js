export const otpService = {
    generate: () => {
        // Generate a 4-digit OTP centrally
        return Math.floor(1000 + Math.random() * 9000).toString();
    },

    verify: (input, actual) => {
        // Strict verification
        if (!input || !actual) return false;
        return input.toString() === actual.toString();
    }
};
