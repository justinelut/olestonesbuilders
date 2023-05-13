function formatPhoneNumber(phoneNumber) {
    // Define a regular expression pattern to match the phone number
    const pattern = /^(?:\+?254|0)?(1\d{8}|7\d{8})$/;

    // Use the regular expression to check if the phone number matches the pattern
    const match = phoneNumber.match(pattern);

    // If the phone number matches the pattern, format it as required
    if (match) {
        const digits = match[1]; // Get the digits of the phone number
        return `254${digits}`; // Add '254' in front of the digits and return the formatted number
    } else {
        // If the phone number does not match the pattern, check if it starts with '254'
        if (phoneNumber.startsWith('254')) {
            return `254${phoneNumber.slice(3)}`; // Remove '254' from the beginning and add it back in front of the remaining digits
        } else {
            return `254${phoneNumber}`; // Add '254' in front of the entire phone number
        }
    }
}

export default formatPhoneNumber