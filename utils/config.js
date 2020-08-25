let env = 'dev'
let baseUrl = ''
if(env === 'dev'){
  // 本地服务域名
  baseUrl = 'http://10.33.0.141/'
} else if(env === 'prod'){
  // 上线接口域名 TODO
  baseUrl = 'http://127.0.0.1:8001/'
}
module.exports = {
  baseUrl
}