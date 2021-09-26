import React, {useEffect, useState} from 'react';
import {Container, Content, H2, H3, Icon, Spinner} from 'native-base';
import {getPet} from '../../apollo/queries';
import SynHeader from '../../components/layout/header';
import {Image, ScrollView, StyleSheet, View, Button, 
  SafeAreaView, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const License = (props) => {
  const [pet, setPet] = useState();
  const _getPet = async () => {
    const {data} = await props.client.query({
      query: getPet,
      variables:{
        pet_uid: props.petUid
      },
      fetchPolicy: "no-cache",
    });
   if(data){
     setPet(data.pets[0])
   }
  }

  useEffect(() => {_getPet()}, [props.petUid]);

  if(pet){
    return (

          <Container>
        <ScrollView>
      <View style={styles.container2}>
        {props.onBack && <SynHeader
          title={pet.pet_name}
          navigation={props.navigation}
          onClose={props.onBack}
        />
        }
    
        <View style={styles.rect}>
        <Text style={styles.loremIpsum}>GoChip Digital Identity</Text>
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
        <View style={styles.imageRow}>
        {pet.pet_photo && <Image source={{uri: pet.pet_photo}} style={styles.image2}  resizeMode="contain" /> }
            {!pet.pet_photo &&
            <Icon name={pet.dogs.length > 0? "dog" : "cat"} type="FontAwesome5" style={{...styles.image2, ...styles.image2}}/>
            }
             {pet.dogs.length > 0 && <>

            <Text style={styles.loremIpsum2}>
            Name:  {pet.pet_name} {"\n"}
            Breed:  {pet.dogs[0].dogs_breed.breed_name} {"\n"}
            Color: {pet.dogs[0].colour.capitalize()}{"\n"}
            Gender: {pet.dogs[0].gender.capitalize()}{"\n"}
            Weight: {pet.dogs[0].weight} kg

            </Text>
          </>
          }
          {pet.cats.length > 0 && <>
            <Text style={styles.loremIpsum2}> 
            Name:  {pet.pet_name} {"\n"}
            Breed: {pet.cats[0].cats_breed.breed_name}{"\n"}
            Color: {pet.cats[0].colour.capitalize()}{"\n"}
            Gender: {pet.cats[0].gender.capitalize()}{"\n"}
            Weight: {pet.cats[0].weight} kg
            </Text>
          </>
          }
           <MaterialCommunityIconsIcon
            name="qrcode-scan"
            style={styles.icon}
          ></MaterialCommunityIconsIcon>
          </View>
          <View style={styles.loremIpsum3Row}> 

          
          <Text style={styles.loremIpsum3}>ISO: 1273876792840920</Text>
          <MaterialIconsIcon
            name="security"
            style={styles.icon2}
          ></MaterialIconsIcon>
          </View>
       </View>
      </View>
    <View >
    <Button title="Go" onPress={()=>{
        
    }}/>
    </View>  

    <Image source={require('./license.png')} />

</ScrollView>

</Container>
  
    )
  }
  return(
    <Container>
      <Spinner/>
    </Container>
  );
  }
  
  const styles = StyleSheet.create({
    image:{width:100, height:100, borderRadius: 80, marginLeft: 120, marginRight:"auto", marginTop: 30, marginBottom: 15 },
    centered:{ marginLeft: 150, marginTop: 0, marginRight: 15},
    cust:{marginLeft: 10, marginTop:10, marginBottom: 15},
    icon:{fontSize: 110, borderWidth: 5, padding: 10 },
    container2: {
      flex: 1
    },
    title: {
        fontSize:18,
        justifyContent:'center',
        alignContent:'center',
        paddingLeft: 45,
        color:'#0063FF'
    },
    spacer: {
      paddingTop:10,
      paddingLeft:20
    },
    picker: {
      fontSize:15,
      fontWeight: 'bold',
      color:'black'
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
      backgroundColor: 'orange',
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
      backgroundColor: "#C4C4C447",
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
      marginLeft: 6,
      
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
  
   export default License;