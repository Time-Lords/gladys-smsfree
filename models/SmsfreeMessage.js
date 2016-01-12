'use strict';

module.exports = {
  attributes: {
    message:{
      type: 'string',
      required: true
    },
    statusCode: {
      type: 'integer',
      required: true
    },
    config: {
      model: 'SmsfreeConfig',
      required: true
    },
    user:{
      model: 'User',
      required:true
    }
  }
};
