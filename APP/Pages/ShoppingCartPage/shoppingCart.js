/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

class ShoppingCart extends Component {
  constructor(props) {

    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var cartData = [];
    global.storage.load({key:'cart'}).then(ret =>{
      cartData = ret;
      this.setState({
        data:ds.cloneWithRows(cartData)
      });
      this.reloadData();
    })

    this.state = {
      data: ds.cloneWithRows(cartData),
      selectAll:false,
      totalMoney:0,
    };
  }
  componentWillMount() {
    Actions.refresh({
        leftTitle:'重置',
        onLeft:()=>{
          global.storage.save({
            key:'cart',
            data:[{img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4131228929,902310714&fm=23&gp=0.jpg',title:'一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨',price:4.98,count:1,selected:false},{img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4131228929,902310714&fm=23&gp=0.jpg',title:'一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨',price:5.98,count:1,selected:false},{img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4131228929,902310714&fm=23&gp=0.jpg',title:'一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨',price:6.98,count:1,selected:false},{img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4131228929,902310714&fm=23&gp=0.jpg',title:'一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨一斤鸭梨',price:7.98,count:1,selected:false}],
            expires:null
          });
          global.storage.load({key:'cart'}).then(ret =>{
            cartData = ret;
            this.setState({
              data:ds.cloneWithRows(cartData)
            });
            this.reloadData();
          })
        }
    });
  }
  plus(item){
    item.item.count++;
    this.reloadData();
  }
  reduce(item){
    if (item.item.count<=1) {
      this.showDeleteAlert(item);
      return ;
    }
    item.item.count--;
    this.reloadData();
  }
  selected(item){
    var data = this.state.data._dataBlob.s1;
    item.item.selected = !item.item.selected;
    this.reloadData();

  }
  selectedAll(){
    var data = this.state.data._dataBlob.s1;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      item.selected = !this.state.selectAll;
    }
    this.reloadData();
    this.setState({
      selectAll:!this.state.selectAll
    })
  }
  toPay(){
    var selectedData = [];
    var data = this.state.data._dataBlob.s1;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item.selected)
      {
        selectedData.push(item);
      }
    }
    if (selectedData.length==0)
    {
        this.showNormalAlert('没有选中有效商品');
    }
    else {
      Actions.placeOrder();
    }
  }

  reloadData(){
    var data = this.state.data._dataBlob.s1;
    this.saveCartData();
    this.setState({
      data:this.state.data.cloneWithRows(JSON.parse(JSON.stringify(this.state.data._dataBlob.s1)))
    });
    this.caculateMoney();
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item.selected == false)
      {
        this.setState({
          selectAll:false
        });
        return;
      }
    }

    this.setState({
      selectAll:true
    });

  }
  saveCartData(){
    var data = this.state.data._dataBlob.s1;
    global.storage.save({
      key:'cart',
      data:data
    });
  }
  showNormalAlert(title){
    Alert.alert(
      title,
      '',
      [
        {text:'确定',onPress:()=>{}},
      ]
    )
  }
  showDeleteAlert(item){
    Alert.alert(
      '您确定删除该商品么？',
      '',
      [
        {text:'取消',onPress:()=>{}},
        {text:'删除',onPress:()=>{this.deleteItem(item)}}
      ]
    )
  }
  deleteItem(item){
    var data = this.state.data._dataBlob.s1;
    data.remove(item.item);
    this.reloadData();
  }
  caculateMoney(){
    var money = 0;
    var data = this.state.data._dataBlob.s1;
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item.selected) {
        money += item.price * item.count;
      }
    }
    this.setState({
      totalMoney:money.toFixed(2)
    });
  }
  itemCell(item){

    var selected = item.selected;
    var selectIcon = selected?require('../../Image/cart_checkbox_yes.png'):require('../../Image/cart_checkbox_no.png');
    return(
      <View style = {styles.item}>
        <TouchableWithoutFeedback onPress={()=>{this.selected({item})}}>
          <Image style={styles.itemSelect} source = {selectIcon}/>
        </TouchableWithoutFeedback>
        <Image style={styles.itemImage} source={{'uri':item.img}}/>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.itemPrice} numberOfLines={1}>￥{item.price}</Text>
          <View style={styles.itemEdit}>
            <Text onPress={()=>{this.reduce({item})}} style ={styles.itemReduce}>-</Text>
            <Text style = {styles.itemCount}>{item.count}</Text>
            <Text onPress={()=>{this.plus({item})}} style ={styles.itemPlus}>+</Text>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    );
  }
  render() {

    if (this.state.data._dataBlob.s1.length == 0)
    {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>您还没有添加任何商品</Text></View>

      );
    }
    var selectedIcon = this.state.selectAll?require('../../Image/cart_checkbox_yes.png'):require('../../Image/cart_checkbox_no.png');
    return (
      <View style={styles.container}>
        <ListView
        enableEmptySections = {true}
        style = {{marginTop:global.device.marginTop(true),height:global.device.containerHeight(true,true)-40}}
        dataSource={this.state.data}
        renderRow={this.itemCell.bind(this)}
        contentContainerStyle={styles.list}
        />
        <View style={styles.settlementBar}>
          <TouchableWithoutFeedback onPress={()=>{this.selectedAll()}}>
            <Image style={styles.settlementSelectAll} source={selectedIcon}/>
          </TouchableWithoutFeedback>
          <Text style = {styles.settlementAllText}>全选</Text>
          <View style={styles.settlementTotalBox}>
            <Text style={styles.settlementTotalMoney} numberOfLines={1}>合计￥{this.state.totalMoney}</Text>
            <Text style={styles.settlementExPress}>运费￥0</Text>
          </View>
          <TouchableWithoutFeedback onPress={()=>{this.toPay()}}>
            <View style={styles.settlementPayBox}>
              <View style={styles.settlementPayInnerBox}>
                <Text style={styles.settlementPayInnerBoxTitle}>去结算 </Text>
                <Text style={styles.settlementPayInnerBoxSymbol}> ▶</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  item:{
    justifyContent:'center',
    height:100,
  },
  itemSelect:{
    position:'absolute',
    width:20,
    height:20,
    top:40,
    left:10,
  },
  itemImage:{
    width:70,
    height:70,
    borderRadius:35,
    borderWidth:1,
    borderColor:'#DE3E59',
    marginLeft:50,
  },
  itemInfo:{
    left:150,
    width:ScreenWidth-150,
    height:80,
    position:'absolute',
    justifyContent:'space-around'
  },
  itemTitle:{
    width:ScreenWidth-180,
  },
  itemPrice:{
    color:'#DE3E59'
  },
  itemEdit:{
    position:'absolute',
    width:70,
    height:30,
    top:50,
    right:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  itemReduce:{
    fontSize:16,
    width:16,
    height:16,
    borderRadius:8,
    borderColor:'#DE3E59',
    borderWidth:1,
    overflow:'hidden',
    textAlign:'center',
    lineHeight:16,
    color:'#DE3E59',
  },
  itemCount:{
    fontSize:20,
    color:'#DE3E59',
  },
  itemPlus:{
    fontSize:16,
    width:16,
    height:16,
    borderRadius:8,
    overflow:'hidden',
    textAlign:'center',
    lineHeight:16,
    color:'white',
    backgroundColor:'#DE3E59',
  },
  line:{
    left:30,
    width:ScreenWidth-30,
    height:1,
    position:'absolute',
    bottom:0,
    backgroundColor:'#DEDEDE'
  },
  settlementBar:{
    width:ScreenWidth,
    height:40,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#dedede'
  },
  settlementSelectAll:{
    left:10,
    width:20,
    height:20,
  },
  settlementAllText:{
    marginLeft:20,
  },
  settlementTotalBox:{
    marginLeft:10,
    width:100,
    height:40,
    justifyContent:'space-around'
  },
  settlementTotalMoney:{
    fontSize:14
  },
  settlementExPress:{
    fontSize:10
  },
  settlementPayBox:{
    position:'absolute',
    right:0,
    width:120,
    height:40,
    backgroundColor:'#DE3E59',
    justifyContent:'center',
    alignItems:'center',
  },
  settlementPayInnerBox:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  settlementPayInnerBoxTitle:{
    color:'white',
    fontSize:16
  },
  settlementPayInnerBoxSymbol:{
    color:'white',
    fontSize:10,
  }
})
module.exports = ShoppingCart;
