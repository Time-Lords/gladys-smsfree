'use strict';

module.exports = {
  attributes: {
    name:{
      type: 'string',
      required: true
    },
    message:{
      type: 'string',
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
