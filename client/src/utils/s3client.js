//Purpose: s3Client.js is a helper function that creates an Amazon Simple Storage Service (Amazon S3) service client.
// Create service client module using ES6 syntax.
// Load the required clients and packages
import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const region = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    region,
    credentials: {
        secretAccessKey: "ZGkVO0+zwub4B8eSPKwCqMDgaQsWiO8wu6t9Xejn",
        accessKeyId: "AKIAU5YJF4CAE3ESRKHV"
    }
    })
export { s3Client };