import { 
    createShortUrl, 
    getOriginalUrl 
} from "../services/shortener.service.js";

export const createShortUrlShortener = async(req, res, next) => {
    try{
        const { longUrl, customAlias, expiresIn } = req.body;
        const url = await createShortUrl({
            longUrl, 
            customAlias,
            expiresIn
        });
        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: {
                longUrl: url.longUrl,
                shortCode: url.shortCode,
                shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
                expiresAt: url.expiresAt,
                clicks: url.clicks
            },
        });
    }catch(error){
        next(error);
    }
}

export const redirectUrlController = async (req, res, next) => {
    try{
        const { shortCode } = req.params;
        const longUrl = await getOriginalUrl(shortCode);
        return res.direct(302, longUrl);
    }catch(error){
        next(error);
    }
};

export const getUrlDetailsController = async (req, res, next) => {
    try{
        const url = await getUrlDetails(req.params.shortCode);
        res.status(200).json({
            success: true,
            data: url
        });
    }catch(error){
        next(error);
    }
};

export const deleteShortUrlController = async (req, res, next) => {
    try{
        await deleteShortUrl(req.params.shortCode);
        res.json({
            success: true,
            message: "URL deleted Successfully"
        });
    }catch(error){
        next(error);
    }
}