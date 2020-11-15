const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("presentation.approved");
        
        channel.consume("presentation.approved", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved Presentations: ${input}`) //TODO: Figure out label

            // Run Logic Here
            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}