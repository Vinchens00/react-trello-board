'use strict';

const Sequalize = require('sequelize');

module.exports = function (sequalize) {
  return sequalize.define('column', {
    name: {
      type: Sequalize.STRING
    }
  });
};
