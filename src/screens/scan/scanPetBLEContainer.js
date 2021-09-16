import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Icon,
  Left,
  ListItem,
  Right,
  Spinner,
  Text,
  Toast,
  View,
} from 'native-base';
import {BleManager} from "react-native-ble-plx";
import SynHeader from '../../components/layout/header';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {getAllPetsWithCityChipOrGochipCollar, getAllPetsWithCityChipOrGochipCollarById} from '../../apollo/queries';
import {ListElementsBLE} from '../chips/compoents/listElementsBLE';
let manager, itemsList = [];
const ScanPetBLEContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [mockItem, setMockItem] = useState();
  const [BLEItems, setBLEItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(()=>{
    manager = new BleManager();
    manager.setLogLevel("Debug");
  }, [])

  const _getMockData = async () => {
    const result = await props.client.query({ query: getAllPetsWithCityChipOrGochipCollar, fetchPolicy: "no-cache" });
    if(result.data && result.data.pets.length > 0){
      setMockItem(result.data.pets[0])
    }
  }

  const _scanBLEItemsTimer = async () => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOff'){
        setLoading(false);
        return Toast.show({
          text: "Bluetooth is off!",
          type:"danger",
          duration: 1500
        })
      }
      if (state === 'PoweredOn') {
        scan(); }
      return () => {
        manager.stopDeviceScan();
        subscription.remove();
      }
    }, true);
  }


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const scan = async () => {
    setBLEItems([]);
    const permission = await requestLocationPermission();
    if(permission) {
      setTimeout(()=> {
        setBLEItems(itemsList);
        setLoading(false);
        itemsList = [];
        manager.stopDeviceScan();
      }, 15 * 1000);
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log("error", error)
          return Toast.show({
            text: error.message,
            type:"danger",
            duration: 1500
          })
        }
        if(!itemsList.find((item)=> item.id === device.id)){
          itemsList.push(device);
          setBLEItems((prev) => [...prev, device])
        }
      });
    }
  }

  const readBLEDevice = () => {
    setLoading(true);
    _getMockData();
    _scanBLEItemsTimer();
  }

  const handleConnect = async (item) => {
    if(item.id){
      const result = await props.client.query({
        query: getAllPetsWithCityChipOrGochipCollarById,
        variables: {id: item.id},
        fetchPolicy: "no-cache"
      });
      if(result.data && result.data.pets.length > 0){
        setSelectedItem(result.data.pets[0]);
        setMockItem(result.data.pets[0]);
        setLoading(false);
        props.setDisableContiue(false);
        props.setPetUid(result.data.pets[0].pet_uid);
        return;
      }
    }
    Toast.show({
      text: "Device not found!",
      type:"danger",
      duration: 1500
    });
  }

  let scanButton = (
    <View style={{justifyContent: 'center', height: Dimensions.get("window").height- 150}}>
      <View style={{justifyContent: 'center', height: Dimensions.get("window").height - 150}}>
        <Button
          success
          vertical
          block
          style={{marginLeft: "auto", marginRight: "auto", maxHeight: 320}}
          onPress={readBLEDevice}
        >
          <Icon name="bluetooth-searching" type="MaterialIcons" style={{fontSize: 280}}/>
          <Text style={{width: "100%"}}> Scan BLE Device </Text>
        </Button>
      </View>
    </View>
  )
  if(loading || mockItem || BLEItems.length> 0){
    scanButton = (
      <Button success style={{padding: 50}} onPress={readBLEDevice}>
        <Icon name="bluetooth-searching" type="MaterialIcons"/>
        <Text style={{width: "100%"}}> Scan BLE Device </Text>
      </Button>
    )
  }

  return (
    <Container>
      <SynHeader
        title="Scan Pet using BLE"
        navigation={props.navigation}
      />
      {scanButton}
      {mockItem &&
      <ListItem icon button onPress={() =>{
        setSelectedItem(mockItem);
        setLoading(false);
        props.setDisableContiue(false);
        props.setPetUid(mockItem.pet_uid);
      }}>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="bluetooth-transfer" type="MaterialCommunityIcons"/>
          </Button>
        </Left>
        <Body>
          <Text>{mockItem.pets_devices[0].device.device_name}</Text>

        </Body>
        <Right>
          <Icon name="transit-connection" type="MaterialCommunityIcons"/>
        </Right>
      </ListItem>
      }

      <ListElementsBLE
        handleConnect={handleConnect}
        device={{}}
        items={BLEItems}
      />

      {loading && <Spinner />}
      {selectedItem &&

        <View style={{marginLeft:"auto", marginRight:"auto", marginTop:20}}>
          <Text> Pet: {selectedItem.pet_name} </Text>
          {selectedItem.manufacturerData && <Text> Manufacturer Data: {selectedItem.manufacturerData} </Text>}
        </View>
      }


    </Container>
  )
}

export default ScanPetBLEContainer;
