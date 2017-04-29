'use strict'

module.exports = (envServiceProvider) => {
  var envConfig = {
    domains: {
      development: ['localhost']
    },
    vars: {
      development: {}
    }
  }
  Object.assign(envConfig.vars.development, window.__env)
  envServiceProvider.config(envConfig)
}
