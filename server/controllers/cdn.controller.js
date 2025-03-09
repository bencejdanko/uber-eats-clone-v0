const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const { Customer } = require('../models');

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    endpoint: process.env.AWS_URL,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.uploadAvatar = async (req, res) => {
    try {
        // verify that session is valid
        if (!req.session.customerId) {
            return res.status(401).send("Unauthorized");
        }

        const customer = await Customer.findByPk(req.session.customerId);
        if (!customer) {
            return res.status(401).send("Unauthorized");
        }

        const key = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
        const file = req.file;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer, // Use file.buffer instead of file.data
        };

        const upload = new Upload({
            client: s3Client,
            params: params,
        });

        try {
            const data = await upload.done();

            // Update the customer's avatarUrl
            customer.profile_picture = `https://cdn.32kb.dev/${data.Key}`;
            await customer.save();

            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};