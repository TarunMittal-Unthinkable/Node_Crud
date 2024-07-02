import amqp from 'amqplib';
import { Buffer } from 'buffer';

export async function publishNotification(notification) {
    const conn = await amqp.connect('amqp://localhost'); 
    const channel = await conn.createChannel();
    const queue = 'notifications';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), {
        persistent: true
    });

    console.log("Sent '%s'", JSON.stringify(notification));
    setTimeout(() => {
        channel.close();
        conn.close();
    }, 500);
}
