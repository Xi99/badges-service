const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("vendor.created");
        
        channel.consume("vendor.created", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved Vendor Company Name: ${input.companyName}`)

            // Run Logic Here
            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}