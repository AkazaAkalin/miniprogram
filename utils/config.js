let env = 'dev'
let baseUrl = ''
if(env === 'dev'){
  baseUrl = 'https://api.douban.com'
} else if(env === 'prod'){
  baseUrl = 'prodbase'
}
module.exports = {
  baseUrl
}