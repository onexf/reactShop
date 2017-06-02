/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class NetTool extends Component {
    editParams (params){
      var finalParams = {};
      var radomStr = this.net_genRandomString();
      var timeStamp = this.net_getTimeStamp();
      var requestDataString = JSON.stringify(params);

      finalParams['methodId'] = params['methodId'];
      finalParams['methodParam'] = requestDataString;
      finalParams['nonce'] = radomStr;
      finalParams['timestamp'] = timeStamp;
      finalParams["appid"] = "RN";
      finalParams["appkey"] = "innjia2016111701";
      var sign = this.signParama(finalParams);
      finalParams["signature"] = sign;

      // reqParam["signature"] =
      console.log(radomStr,timeStamp,requestDataString);
      return params;
    }
    signParama(params){
        var keysArr = Object.keys(params).sort();
        for (var i = 0; i < keysArr.length; i++) {
          var key = keysArr[i];
          var value = params[key];
          
        }
        return "";
    }
    net_genRandomString(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var millisecond = date.getMilliseconds();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
          day = "0" + day;
      }
      if (hour>=0 && hour <=9)
      {
        hour = "0" + day;
      }
      if (minute >= 0 && minute <=9)
      {
        minute = "0" + minute;
      }
      if (second >=0 && second <=9)
      {
        second = "0" + second;
      }
      if (millisecond >=0 && millisecond <=9)
      {
        millisecond = "00" + millisecond;
      }
      else if (millisecond >=10 && millisecond <=99)
      {
        millisecond = "0" + millisecond;
      }
      var currentdate = year + month + day
       + hour + minute+ second + millisecond;
      return currentdate;
    }
    net_getTimeStamp(){
      var date = new Date();
      return Date.parse(date);
    }
}
module.exports = NetTool;
