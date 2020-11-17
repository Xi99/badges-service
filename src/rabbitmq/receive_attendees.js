const amqp = require("amqplib");
const { addBadge } = require("../db/db.js");


connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("attendee.verified");
        
        channel.consume("attendee.verified", message => {
            const input = JSON.parse(message.content.toString());
            // console.log(`Recieved Attendee: ${input.name}`) 

            // Run Logic Here
            const attendee = { //TODO: Figure out what is going to DB
                name: input.name,
                label: "",
                company: input.company,
            }

            addBadge(attendee)


            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for Attendee messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}