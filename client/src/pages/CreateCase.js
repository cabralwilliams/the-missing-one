import React ,{useState} from 'react';
import {PutObjectCommand} from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client.js"

const S3_BUCKET ='missingone';

// Add a photo to s3 bucket
const UploadImageToS3WithNativeSdk = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        //const fileName = file.name;
        if (!file) {
            return alert("Choose a file to upload first.");
        }
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key:"5.jpg" 
        };
        try {
            const data = await s3Client.send(new PutObjectCommand(params));
            alert("Successfully uploaded photo.");
        }catch (err) {
            return alert("There was an error uploading your photo: ", err.message);
        }
    }
    return <div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload Image</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;

