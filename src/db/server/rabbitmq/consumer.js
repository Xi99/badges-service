const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("gimme.created");
        
        channel.consume("gimme.created", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved vendor with input: ${input.companyName}`)

        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}