import React, {useState, useEffect} from 'react';
import {Button, Container, Content, Form, Icon, Text, View, Spinner, Toast} from 'native-base';
import {Dimensions, PermissionsAndroid} from 'react-native';
import { BleManager } from 'react-native-ble-plx';


import SynHeader from '../../components/layout/header';
import {ListElementsBLE} from './compoents/listElementsBLE';
import SynFooter from '../../components/layout/footer';

let manager, itemsList = [];

export const ScanBLEDevice  = (props) => {
    const [loading, setLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [items, setItems] = useState([]);


    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              // {
              //     title: "Cool Photo App Camera Permission",
              //     message:
              //       "Cool Photo App needs access to your camera " +
              //       "so you can take awesome pictures.",
              //     buttonNeutral: "Ask Me Later",
              //     buttonNegative: "Cancel",
              //     buttonPositive: "OK"
              // }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
            // if () {
            //     console.log("You can use the camera");
            // } else {
            //     console.log("Camera permission denied");
            // }
        } catch (err) {
            console.warn(err);
        }
        // try {
        //    return await RNLocation.requestPermission({
        //         ios: "whenInUse",
        //         android: {
        //             detail: "coarse"
        //         }
        //     })
        // } catch (err) {
        //     console.warn(err);
        //     return false;
        // }
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
                    console.log("error", error)
                    return Toast.show({
                        text: error.message,
                        type:"danger",
                        duration: 1500
                    })
                }
                if( !itemsList.find((item)=> item.id === device.id)){
                    itemsList.push(device);
                    setItems((prev) => [...prev, device])
                }
            });
        }
    }

    const handleConnect = (device) => {
        manager.stopDeviceScan();
        props.navigation.navigate("Add Chip", {device_id: device.id})
    }

    useEffect(()=>{
       manager = new BleManager();
       manager.setLogLevel("Debug");
    }, [])

    const readBLEDevice = () => {
        setLoading(true);
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
    return (
        <Container>
            <SynHeader
              title="Scan GoChip"
              navigation={props.navigation}
              onClose={() => props.navigation.navigate("Chips")}
            />
            <Content padder>
                {!loading &&
                <Form>
                    <View style={items.length === 0 && {justifyContent: 'center', height: Dimensions.get("window").height - 150}}>
                        <Button
                            success
                            vertical={items.length === 0}
                            block={items.length !== 0}
                            style={items.length === 0?
                                {marginLeft: "auto", marginRight: "auto", height: 320}
                                :
                                {padding: 50}
                            }
                            onPress={readBLEDevice}>
                            <Icon name="bluetooth-searching" type="MaterialIcons"
                                  style={items.length === 0  && {fontSize: 280} }/>
                            <Text style={{width: "100%"}}> Scan BLE Device </Text>
                        </Button>
                    </View>
                </Form>
                }
                <ListElementsBLE
                    handleConnect={handleConnect}
                    device={selectedDevice}
                    items={items}
                />
                {loading && <Spinner />}
            </Content>
            <SynFooter
              onBack={() => props.navigation.navigate("Devices")}
              // onCancel={() => props.navigation.navigate("Home")}
            />
        </Container>
    );
}
