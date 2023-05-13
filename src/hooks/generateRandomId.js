export default function generateOrderID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const timestamp = new Date().getTime().toString(36).toUpperCase(); // get the current timestamp and convert to base36 uppercase string
    let id = '';
    for (let i = 0; i < 6; i++) { // generate a 6-character random string
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return timestamp + '-' + id; // concatenate the timestamp and random string with a hyphen
}
