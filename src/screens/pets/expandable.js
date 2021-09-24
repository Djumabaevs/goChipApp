import React, {useEffect, useState} from 'react';
import {Container, Content, H2, H3, Icon, Spinner} from 'native-base';
import {getPet} from '../../apollo/queries';
import SynHeader from '../../components/layout/header';
import {Image, ScrollView, StyleSheet, View, Button, 
  SafeAreaView, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
  import PetDevicesList from './petDevicesList';




const CONTENT =[
    {
      isExpanded: false,
      category_name: 'Pet',
      subcategory: [
      
        {id: 1, val: 'Sub 1'},
        {id: 2, val: 'Sub 2'},
        {chipUsed: true, val: "City"}
      ]
    },
    {
      isExpanded: false,
      category_name: 'Guardian',
      subcategory: [
        {id: 3, val: 'Sub 3'},
        {id: 4, val: 'Sub 4'}
      ]
    },
    {
        isExpanded: false,
        category_name: 'Vet',
        subcategory: [
        
          {id: 1, val: 'Sub 1'},
          {id: 2, val: 'Sub 2'}
        ]
      },
      {
        isExpanded: false,
        category_name: 'Vaccine',
        subcategory: [
        
          {id: 1, val: 'Sub 1'},
          {id: 2, val: 'Sub 2'}
        ]
      },
      {
        isExpanded: false,
        category_name: 'City license',
        subcategory: [
        
          {id: 1, val: 'Sub 1'},
          {id: 2, val: 'Sub 2'}
        ]
      },
      {
        isExpanded: false,
        category_name: 'Insurance',
        subcategory: [
        
          {id: 1, val: 'Sub 1'},
          {id: 2, val: 'Sub 2'}
        ]
      },
      {
        isExpanded: false,
        category_name: 'Breeder',
        subcategory: [
        
          {id: 1, val: 'Sub 1'},
          {id: 2, val: 'Sub 2'}
        ]
      }
  
  ]
  
  const ExpandableComponent = ({item, onClickFunction}) => {
    const [layoutHeight, setlayoutHeight] = useState(0);
  
    useEffect(() => {
      if (item.isExpanded) {
        setlayoutHeight(null)
      } else {
        setlayoutHeight(0)
      }
  
    }, [item.isExpanded])
  
    return (
      <View>
        <TouchableOpacity
        style={styles.item}
        onPress={onClickFunction}
        >
          <Text style={styles.itemText}>
            {item.category_name}
          </Text>
  
        </TouchableOpacity>
        <View style={{
          height: layoutHeight,
          overflow: 'hidden'
        }}>
          {
            item.subcategory.map((item, key) => (
              <TouchableOpacity
              key={key}
              style={styles.content}
              >
                <Text style={styles.text}>
                  {key}. {item.val}
                </Text>
                <View style={styles.separator}/>
              </TouchableOpacity>
            ))
          }
  
        </View>
      </View>
    )
  }
  
  const App = () => {
    const [multiSelect, setmultiSelect] = useState(false);
    const [listDataSource, setlistDataSource] = useState(CONTENT);
  
    const updateLayout = (index) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      const array = [...listDataSource]
      if(multiSelect) {
        array[index]['isExpanded'] = !array[index]['isExpanded']
      } else {
        array.map((value, placeindex) => 
        placeindex === index
        ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
        : (array[placeindex]['isExpanded']) = false
        )
      }
      setlistDataSource(array)
  
    }
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container2}>
          <View style={styles.header}>
            <Text style={styles.titleText}>
              Digital Identity details
            </Text>
            <TouchableOpacity
            onPress={() => setmultiSelect(!multiSelect)}
            >
              <Text style={styles.headerButton}>
                {
                  multiSelect
                  ? 'Enable Single \n Expand'
                  : 'Enable Multiple \n Expand'
                }
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
              {
                listDataSource.map((item, key) => (
                  <ExpandableComponent
                  key={item.category_name}
                  item={item}
                  onClickFunction={() => {
                    updateLayout(key)
                  }}
                  />
                ))
              }
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    image:{width:100, height:100, borderRadius: 80, marginLeft: 120, marginRight:"auto", marginTop: 30, marginBottom: 15 },
    centered:{ marginLeft: 150, marginTop: 0, marginRight: 15},
    cust:{marginLeft: 10, marginTop:10, marginBottom: 15},
    icon:{fontSize: 110, borderWidth: 5, padding: 10 },
    container2: {
      flex: 1
    },
    header: {
      flexDirection: 'row', 
      padding: 10
    },
    titleText: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold'
    },
    headerButton: {
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 18
    },
    itemText: {
      fontSize: 16,
      fontWeight: '500'
    },
    item: {
      backgroundColor:  "rgba(176,201,145,1)",
      padding: 20
    },
    content: {
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff'
    },
    text: {
      fontSize: 16,
      padding: 10
    },
    separator: {
      height: 0.5,
      backgroundColor: '#c8c8c8',
      width: '100%'
    },
    rect: {
      width: 368,
      height: 187,
      backgroundColor: "rgba(176,201,145,1)",
      marginTop: 20,
      marginLeft: 11,
      marginBottom: 20,
      marginRight:10
    },
    loremIpsum: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 11,
      marginLeft: 96
    },
    image2: {
      width: 105,
      height: 77,
      marginTop: 6,
      borderRadius: 80
    },
    loremIpsum2: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginLeft: 6
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 40,
      height: 44,
      width: 40,
      marginLeft: 64,
      marginTop: 15, 
      marginRight:"auto"
    },
    imageRow: {
      height: 83,
      flexDirection: "row",
      marginTop: 22,
      marginLeft: 7,
      marginRight: 31
    },
    loremIpsum3: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 20
    },
    icon2: {
      color: "rgba(128,128,128,1)",
      fontSize: 40,
      height: 40,
      width: 40,
      marginLeft: 110,
      marginRight: "auto"
    },
    loremIpsum3Row: {
      height: 40,
      flexDirection: "row",
      marginLeft: 15,
      marginRight: 26
    },
    listItem: {
      padding: 10,
      margin: 10,
      backgroundColor: '#ccc',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 40
    }
    
  });
  
  
  
    export default App;