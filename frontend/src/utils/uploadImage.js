import { API_PATHS } from "./ApiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    const formData = new FormData()

    // Append Image file to form data 
    formData.append('image', imageFile)

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Set headers for file upload
            },
        });

        return response.data ;  // Return response data
    } catch (err) {
        console.error('Error uploading the image:', err);
        throw err ;   // Rethrow error for handling
        
    }
}

export default uploadImage