import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialButtonHamburger from "../components/MaterialButtonHamburger";
import MaterialChipBasic from "../components/MaterialChipBasic";
import MaterialIconTextButtonsFooter from "../components/MaterialIconTextButtonsFooter";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>GoChip Digital Identity</Text>
        <View style={styles.imageRow}>
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
      <View style={styles.materialButtonHamburgerRow}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger}
        ></MaterialButtonHamburger>
        <MaterialChipBasic style={styles.materialChipBasic}></MaterialChipBasic>
      </View>
      <MaterialIconTextButtonsFooter
        style={styles.materialIconTextButtonsFooter}
      ></MaterialIconTextButtonsFooter>
      <View style={styles.materialButtonHamburger1Row}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger1}
        ></MaterialButtonHamburger>
        <MaterialChipBasic
          style={styles.materialChipBasic1}
        ></MaterialChipBasic>
      </View>
      <View style={styles.materialButtonHamburger2Row}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger2}
        ></MaterialButtonHamburger>
        <MaterialChipBasic
          style={styles.materialChipBasic2}
        ></MaterialChipBasic>
      </View>
      <View style={styles.materialButtonHamburger3Row}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger3}
        ></MaterialButtonHamburger>
        <MaterialChipBasic
          style={styles.materialChipBasic3}
        ></MaterialChipBasic>
      </View>
      <View style={styles.materialButtonHamburger4Row}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger4}
        ></MaterialButtonHamburger>
        <MaterialChipBasic
          style={styles.materialChipBasic4}
        ></MaterialChipBasic>
      </View>
      <View style={styles.materialButtonHamburger5Row}>
        <MaterialButtonHamburger
          style={styles.materialButtonHamburger5}
        ></MaterialButtonHamburger>
        <MaterialChipBasic
          style={styles.materialChipBasic5}
        ></MaterialChipBasic>
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
    marginLeft: 69,
    marginTop: 6
  },
  imageRow: {
    height: 83,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 7,
    marginRight: 26
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
  },
  materialButtonHamburger: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22
  },
  materialButtonHamburgerRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 23,
    marginRight: 144
  },
  materialIconTextButtonsFooter: {
    height: 56,
    width: 375,
    marginTop: 420,
    marginLeft: -3
  },
  materialButtonHamburger1: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic1: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22,
    marginTop: 2
  },
  materialButtonHamburger1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: -435,
    marginLeft: 23,
    marginRight: 144
  },
  materialButtonHamburger2: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic2: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22,
    marginTop: 2
  },
  materialButtonHamburger2Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 116,
    marginLeft: 23,
    marginRight: 144
  },
  materialButtonHamburger3: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic3: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22
  },
  materialButtonHamburger3Row: {
    height: 36,
    flexDirection: "row",
    marginTop: -112,
    marginLeft: 23,
    marginRight: 144
  },
  materialButtonHamburger4: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic4: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22,
    marginTop: 2
  },
  materialButtonHamburger4Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 187,
    marginLeft: 23,
    marginRight: 144
  },
  materialButtonHamburger5: {
    height: 36,
    width: 36,
    overflow: "scroll",
    backgroundColor: "rgba(128,181,133,1)"
  },
  materialChipBasic5: {
    width: 150,
    height: 32,
    backgroundColor: "rgba(208,239,175,1)",
    marginLeft: 22
  },
  materialButtonHamburger5Row: {
    height: 36,
    flexDirection: "row",
    marginTop: -112,
    marginLeft: 23,
    marginRight: 144
  }
});

export default Untitled;