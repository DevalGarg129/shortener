import Url from "../model/url.model.js";
import { generateShortCode, generateHash } from "../utils/hash.js";

export const createShortUrl = async ({
    longUrl, 
    customAlias,
    expiresIn
}) => {
    // User provided custom Alias
    if(customAlias){
        const exists = await Url.findOne({
            shortCode: customAlias,
        });
        if(exists){
            throw new Error("custom alias already created");
        }

        const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : null;
        const url = await Url.create({
            longUrl,
            shortCode: customAlias,
            customAlias,
            expiresAt,
        });
        return url;
    }

    // Generate SHA-1
    const hash = generateHash(longUrl);
    let length = Number(process.env.HASH_LENGTH) || 6;
    let shortCode = generateShortCode(hash, length);

    while(await Url.findOne({ shortCode })){
        length++;
        shortCode = generateShortCode(hash, length);
    }

    const expiresAt = expiresIn
        ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000)
        : null;
    
    const url = await Url.create({
        longUrl,
        shortCode, 
        expiresAt,
    });
    return url;
};

export const getOriginalUrl = async (shortCode) => {
    const url = await Url.findOne({
        shortCode,
    });

    if(!url){
        throw new Error("Short URL not Found");
    }

    if(url.expiresAt && url.expiresAt < new Date()){
        throw new Error("Short Url has Expired");
    }

    url.clicks++;
    await url.save();
    return url.longUrl;
};

export const getUrlDetails = async (shortCode) => {
    const url = await Url.findOne({ shortCode });
    if(!url){
        throw new AppError("Short URL not found", 404);
    }

    return url;
};

export const deleteShortUrl = async (shortCode) => {
    const deleted = await Url.findOneAndDelete({
        shortCode,
    });

    if(!deleted){
        throw new AppError(
            "Short URL not found",
            404
        );
    }
    return deleted;
};

export const updateExpiry = async (shortCode, expiresIn) => {
    const url = await Url.findOne({ shortCode, });

    if(!url){
        throw new AppError("Short URL not found", 404);
    }
    url.expiresAt = new Date(
        Date.now() + expiresIn * 24 * 60 * 60 * 1000
    );

    await url.save();
    return url;
};

export const getAllUrls = async () => {
    return await Url.find()
        .sort({ createdAt: -1 });
}