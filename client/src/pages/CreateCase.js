import React ,{useState} from 'react';
import {PutObjectCommand} from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3client.js"

const S3_BUCKET ='missingone';
const initialState = {
    firstname: null,
    lastname: null,
    address: null,
    dob: null,
    age: null,
    gender: null,
    last_known_location: null,
    creator_id: null,
    biograph: null,
    nationality: null,
    mobile: null,
    licenseId: null,
    issuedState: null,
    licensePlate: null,
    disappearance_date: null,
    ncic: null,
    other_info: null
}

// Add a photo to s3 bucket
const UploadImageToS3WithNativeSdk = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [formState, setFormState] = useState(initialState);

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
    return(
        <div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={() => uploadFile(selectedFile)}> Upload Image</button>
            <form>
                <h2>Required Fields</h2>
                <div>
                    <label htmlFor='firstname'>First Name:</label>
                    <input type="text" name='firstname' value={formState.firstname === null ? '' : formState.firstname} />
                </div>
                <div>
                    <label htmlFor='lastname'>Last Name:</label>
                    <input type="text" name='lastname' value={formState.lastname === null ? '' : formState.lastname} />
                </div>
            </form>
        </div>
    );
}

export default UploadImageToS3WithNativeSdk;

