// code away!
require("dotenv").config();



const server = require("./server.js");
const port = process.env.PORT;

server.get('/', async (req, res) => {
  try {
    const shoutouts = await db('posts');
    const messageOfTheDay = process.env.MOTD || 'Hello User!'; // add this line
    res.status(200).json({ motd: messageOfTheDay, shoutouts }); // change this line
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the hello' });
  }
});

server.listen(port, () => {
  console.log(`*** listening on port ${port}`);
});