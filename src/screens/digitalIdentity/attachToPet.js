import React, {createContext, useEffect, useRef, useState} from 'react';
import {withApollo} from 'react-apollo';
import {Form, Container, Card, CardItem, Left, Icon, Body, H3, Text, Fab, Button, Label, Item, Toast, View} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import Drawer from 'react-native-drawer';


import SynHeader from '../../components/layout/header';
import {FormItem} from '../../newComponents/form/FormItem';
import {NFCScannerContainer} from './NFCScannerContainer';
import {
  getAllPetTypes,
  getAllPets,
  getAllLicenseTypes,
  getAllDevices,
  getJobTypes,
  getParameters,
} from '../../apollo/queries';
import {BLEScannerDrawer} from './BLEScannerDrawer';
import {addJob, addJobParams, addLicense, addPetDevice} from '../../apollo/mutations';
import {v4 as uuidv4} from 'uuid';
import logo from './assets/nfcIco.png';
import SelectPetContainer from './components/selectPetContainer';
import SelectDevicesContainer from './components/selectDevicesContainer';
import SuccessContainer from './components/successContainer';

const AttachToPetScreen = (props) => {
  const [screen, setScreen] = useState("Select Pet");
  const [pet, setPet] = useState();

  if(screen === "Select Pet")
    return(
      <SelectPetContainer
        client={props.client}
        navigation={props.navigation}
        changeScreen={setScreen}
        setPet={setPet}
      />
      );

  if(screen === "Select Devices")
    return (
      <SelectDevicesContainer
        client={props.client}
        navigation={props.navigation}
        petUid={pet.pet_uid}
        changeScreen={setScreen}
        setPet={setPet}
        vet={props.vet}
      />
    )

  if(screen === "Success")
    return (
      <SuccessContainer
        navigation={props.navigation}
        title="Attach To Pet"
        onContinue={() => props.navigation.navigate("Home")}
        onBack={() => props.navigation.navigate("Home")}
      />
    )
  return null;
}

const apolloAttachToPetScreen = withApollo(AttachToPetScreen);
export default apolloAttachToPetScreen;
