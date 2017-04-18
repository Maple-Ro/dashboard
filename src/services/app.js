import request from '../utils/request';
export async function login(values) {
  return request('',{ //TODO url
    method:'post',
    data:values
  })
}
export async function logout() {
  return request('',{
    method:'get'
  })
}
export async function info() {
  return request('', {
    method:'get'
  })
}
