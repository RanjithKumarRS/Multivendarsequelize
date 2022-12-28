'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => { 
        await queryInterface.addConstraint("Logs",{
          fields:["userid"],
          type:"foreign key",
          name:"user_logs_associate",
          references:{
            table:"Users",
            field:"id"
          }
        }) 
    });
  },
 
  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async t => { 
      await queryInterface.removeConstraint("Logs",{
        fields:["userid"],
        type:"foreign key",
        name:"user_logs_associate",
        references:{
          table:"Users",
          field:"id"
        }
      }) 
    });
  }
};
