const amqp = require("amqplib");
const { addBadge } = require("../db/db.js");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("sponsor.member.created");
        
        channel.consume("sponsor.member.created", message => {
            const input = JSON.parse(message.content.toString());
            // console.log(`Recieved Sponsors: ${input.name}`) 
            // Run Logic Here
            const sponsor = { 
                name: input.name,
                label: "Sponsor - ", sponsorLevel,
                company: input.organization,
            }
            addBadge(sponsor)


            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for Sponsor messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}