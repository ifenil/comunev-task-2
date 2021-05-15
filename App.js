import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  SPACING,
  StyleSheet,
  Image} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: true,
      isVisible : true,  
    };
  }

  Hide_Splash_Screen=()=>{  
    this.setState({   
      isVisible : false   
    });  
  }  

  componentDidMount() {
    var that = this;  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 5000);  

    const url = 'https://randomuser.me/api/?results=100&inc=name';

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.results,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderSeprator = () => {
    return (
      <View
        style={{ height: 10, width:'100%', backgroundColor: 'white' }}></View>
    );
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          marginBottom: SPACING,
          backgroundColor: '#bbe9fc',
          borderRadius: 25,
        }}>
        <Text style={{ padding: 10, borderRadius: 80,fontFamily:'monospace',backgroundColor:'white',fontWeight:'bold', fontSize:22}}>{item.name.title}</Text>
        <Text style={{ padding: 10 ,fontSize:18}}>{item.name.first}</Text>
        <Text style={{ padding: 10 ,fontSize:18}}>{item.name.last}</Text>
      </View>
    );
  };

  render() {
    let Splash_Screen = (  
      <View style={styles.SplashScreen_RootView}>  
          <View style={styles.SplashScreen_ChildView}>  
                <Image source={{uri:'https://i.ibb.co/ZhBKvsW/noobicon.png'}}  
             style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
         </View>  
      </View> ) 

    return(
      <View style={{ flex: 1, backgroundColor: '#eee' }}>     
        {  
          (this.state.isVisible === true) ? Splash_Screen : null  
        }     
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            padding: SPACING,
          }}
          ItemSeparatorComponent={this.renderSeprator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create(  
  { 
     
      SplashScreen_RootView:  
      {  
          justifyContent: 'center',  
          flex:1,  
          margin: 10,  
          position: 'absolute',  
          width: '100%',  
          height: '100%',  
        },  
     
      SplashScreen_ChildView:  
      {  
          justifyContent: 'center',  
          alignItems: 'center',  
          backgroundColor: '#00BCD4',  
          flex:1,  
      },  
  });  
