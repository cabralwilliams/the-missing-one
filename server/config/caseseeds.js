const db = require('./connection');
const {  User, Case, Comment } = require('../models');

db.once('open', async () => {
  await Case.deleteMany();
  
await Case.create({
        firstname: 'Natalia',
        lastname: 'perez',
        age: 18,
        gender: 'F',
        last_known_location: 'She was last seen at school',
        creator_id: '61f9a8955be4c87692a13677',
        disappearance_date: "2022-02-01 15:47:35",
        images: ['085d0dff-8453-4faa-bce1-09135d16a564.jpg'],
        helpers: []
    }
)

await Case.create({
  firstname: 'Felix',
  lastname: 'Sanders',
  age: 35,
  gender: 'F',
  last_known_location: 'At work',
  creator_id: '61f9a8955be4c87692a13677',
  images: [ '54b94e64-d70b-4b16-9f70-75abdf6e9aa1.jpg' ],
  helpers: []
  }
)
console.log('cases seeded');

process.exit();
});