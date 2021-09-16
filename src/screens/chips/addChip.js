import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet} from 'react-native';
import {Text, Container, Item, Input, Button, Form, Label, View} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import SynHeader from '../../components/layout/header';
import {getAllDevicesTypes, getAllManufacturers} from '../../apollo/queries';
import {addChip} from '../../apollo/mutations';
import SynFooter from '../../components/layout/footer';

class AddChipScreen extends Component {

    state = {
        batch_number: "",
        model_number: "",
        serial_number: "",
        iso: "",
        nfc: "",
        device_id: "",
        device_name: "",
        device_type_id: "",
        manufacturer_uid: "",
        types: [],
        manufacturers: []
    }

    componentDidMount(){
        this._getAllTypes();
        this._getAllManufacturers();
        this.setStateFromParams();
    }

    setStateFromParams = () => {
        if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.nfc){
            this.setState({...this.state, nfc:this.props.navigation.state.params.nfc, device_type_id: 0})
        }
        if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.device_id){
            this.setState({...this.state, device_id:this.props.navigation.state.params.device_id, device_type_id: 2})
        }
    }

    _getAllTypes = async () => {
      const {data} = await this.props.client.query({
            query: getAllDevicesTypes,
            fetchPolicy: "no-cache",
        });
      const types = data.devices_types.filter((type) => type.device_type_id !== 3);
      this.setState({...this.state, types})
    }
    _getAllManufacturers = async () => {
      const {data} = await this.props.client.query({
            query: getAllManufacturers,
            fetchPolicy: "no-cache",
        });
      this.setState({manufacturers: data.manufacturers})
    }

    save = async () => {
        let{manufacturers, types, ...dataToSave} = this.state;
        let data = {
            device_uid: uuidv4(),
            device_name: this.state.device_name,
            device_type_id: this.state.device_type_id,
            manufacturer_uid: this.state.manufacturer_uid || this.state.manufacturers[0].manufacturer_uid,
            status: 0
        }
        if(this.state.device_type_id === 0){
            data.gochips = {
                data: {
                    iso: this.state.iso,
                    model_number: this.state.model_number,
                    nfc: this.state.nfc,
                    serial_number: this.state.serial_number,
                    batch_number: this.state.batch_number,
                    status: 0
                }
            }
        }
        if(this.state.device_type_id === 1){
            data.chips = {
                data: {
                    iso: this.state.iso,
                    model_number: this.state.model_number,
                    serial_number: this.state.serial_number,
                    batch_number: this.state.batch_number,
                    status: 0
                }
            }
        }
         if(this.state.device_type_id ===2){
                    data.gochip_collars = {
                        data: {
                            model_number: this.state.model_number,
                            serial_number: this.state.serial_number,
                            batch_number: this.state.batch_number,
                            device_id: this.state.device_id,
                            status: 0
                        }
                    }
                }

        if(this.state.device_type_id === 4){
            data.city_chips = {
                data: {
                    device_id: this.state.device_id,
                    model_number: this.state.model_number,
                    serial_number: this.state.serial_number,
                    batch_number: this.state.batch_number
                }
            }
        }
        await this.props.client.mutate({
            mutation: addChip,
            variables: {chip: data},
            fetchPolicy: "no-cache",
        });
        if(this.props.navigation.state.params && this.props.navigation.state.params.from === "digitalIdentity")
            this.props.navigation.navigate("Digital Identity");
        else
            this.props.navigation.navigate("Devices");
    }

    render() {
        const showItem =  [0,1,2,4].includes(this.state.device_type_id);
        return (
          <>
            <Container>
                <SynHeader
                  title="Add Chip"
                  navigation={this.props.navigation}
                  onClose={() => this.props.navigation.navigate("Devices")}
                />
                <Form>
                    <Item>
                        <Label>Type                 </Label>
                        <View style={{ flex: 1 }}>
                            <Picker
                                style={{marginLeft: 75}}
                                mode="dropdown"
                                placeholder="Select Type"
                                selectedValue={this.state.device_type_id}
                                onValueChange={(key)=> this.setState({...this.state, device_type_id:key})}
                            >
                                {this.state.types.map((item, index) =>
                                    <Picker.Item key={index} label={item.device_type_name.capitalize()} value={item.device_type_id} />
                                )}
                            </Picker>
                        </View>
                    </Item>
                    {showItem &&
                    <Item>
                        <Label>Manufacturer</Label>
                        <View style={{flex: 1}}>
                            <Picker
                                style={{marginLeft: 75}}
                                mode="dropdown"
                                placeholder="Select Manufacturer"
                                selectedValue={this.state.manufacturer_uid}
                                onValueChange={(key) => this.setState({...this.state, manufacturer_uid: key})}
                            >
                                {this.state.manufacturers.map((item, index) =>
                                    <Picker.Item key={index} label={item.manufacturer_name.capitalize()}
                                                 value={item.manufacturer_uid}/>
                                )}
                            </Picker>
                        </View>
                    </Item>
                    }
                    {showItem &&
                    <Item fixedLabel>
                        <Label>Name</Label>
                        <Input style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => this.setState({...this.state, device_name: value})}/>
                    </Item>
                    }
                    {showItem &&
                    <Item fixedLabel>
                        <Label>Batch Number</Label>
                        <Input style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => this.setState({...this.state, batch_number: value})}/>
                    </Item>
                    }
                    {showItem &&
                    <Item fixedLabel>
                        <Label>Model Number</Label>
                        <Input type="number" style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => this.setState({...this.state, model_number: value})}/>
                    </Item>
                    }
                    {showItem &&
                    <Item fixedLabel>
                        <Label>Serial Number</Label>
                        <Input type="number" style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => this.setState({...this.state, serial_number: value})}/>
                    </Item>
                    }
                    {[0,1].includes(this.state.device_type_id) &&
                    <Item fixedLabel>
                        <Label>ISO</Label>
                        <Input type="number" style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => this.setState({...this.state, iso: value})}/>
                    </Item>
                    }
                    {this.state.device_type_id === 0 &&
                    <Item fixedLabel>
                        <Label>NFC</Label>
                        <Input type="number" style={{marginTop: 5, marginRight: 15}} value={this.state.nfc}
                               onChangeText={(value) => this.setState({...this.state, nfc: value})}/>
                    </Item>
                    }

                    {[2,4].includes(this.state.device_type_id) &&
                    <Item fixedLabel>
                        <Label>Device Id</Label>
                        <Input style={{marginTop: 5, marginRight: 15}} value={this.state.device_id}
                               onChangeText={(value) => this.setState({...this.state, device_id: value})}/>
                    </Item>
                    }
                </Form>
            </Container>
              <SynFooter
                onBack={() => this.props.navigation.navigate("Devices")}
                onCancel={() => this.props.navigation.navigate("Home")}
                onContinue={this.save}
                disabledContinue={!showItem && this.state.device_type_id !== 3}
              />
          </>
        )
    }
}

const styles = StyleSheet.create({

});


const apolloAddChipScreen = withApollo(AddChipScreen);
export default apolloAddChipScreen;
