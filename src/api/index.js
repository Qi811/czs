import axios from 'axios';
import { Loading } from 'element-ui';
import qs from 'qs';

axios.defaults.baseURL = 'http://192.168.0.15:8080/externalApi';
axios.defaults.timeout = 5000;
// axios.defaults.headers.common['token'] = token

// var instance = axios.create({
//   baseURI:'http://jsonplaceholder.typicode.com',
//   timeout:5000
// })

var loadings;
//请求拦截器
axios.interceptors.request.use(function(config){
  //对每次加载数据之前添加一个弹窗
  loadings = Loading.service();
  // console.log(config)
  if(config.method.toLowerCase() == 'post'){
    config.data = qs.stringify(config.data)
  }
  return config;
},function(error){
  //对数据请求失败的处理
  return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(function(config){
  //关闭弹窗
  loadings.close();
  return config;
},function(error){
  //对数据请求失败的处理
  loadings.close();
  return Promise.reject(error);
})

export default axios
