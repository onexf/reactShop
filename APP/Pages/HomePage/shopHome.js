/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper'


const ScreenWidth = Dimensions.get('window').width;

class ShopHome extends Component {
  constructor(props) {
    super(props); 
    images = ['http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg'];
  }
  requestHomeData (){
    global.network.getHomeData('/getpicture',{'pictureid':'0','height':'800'},(responseData)=>{
        // console.log('requestSuccess',responseData.data);
    },(error)=>{
      // console.log('requestFail',error);
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.requestHomeData();
  }
  render() {
    return (
      <View style={styles.container}>
          <Swiper style={styles.swaper}  
            height={ScreenWidth * 3 / 4} 
            width={ScreenWidth}  
            horizontal={true} 
            loop={true} 
            index={0} 
            autoplay={true}         
            dot={<View style={styles.doitNormal} />}
            activeDot={<View style={styles.doitSelect} />}
            paginationStyle={[styles.paginStlye,{marginLeft:ScreenWidth - (images.length * 10 + 15),
    width:images.length * 10 + 15}]}
            >
            {this.renderImg()}
          </Swiper>
      </View>
    );
  }
      itemTouched(item){
          Ations.push

      }

      renderImg(){  
            var imageViews=[];  
            for(var i=0;i<images.length;i++){  
                imageViews.push(  
                    <Image  
                        key={i}  
                        style={{flex:1}}  
                        source={{uri:images[i]}}  
                        />  
                );  
            }  
            return imageViews;  
        }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  doitNormal:{
      backgroundColor: 'red',
      width: 5,
      height: 5,
      borderRadius: 4, 
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3, 
      marginBottom: 3
  },
  
  doitSelect:{
    backgroundColor: 'yellow',
    width: 8,
    height: 8,
    borderRadius: 4,
    justifyContent:'flex-end',
  },
  paginStlye:{
    backgroundColor:'rgba(0,0,0,0.3)',
  },
  banner:{
    
  },
   slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }

})
module.exports = ShopHome;
