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
    iconTitleArr = ['商城首页','发现','待收货','我的钱包'];    
    iconImgArr = [require('../../Image/homepage_list_1.png'),require('../../Image/homepage_list_2.png'),require('../../Image/homepage_list_3.png'),require('../../Image/homepage_list_4.png')];
    this.state = {
      dataSource:ds,      
      bannerImgArr :[],
      findDataArr : [],
      activeDataArr : [],
    }
  }
  //
  requestBannerData (){

    global.network.getData('N045',{"category":"07"},(responseData)=>{
      this.setState({bannerImgArr:responseData});
    },(error)=>{
      console.log('requestFail',error);
    });
  }
  requestActiveData() {
    global.network.getData('1008',{'intCount':4},(responseData)=>{
      this.setState({activeDataArr:responseData['list']});
    },(error)=>{
      console.log('首页活动获取失败'+error);
    });
  }
  
  requestFindData(){
    global.network.getData('N039',{"articleId":'',"isUp":0,"pageSize":3,"pageIndex":"1"},(responseData)=>{
      this.setState({findDataArr:responseData});
    },(error)=>{
      console.log('首页发现获取失败'+error);
    });
  }
  
  componentDidMount() {
    this.requestBannerData();
    this.requestActiveData();
    this.requestFindData();
  }
  render() {
    return (
      <View style={{width:ScreenWidth,height:global.device.containerHeight(false,true)}}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Swiper style={styles.banner}
              width= {ScreenWidth}
              height={(ScreenWidth * 162 / 345)}
              horizontal={true}
              loop={true}
              index={0}
              autoplay={true}
              dot={<View style={styles.doitNormal} />}
              activeDot={<View style={styles.doitSelect} />}
              paginationStyle={[styles.paginStlye,{marginLeft:ScreenWidth - (this.state.bannerImgArr.length * 10 + 20),
      width:this.state.bannerImgArr.length * 10 + 15}]}
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
        let {href} = this.state.bannerImgArr[index];
        if (href.length > 0) {
          
        }
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
              enableEmptySections={true}
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
        for (let i = 0; i < this.state.findDataArr.length; i++) {
          let itemData = this.state.findDataArr[i];
          viewArr.push(
            <View key={i} style={styles.findCell}>
              <Image style={styles.findeImage} source={{uri:itemData['imageUrl']}}></Image>
              <View>
                <Text style={styles.findTitle} numberOfLines={1}>{itemData['title']}</Text>
                <Text style={styles.findDetail} numberOfLines={3}>{itemData['description']}</Text>
              </View>
            </View>
          );
        }
          viewArr.push(
            <View key={3} style={styles.findMoreView}>
              <Text style={styles.findMoreText}>
                {'更多 >'}
              </Text>
            </View>
            );

          viewArr.push(
             <View key={4}>
               <Image style={styles.findNoMore} 
                source={require("../../Image/homepage_end.png")}
              />
            </View>
            )
        return viewArr
      }

      activeCellWithData(item){
        let imageUrl = item.imgUrl
        let title = item.goodsName
        let price = item.goodsPrice
        console.log(imageUrl,title)
        return(
          <View style={styles.activeCell} click>
            <Image style={styles.activeImages} source={{uri:imageUrl}}>
            </Image>
            <Text style={styles.activeTitle} numberOfLines={1}>
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
            for(let i=0;i<this.state.bannerImgArr.length;i++){
                let imgUrl = this.state.bannerImgArr[i]['url'];
                let link = this.state.bannerImgArr[i]['href'];  
                imageViews.push( 
                <TouchableWithoutFeedback key={i} onPress={()=>{this.itemTouched(i)}}> 
                    <Image  
                        key={i}  
                        style={{flex:1}}  
                        source={{uri:imgUrl}}  
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
      backgroundColor: 'rgba(255,255,255,0.3)',
      width: 5,
      height: 5,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
  },

  doitSelect:{
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    justifyContent:'flex-end',
  },
  paginStlye:{
    backgroundColor:'rgba(0,0,0,0.3)',
    borderRadius: 4,
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
    width: ScreenWidth /2 - 20 - 50 + 2,
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
    width:ScreenWidth - 120 - 30,
    marginTop:10,
    marginLeft:12,
    fontSize:16,
    color:'#212121',
  },
  findDetail:{
    width:ScreenWidth - 120 - 30,
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
  findMoreView:{
    width:ScreenWidth,
    height: 30,
    alignItems:'center',  
    backgroundColor:'white',
    justifyContent:'center',
  },
  findMoreText:{
    fontSize:14,
    textAlign:'center',
    color:'#212121',
  },
  findNoMore:{
    backgroundColor:'#f2f2f2',
    width:ScreenWidth,
    height:82,
    resizeMode:'center',
  },
  
})
module.exports = Home;
