import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  SPACING,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount() {
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
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>        
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
