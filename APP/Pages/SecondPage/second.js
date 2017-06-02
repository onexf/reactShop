/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {MapView,MapTypes,Geolocation}from 'react-native-baidu-map';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
class Second extends Component {
  constructor() {
    super();
    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 	121.48,
        latitude: 31.22,
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: []
    };
  }
  componentWillMount() {
    this.getUserLocation();
  }
  render() {
    return (
      <MapView
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={[styles.map,{height:global.device.containerHeight(true,true),marginTop:global.device.marginTop(true)}]}
          onMarkerClick={(e) => {
            console.log(e);
          }}
          onMapClick={(e) => {
          }}
        >
        </MapView>
    );
  }
  getUserLocation(){
    Geolocation.getCurrentPosition()
              .then(data => {
                this.setState({
                  zoom: 15,
                  markers: [{
                    latitude: data.latitude-Math.random()%0.02,
                    longitude: data.longitude+Math.random()%0.02,
                    title: '测试1'
                  },{
                    latitude: data.latitude+Math.random()%0.02,
                    longitude: data.longitude-Math.random()%0.02,
                    title: '测试2'
                  },{
                    latitude: data.latitude+Math.random()%0.02,
                    longitude: data.longitude+Math.random()%0.02,
                    title: '测试3'
                  },{
                    latitude: data.latitude-Math.random()%0.02,
                    longitude: data.longitude-Math.random()%0.02,
                    title: '测试4'
                  }],
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    rand: Math.random()
                  }
                });
              })
              .catch(e =>{
                console.warn(e, 'error');
              })
  }
}
const styles = StyleSheet.create({

  map:{
    width:ScreenWidth
  }
})
module.exports = Second;
