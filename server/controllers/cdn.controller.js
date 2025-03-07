// This controller uses the aws-sdk version 3.
// See the documentation at https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ 
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.uploadFile = async (req, res) => {
    const { file } = req.files;
    const { key } = req.body;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.data
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
}