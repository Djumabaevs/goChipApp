import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";


function details(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>GoChip Digital Identity</Text>
        <View style={styles.imageRow}>
        <Button title="Details" />
          <Image
            source={require("../assets/images/sensor.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <Text style={styles.loremIpsum2}>
            Name: Bob{"\n"}Breed: colie{"\n"}Gender: Male{"\n"}DateId: 23.04.21
            {"\n"}Status: alive
          </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 355,
    height: 187,
    backgroundColor: "rgba(176,201,145,1)",
    marginTop: 58,
    marginLeft: 11
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 11,
    marginLeft: 96
  },
  image: {
    width: 105,
    height: 77,
    marginTop: 6
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
    marginTop: 15
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
    marginLeft: 117
  },
  loremIpsum3Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 17,
    marginRight: 26
  }
});

export default details;







<Text style={styles.cust}>Hello, I am {pet.pet_name} a {pet.pets_type.pet_type_name}!</Text>
         
             
<PetDevicesList petDevices={pet.pets_devices} city_licenses={pet.city_licenses}/>
{props.children}