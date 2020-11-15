const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("attendee.verified");
        
        channel.consume("attendee.verified", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved Attendee: ${input}`) //TODO: Figure out name, company name

            // Run Logic Here
            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for Attendee messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}