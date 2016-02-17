import _ from 'lodash'

module.exports = _.merge({},
  require( '!!json-loader!./sass-var-json-loader.js!../styles/_colors.scss' )
)