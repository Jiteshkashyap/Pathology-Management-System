import amqp from 'amqplib';

let channel;
let connection;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        
        // Handle connection-level errors
        connection.on("error", (err) => {
            console.error("RabbitMQ Connection Error:", err);
        });

        connection.on("close", () => {
            console.warn("RabbitMQ Connection closed. Reconnecting...");
            // You could implement a reconnection logic here
        });

        channel = await connection.createChannel();
        
        // Handle channel-level errors (very important!)
        channel.on("error", (err) => {
            console.error("RabbitMQ Channel Error:", err);
        });

        await channel.assertQueue('reportEmailQueue', { durable: true });
        console.log("RabbitMQ Connected & Queue Asserted");
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
    }
};

export const getChannel = () => channel;