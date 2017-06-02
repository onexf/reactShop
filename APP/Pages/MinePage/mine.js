/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';

import {Actions} from 'react-native-router-flux'

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
class Mine extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        fixData: ds.cloneWithRows(['订单1', '订单2','订单3', '订单4','订单5', '订单6','订单7', '订单8','订单9']),
        userInfo:{'icon':require('../../Image/icon.jpeg'),'nickName':'周源'},
        contentOffsetY:0,
      };
  }

  componentWillMount() {

  }
  headerView(){
    return(
      <View style={[styles.header]}>
        <Image source={this.state.userInfo.icon} style={styles.icon}/>
        <Text style={styles.name}>{this.state.userInfo.nickName}</Text>
      </View>
    )
  }
  itemCell(item){
    return(
      <TouchableHighlight onPress={()=>{console.log({item});}}>
        <View style = {styles.item}>
        <Text>{item}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  scrollViewDidScroll(e){
    this.setState({
      contentOffsetY:e.nativeEvent.contentOffset.y
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerBaseView,{height:300-this.state.contentOffsetY,marginTop:global.device.marginTop()}]}></View>
        <ListView
        style = {{marginTop:global.device.marginTop(true),height:global.device.containerHeight(true,true)}}
        dataSource={this.state.fixData}
        renderRow={this.itemCell}
        renderHeader={this.headerView.bind(this)}
        contentContainerStyle={styles.list}
        onScroll = {this.scrollViewDidScroll.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  headerBaseView:{
    width:ScreenWidth,
    position:'absolute',
    backgroundColor:'#DE3E59',
  },
  listView:{
    height:ScreenHeight-64-49,
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item:{
    width:ScreenWidth/3,
    height:ScreenWidth/3,
    backgroundColor:'#f6f6f6',
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    width:ScreenWidth,
    height:200,
    backgroundColor:'#DE3E59',
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    width:60,
    height:60,
    borderRadius : 30,
  },
  name:{
    fontSize:30,
    marginTop:15,
    color:'white'
  },

})
module.exports = Mine;
