const amqp = require("amqplib");
const { addBadge } = require("../db/db.js");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("vendor.created");
        
        channel.consume("vendor.created", message => {
            const input = JSON.parse(message.content.toString());
            // console.log(`Recieved Vendor Company Name: ${input.companyName}`)

            // Run Logic Here
            const vendor = { //TODO: Figure out what is going to DB
                name: '',
                label: "Vendor",
                company: input.companyName,
            }

            addBadge(vendor)

            channel.ack(message); // removes message from the queue
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}