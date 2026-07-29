import crypto from "crypto";
export const generateHash = (longUrl) => {
    return crypto
        .createHash("sha1")
        .update(longUrl)
        .digest("hex")
};

export const generateShortCode = (hash, length=6) => {
    return hash.substring(0, length);
}