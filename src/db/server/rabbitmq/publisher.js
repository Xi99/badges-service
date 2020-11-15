const amqp = require("amqplib");

const msg = {
    "id": 7,
    "eventName": "Triwizard Tournament",
    "boothAssignment": {
      "boothNumber": 5,
      "mezzanine": 2
    },
    "companyName": "Hogwarts School of Witchcraft and Wizardry",
    "badgesToCreate": [
      {
        "type": "vendor",
        "companyName": "Hogwarts School of Witchcraft and Wizardry" 
      },
      {
        "type": "vendor",
        "companyName": "Hogwarts School of Witchcraft and Wizardry" 
      }
    ]
  };

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("gimme.created");
        await channel.sendToQueue("gimme.created", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.companyName}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}
