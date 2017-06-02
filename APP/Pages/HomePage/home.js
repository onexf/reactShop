/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Text,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';

import Swiper from 'react-native-swiper'
import ShopHome from './shopHome.js'
import GoodsDetail from './goodsDetail.js'
import {Scene, Router,Actions} from 'react-native-router-flux';

const ScreenWidth = Dimensions.get('window').width;

class Home extends Component {
  constructor(props) {
    super(props); 
    var ds =new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    iconImgArr = [require('../../Image/homepage_list_1.png'),require('../../Image/homepage_list_2.png'),require('../../Image/homepage_list_3.png'),require('../../Image/homepage_list_4.png')];
    iconTitleArr = ['商城首页','发现','待收货','我的钱包'];
    activeDataArr = [{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第一张"},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第二张"},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第三张"}];
    bannerImgArr = ['http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg'];
  }
  requestHomeData (){
    global.network.getHomeData('/getpicture',{'pictureid':'0','height':'800'},(responseData)=>{
        // console.log('requestSuccess',responseData.data);
    },(error)=>{
      // console.log('requestFail',error);
    });
  }
  componentDidMount() {
    this.requestHomeData();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
          <Swiper style={styles.swaper}  
            height={ScreenWidth * 3 / 4} 
            width={ScreenWidth}  
            horizontal={true} 
            loop={true} 
            index={0} 
            autoplay={true}         
            dot={<View style={styles.doitNormal} />}
            activeDot={<View style={styles.doitSelect} />}
            paginationStyle={[styles.paginStlye,{marginLeft:ScreenWidth - (bannerImgArr.length * 10 + 15),
    width:bannerImgArr.length * 10 + 15}]}
            >
            {this.renderImg()}
          </Swiper>
          <View style={styles.iconBackView}> 
            {this.iconViews()}
          </View>
          {this.creatBestSellerListView()}
      </ScrollView>
    );
  }
      itemTouched(index){

      }

      iconTouched(index){
          if (index == 0) {
            Actions.goodsDetail();
          }
          else if (index == 1) {
            Actions.findHome();
          }
      }
      creatBestSellerListView(){
        return (
          <ListView 
            dataSource={this.activeDataArr}
            renderRow={(rowData)=> }
          />
    
          );

      }
      
      renderImg(){  
            var imageViews=[];  
            for(let i=0;i<bannerImgArr.length;i++){  
                imageViews.push( 
                <TouchableWithoutFeedback key={i} onPress={()=>{this.itemTouched(i)}}> 
                    <Image  
                        key={i}  
                        style={{flex:1}}  
                        source={{uri:bannerImgArr[i]}}  
                        />  
                </TouchableWithoutFeedback>
                );  
            }  
            return imageViews;  
        }  

      iconViews(){
          var iconImageViewsArr = [];
          for (let i = 0; i < iconImgArr.length; i++) {
            iconImageViewsArr.push(
              <View key={i}>
              <TouchableWithoutFeedback key={i} onPress={()=>{this.iconTouched(i)}}>
                <Image
                style={styles.iconView}
                source={iconImgArr[i]}
                >
                </Image>
              </TouchableWithoutFeedback>
              <Text style={styles.iconText}>
                {iconTitleArr[i]}
              </Text>
              </View>
              );

          }
        return iconImageViewsArr;
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  
  iconView:{
      width:54,
      height:54,
      
  },
  iconText:{
    fontSize:14,
    textAlign:'center',
    color:'#212121',
  },
  iconBackView:{
    height:80,
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
  },

})
module.exports = Home;
