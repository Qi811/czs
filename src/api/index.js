import axios from 'axios';
import { Loading } from 'element-ui';
import qs from 'qs';

// axios.defaults.baseURL = 'http://192.168.0.15:8080/externalApi';
axios.defaults.baseURL = 'http://47.99.210.93:8080/externalApi';
axios.defaults.timeout = 5000;
// axios.defaults.headers.common['token'] = token

// var instance = axios.create({
//   baseURI:'http://jsonplaceholder.typicode.com',
//   timeout:5000
// })

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
 var config = err.config;
 // If config does not exist or the retry option is not set, reject
 if(!config || !config.retry) return Promise.reject(err);
 // Set the variable for keeping track of the retry count
 config.__retryCount = config.__retryCount || 0;
 // Check if we've maxed out the total number of retries
 if(config.__retryCount >= config.retry) {
  // Reject with the error
  return Promise.reject(err);
 }
 // Increase the retry count
 config.__retryCount += 1;
 // Create new promise to handle exponential backoff
 var backoff = new Promise(function(resolve) {
  setTimeout(function() {
   resolve();
  }, config.retryDelay || 1);
 });
 // Return the promise in which recalls axios to retry the request
 return backoff.then(function() {
  return axios(config);
 });
});



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
