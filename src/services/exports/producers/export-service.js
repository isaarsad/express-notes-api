import amqp from 'amqplib';

const ExportService = {
  sendMessage: async (queueMicrotask, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue('export:notes', {
      durable: true,
    });

    await channel.sendToQueue(queueMicrotask, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

export default ExportService;
