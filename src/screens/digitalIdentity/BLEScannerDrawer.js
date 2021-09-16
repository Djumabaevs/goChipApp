import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Title,
  View,
  Spinner,
  Toast,
  Form,
} from 'native-base';
import {Dimensions, PermissionsAndroid} from 'react-native';
import {getAllDevices, getGoChipByCode} from '../../apollo/queries';
import {ListElementsBLE} from '../chips/compoents/listElementsBLE';
import {BleManager} from "react-native-ble-plx";


let manager, itemsList = [];
export const BLEScannerDrawer = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    manager = new BleManager();
    manager.setLogLevel("Debug");
  }, [])

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
    setItems([]);
    setSelectedDevice(null);
    const permission = await requestLocationPermission();
    if(permission) {
      setTimeout(()=> {
        setItems(itemsList);
        setLoading(false);
        itemsList = [];
        manager.stopDeviceScan();
      }, 15 * 1000);
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          return Toast.show({
            text: error.message,
            type:"danger",
            duration: 1500
          })
        }
        if(!itemsList.find((item)=> item.id === device.id)){
          itemsList.push(device);
          setItems((prev) => [...prev, device])
        }
      });
    }
  }

  //TODO fix this mockReadBLEDEVICE
  const mockReadBLEDevice = async (device) => {
    manager.stopDeviceScan();
    setLoading(false);
    // itemsList = [];
    // setLoading(false);
    setSelectedDevice(device);
    // Toast.show({
    //   text: "BLE Unauthorized Item!",
    //   type:"danger",
    //   duration: 1500
    // })
    // }
  }

  const handleConnect = (device) => {
    manager.stopDeviceScan();
    setLoading(false);
    setSelectedDevice(device);

    // mockReadBLEDevice(device);
  }

  const readBLEDevice = () => {
    setLoading(true);
    getMock();
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
        scan();
      }
      return () => {
        manager.stopDeviceScan();
        subscription.remove();
      }
    }, true);
  }

  const handleConnectMock = (device) => {
    const _item = mockDevices.find((i)=> i.device_uid === device.id)
    manager.stopDeviceScan();
    setSelectedDevice(device);
    setLoading(false);

    // props.setValue(_item);
    // props.drawer.current.close();
    // Toast.show({
    //   text: `Ble found '${_item.device_name}' ${props.deviceTypeId === 2? "GoChip Collar" : "CityChip"}!`,
    //   type:"success",
    //   duration: 1500
    // })
  }

  const [mockDevices, setMockDevices] = useState([]);
  const getMock = async () => {
    const result = await props.client.query({
      query: getAllDevices,
      variables: {
        where: {
          device_type_id: {_eq: props.deviceTypeId || 4},
          status: {_eq: "0"}
        }
      },
      fetchPolicy: "no-cache",
    });
    if (result && result.data && result.data.devices && result.data.devices.length > 0) {
      setMockDevices(result.data.devices);
    }
  }

  const onConnect = async () => {
    if(selectedDevice._manager){
      const type = props.deviceTypeId || 4;
      let where =  { device_type_id: {_eq: type}, status: {_eq: "0"} };
      if(type === 4) {
        where.city_chips = {
          chip_id: {_eq: selectedDevice.id}
        }
      }
      else {
        where.gochip_collars = {
          serial_number: {_eq: selectedDevice.id}
        }
      }

      const result = await props.client.query({
        query: getAllDevices,
        variables: { where }
      })
      if(result && result.data && result.data.devices.length > 0){
        props.setValue({id: result.data.devices[0].device_uid, name: result.data.devices[0].device_name});
        setSelectedDevice();
        props.drawer.current.close();
      }
      else{
        if(type === 4) {
          where.city_chips = {
            device_id: {_eq: selectedDevice.id}
          }
        }
        else {
          where.gochip_collars = {
            device_id: {_eq: selectedDevice.id}
          }
        }
        const result = await props.client.query({
          query: getAllDevices,
          variables: { where }
        })
        if(result && result.data && result.data.devices.length > 0) {
          props.setValue({id: result.data.devices[0].device_uid, name: result.data.devices[0].device_name});
          setSelectedDevice();
          props.drawer.current.close();
        }
        else
          Toast.show({
            text: "BLE Unauthorized Item!",
            type:"danger",
            duration: 1500
          })
      }
    }
    else {
      props.setValue(selectedDevice);
      setSelectedDevice();
      props.drawer.current.close();
    }
  }


  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => {
            props.onClose();
            props.drawer.current.close();
          } }>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>
            {(props.deviceTypeId === 0 || props.deviceTypeId === undefined)&& "Scan GoChip"}
            {props.deviceTypeId === 2 && "Scan GoChip Collar"}
            {props.deviceTypeId === 4 && "Scan CityChip"}
          </Title>
        </Body>
      </Header>
      <Content padder>
        <View style={{justifyContent: 'center', height: Dimensions.get("window").height- 150}}>
          {!loading &&
          <Form>
            <View style={items.length === 0 && mockDevices.length === 0? {justifyContent: 'center', height: Dimensions.get("window").height - 150}: {}}>
              <Button
                success
                vertical={items.length === 0 && mockDevices.length === 0}
                block={items.length !== 0}
                style={items.length === 0 && mockDevices.length === 0?
                  {marginLeft: "auto", marginRight: "auto", maxHeight: 320}
                  :
                  {padding: 50}
                }
                onPress={readBLEDevice}>
                <Icon name="bluetooth-searching" type="MaterialIcons"
                      style={items.length === 0 && mockDevices.length === 0? {fontSize: 280} : {} }/>
                <Text style={{width: "100%"}}> Scan BLE Device </Text>
              </Button>
            </View>
          </Form>
          }
          <Content>
            {mockDevices && mockDevices.length > 0 && <ListElementsBLE
              handleConnect={handleConnectMock}
              device={selectedDevice}
              items={[{id: mockDevices[0].device_uid, name: mockDevices[0].device_name}]}
            />
            }
          <ListElementsBLE
            handleConnect={handleConnect}
            device={selectedDevice}
            items={items}
          />
            {selectedDevice &&
            <View>
              <Text> ID: {selectedDevice.id} </Text>
              <Text> Name: {selectedDevice.name} </Text>
              {selectedDevice.manufacturerData && <Text> Manufacturer Data: {selectedDevice.manufacturerData} </Text>}

              <Button success block onPress={onConnect}>
                <Text>
                  Connect
                </Text>
              </Button>
            </View>}
          {loading && <Spinner />}
          </Content>
        </View>
      </Content>
    </Container>
  );
}
