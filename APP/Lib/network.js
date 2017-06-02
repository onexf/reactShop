import{Component} from'react';
import NetTool from './netTool.js'
let HOST = 'http://api.baby233.com';

export default class Network extends Component {
  constructor(props) {
    super(props);
    this.netTool = new NetTool();
  }
  getHomeData(api,params,successHander,failHander){
      fetchData1(HOST,api,params,'GET',successHander,failHander);
  }
}

const fetchData1 = (host,api,params,method,successHander,failHander)=>{
  params['methodId'] = api;
  params = this.network.netTool.editParams(params);
   if (method == 'GET')
   {
     fetchDataGet(host,api,params,successHander,failHander);
   }
   else if (method == 'POST')
   {
     fetchDataPost(host,api,params,successHander,failHander);
   }
}



//host example:http://rn.innjia.com
//api example:/getHomeListData
//params 参数
//successHander 成功回调
//failHander 失败回调
const fetchDataGet = (host,api,params,successHander,failHander)=>{
  var url = host + api;
  var i = 0;
  for (var key in params) {
    if(i == 0)
    {
      url += ('?'+key+'='+params[key]);
    }
    else
    {
      url += ('&'+key+'='+params[key]);
    }
    i++;
  }
  console.log(url);
  fetch(url,{
    method:"GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json()).then((responseData)=>{
    successHander(responseData);
  })
  .catch((error)=>{
    failHander(error);
  })
}

//host example:http://rn.innjia.com
//api example:/getHomeListData
//params 参数
//successHander 成功回调
//failHander 失败回调
const fetchDataPost = (host,api,params,successHander,failHander)=>{
  fetch(host+api,{
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(params)
  }).then((response) => response.json()).then((responseData)=>{
    successHander(responseData);
  })
  .catch((error)=>{
    failHander(error);
  })
}
