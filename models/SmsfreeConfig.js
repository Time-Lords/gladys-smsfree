'use strict';

module.exports = {
  attributes: {
    apiUser:{
      type: 'integer',
      required: true
    },
    apiPass: {
      type: 'string',
      required: true
    },
    user:{
      model: 'User',
      required:true,
      unique:true
    }
  }
};
