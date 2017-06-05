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
    bannerImgArr = ['http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg','http://avatar.csdn.net/8/6/0/1_jing85432373.jpg'];
    findDataArr =[{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第一张",price:'12.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.012.0'},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第二张",price:'12.0'},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第三张",price:'12.0'}];
    this.state = {
      dataSource:ds,
      activeDataArr :[{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第一张",price:'12.0'},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第二张",price:'12.0'},{image:'http://avatar.csdn.net/8/6/0/1_jing85432373.jpg',title:"第三张",price:'12.0'}],
    }
  }
  requestHomeData (){

    global.network.getData('N044',{},(responseData)=>{
        console.log('requestSuccess',responseData);
    },(error)=>{
      console.log('requestFail',error);
    });
  }
  componentDidMount() {
    this.requestHomeData();
  }
  render() {
    return (
      <View style={{width:ScreenWidth,height:global.device.containerHeight(false,true)}}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
             <View style={styles.horizGap} >
            </View>
            {this.creatBestSellerListView()}
            <View style={styles.horizGap}></View>
            {this.creatFindView()}
        </ScrollView>
      </View>
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
          <View>
            <Text style={styles.iconText}>
            {'· 热销优品 ·'}
            </Text>
            <ListView 
              horizontal={true}
              style={styles.activeListView}
              showsHorizontalScrollIndicator={false}
              dataSource={this.state.dataSource.cloneWithRows(this.state.activeDataArr)}
              renderRow={this.activeCellWithData.bind(this)}
            />
          </View>
          );

      }
      
      creatFindView(){
        return(
          <View>
            <Text style={styles.iconText}>
              {'· 发现生活 ·'}
            </Text>
            <View style={styles.findBackView}>
              {this.creatFindCell()}
            </View>
          </View>

          );
      }

      creatFindCell(){
        let viewArr = [];
        for (let i = 0; i < findDataArr.length; i++) {
          let itemData = findDataArr[i];
          viewArr.push(
            <View key={i} style={styles.findCell}>
              <Image style={styles.findeImage} source={{uri:itemData['image']}}></Image>
              <View>
                <Text style={styles.findTitle}>{itemData['title']}</Text>
                <Text style={styles.findDetail} numberOfLines={3}>{itemData['price']}</Text>
              </View>
            </View>
          );
        }
        return viewArr
      }

      activeCellWithData(item){
        let imageUrl = item.image
        let title = item.title
        let price = item.price
        console.log(imageUrl,title)
        return(
          <View style={styles.activeCell} click>
            <Image style={styles.activeImages} source={{uri:imageUrl}}>
            </Image>
            <Text style={styles.activeTitle}>
              {title}
            </Text>
            <Text style={styles.activePrice}>
              {'¥' + price}
            </Text>
          </View>

        )
      }
      
      renderImg(){  
            let imageViews=[];  
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
          let iconImageViewsArr = [];
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
    width:ScreenWidth,
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
      // width:54,
      // height:54,
  },
  iconText:{
    fontSize:14,
    textAlign:'center',
    color:'#212121',
    marginTop:5,
    marginBottom:5,
  },
  activeListView:{
    width:ScreenWidth,
  },
  iconBackView:{
    height:80,
    justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
  },
  activeCell:{
    marginLeft:10,
    marginTop:5,
    marginBottom:10,
    borderRadius:3,
    borderWidth:1,
    borderColor:'#dedede',
  },
  activeImages:{
    width: ScreenWidth /2 - 20 - 50,
    height:(ScreenWidth /2 - 20 - 50) * 3 / 4,
  },

  activeTitle:{
    fontSize:14,
    textAlign:'left',
    color:'#212121',
    marginTop:5,
    marginBottom:5,
    marginLeft:5,
  },
  
  activePrice:{
    fontSize:12,
    marginBottom:5,
    textAlign:'left',
    color:'#ff6138',
    marginLeft:8,
  },
  horizGap:{
    width:ScreenWidth,
    height:10,
    marginBottom:5,
    marginTop:5,
    backgroundColor:'#f2f2f2',
  },
  horzLine:{
    width:ScreenWidth,
    height:1,
    backgroundColor:'#dedede',
  },
  findeImage:{
    width:120,
    height:80,
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
  },
  findCell:{
    flexDirection:'row',
    width:ScreenWidth,
    height:100,
    borderWidth:0.5,
    borderColor:'#dedede',
    backgroundColor:'white',
  },
  findTitle:{
    marginTop:10,
    marginLeft:12,
    fontSize:16,
    color:'#212121',
  },
  findDetail:{
    marginTop:5,
    marginLeft:12,
    paddingRight:10,
    fontSize:14,
    color:'#808080',
  },
  findBackView:{
    borderWidth:1,
    borderColor:'#dedede',
    width:ScreenWidth,
    backgroundColor:'red',
  },
  
})
module.exports = Home;
