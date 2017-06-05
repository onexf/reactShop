import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
} from 'react-native';
import {Router,Scene,Modal,Actions} from 'react-native-router-flux'
import Storage from 'react-native-storage'
import Home from './Pages/HomePage/home.js'
import ShopHome from './Pages/HomePage/shopHome.js'
import FindHome from './Pages/HomePage/findHome.js'
import GoodsDetail from './Pages/HomePage/goodsDetail.js'
import Second from './Pages/SecondPage/second.js'
import ShoppingCart from './Pages/ShoppingCartPage/shoppingCart.js'
import PlaceOrder from './Pages/ShoppingCartPage/placeOrder.js'
import Mine from './Pages/MinePage/mine.js'
import Login from './Pages/MinePage/login.js'
import Setting from './Pages/MinePage/setting.js'
import Device from './Lib/device.js'
import Network from './Lib/network.js';
//tabbar button样式
class TabbarItem extends Component {
  render(){
    var icon ;
    if (this.props.title == '首页') {
      icon = !this.props.selected?require('./Image/tabbar_home.png'):require('./Image/tabbar_home_selected.png')
    }
    else if (this.props.title == '发现')
    {
      icon = !this.props.selected?require('./Image/tabbar_find.png'):require('./Image/tabbar_find_selected.png')
    }
    else if (this.props.title == '购物车')
    {
      icon = !this.props.selected?require('./Image/tabbar_cart.png'):require('./Image/tabbar_cart_selected.png')
    }
    else if (this.props.title == '我的')
    {
      icon = !this.props.selected?require('./Image/tabbar_space.png'):require('./Image/tabbar_space_selected.png')
    }

    return(
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image style = {{width:25,height:25,marginBottom:0}} source = {icon}/>
        <Text style={{color:this.props.selected?'#DE3E59':'black',marginBottom:0,fontSize:10}}>{this.props.title}</Text>
      </View>
    )
  };
}
//Root样式
export default class Root extends Component {
  constructor(props) {
    super(props);
    //net工具对象
    global.network = new Network();
    global.device = new Device();
    global.storage = new Storage({
      size:1000,
      storageBackend:AsyncStorage,
      defaultExpires:null,
      enableCache:true,
      sync:{

      }
    })

  }
  render() {
    return(
      <Router>
       <Scene key="modal" component={Modal}>
         <Scene key="root">
           <Scene key="lg" direction = "vertical" navigationBarStyle = {styles.navBarColor}>
             <Scene key="login" component={Login} title="登陆" />
           </Scene>
           <Scene key = "tabbar" initial tabs={true}  tabBarStyle = {styles.tabbarColor}>
             <Scene key = 'item1' title = '首页' icon = {TabbarItem} hideNavBar>
               <Scene key="homepage" component={Home} title="首页"/>
               <Scene key="shophome" component={ShopHome} title="商城" hideTabBar hideNavBar={false}/>
               <Scene key="goodsDetail" component={GoodsDetail} title="商品详情" hideTabBar hideNavBar={false}/>
               <Scene key="findHome" component={FindHome} title="发现" hideTabBar hideNavBar={false}/>
             </Scene>
             <Scene key = 'item2' title = '发现' icon = {TabbarItem} navigationBarStyle = {styles.navBarColor}>
               <Scene key="发现" component={Second} title="发现" titleStyle={styles.title}/>
             </Scene>
             <Scene key = 'item3' title = '购物车' icon = {TabbarItem} navigationBarStyle = {styles.navBarColor} >
               <Scene key="shoppingcart" component={ShoppingCart} title="购物车" titleStyle={styles.title} />
               <Scene key="placeOrder" component={PlaceOrder} title = '下单' titleStyle={styles.title} hideTabBar/>
             </Scene>
             <Scene key = 'item4' title = '我的' icon = {TabbarItem} navigationBarStyle = {styles.navBarColor}>
               <Scene key="mine" component={Mine} title="" leftTitle= '设置'
                leftButtonTextStyle = {styles.leftButton} onLeft= {()=>{Actions.setting()}}
               />
               <Scene key="setting" component={Setting} title="设置" titleStyle={styles.title} hideTabBar/>
             </Scene>
           </Scene>
         </Scene>
       </Scene>
     </Router>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    navBarColor:{
      backgroundColor:'#DE3E59',
    },
    tabbarColor:{
      backgroundColor:'#ffffff'
    },
    title:{
      color:'white'
    },
    leftButton:{
      marginTop:5,
      fontSize:14,
      color:'white',
    }
});
