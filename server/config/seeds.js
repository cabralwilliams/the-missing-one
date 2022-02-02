const db = require('./connection');
const {  User, Case, Comment } = require('../models');

db.once('open', async () => {
  await Case.deleteMany();
  await User.deleteMany();

  await User.create({
    first_name: 'Sonali',
    last_name: 'VBC',
    email: 'sonali@mail.com',
    password: '123456',
    contact_number: '1234524789',
    donations: [     
        {amount: 540, createdAt: '1643570711728'}, { amount: 152, createdAt: '1643750740053'}
      ]
  });

  await User.create({
    first_name: 'Ivonne',
    last_name: 'XYZ',
    email: 'ivonne@mail.com',
    password: '123456',
    contact_number: '2123334444',
    donations:[
    {amount: 240, createdAt: '1643570711728'}, { amount: 45, createdAt: '1643750740053'}
    ]
  });

  console.log('users seeded');
  process.exit();
});