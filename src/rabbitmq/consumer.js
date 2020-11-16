// Basic Consumer File
const amqp = require("amqplib");


async function connect(queue) {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        
        channel.consume(queue, message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved vendor with input: ${input.companyName}`)

            // Run Logic Here
            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for Publisher messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}

connect("gimme.created")
// connect("gimme.created")