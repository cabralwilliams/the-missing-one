//Purpose: s3_getobject.js gets an object} from an Amazon Simple Storage Service (Amazon S3) bucket.

// Import required AWS SDK clients and commands for Node.js.
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates Amazon S3 service client module.

    const bucketParams = {
        Bucket: 'missingone',
        Key: "0.jpg"
    };
    const encode = (data)=> {
        let buf = Buffer.from(data);
        let base64 = buf.toString('base64');
        return base64
    }
    const run = async () => {
    try {
        const data = await s3Client.send(new GetObjectCommand(bucketParams));
        const bodyContents = encode(data)
    } catch (err) {
       console.log("Error", err);
    }
};
