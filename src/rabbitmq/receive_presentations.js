const amqp = require("amqplib");
const { addBadge } = require("../db/db.js");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("presentation.approved");
        
        channel.consume("presentation.approved", message => {
            const input = JSON.parse(message.content.toString());
            // console.log(`Recieved Presentations: ${input.name}`) 

            // Run Logic Here
            const presentation = { 
                name: input.name, 
                label: "Speaker",
                company: input.company
            }

            addBadge(presentation)

            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for Presentation messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}