let env = 'dev'
let baseUrl = ''
if(env === 'dev'){
  baseUrl = ''
} else if(env === 'prod'){
  baseUrl = ''
}
module.exports = {
  baseUrl
}