const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    
    // Increase timeout for large files
    options.timeout = 300000; // 5 minutes
    
    // For video files, add specific optimizations
    if (file.mimetype && file.mimetype.startsWith('video/')) {
        options.video_codec = 'auto';
        options.quality = quality || 'auto';
        // Enable progressive upload for better user experience
        options.eager = [
            { streaming_profile: "4k", format: "m3u8" },
            { streaming_profile: "hd", format: "m3u8" }
        ];
        options.eager_async = true;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
};
