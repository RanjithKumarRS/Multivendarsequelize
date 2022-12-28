'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'manager',
      email: 'manager@example.com',
      password:"$2b$05$JIpLbe3VV7by8XgiV/a6NuIauBRs9YzeA1ufpBh5qtlxMRXTi6igu",
      userrole:"2",
      createdAt: new Date(),
      updatedAt: new Date()
    },{ 
      username: 'worker',
      managerid:"1",
      email: 'worker@example.com',
      password:"$2b$05$JIpLbe3VV7by8XgiV/a6NuIauBRs9YzeA1ufpBh5qtlxMRXTi6igu",
      userrole:"1" ,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users ', null, {});
  }
};
