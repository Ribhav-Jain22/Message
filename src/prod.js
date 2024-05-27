const AWS = require('aws-sdk');

// Set the configuration for the AWS SDK to use LocalStack
AWS.config.update({
    region: 'us-east-1', // Replace with the appropriate region
    endpoint: 'https://localhost.localstack.cloud:4566', // LocalStack endpoint
    s3ForcePathStyle: true // Required for LocalStack
});

const s3 = new AWS.S3();

exports.handler = async (event) => {
    // Write data to S3 bucket
    const params = {
        Bucket: 'sample-bucket', // Replace with your S3 bucket name
        Key: 'example-file.txt', // Replace with the key (filename) for the object
        Body: 'Hello, world!' // Replace with the data you want to write
    };

    try {
        await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Data written to S3 bucket successfully!'
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error writing data to S3 bucket: ' + error.message
            })
        };
    }
};
