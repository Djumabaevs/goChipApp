import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Container, Item, Input, Button, Form, Label, View} from 'native-base';
import {launchImageLibrary} from "react-native-image-picker";
import ImgToBase64 from 'react-native-image-base64';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import SynHeader from '../../components/layout/header';
import {getAllBreeds, getAllPetTypes} from '../../apollo/queries';
import {addPet} from '../../apollo/mutations';
import SynFooter from '../../components/layout/footer';

class AddPetScreen extends Component {

    state = {
        gender: "male",
        pet: "",
        name:"",
        breed_id: undefined,
        colour: "",
        weight: "",
        breeds: [],
        types: [],
        photo: undefined
    }

    componentDidMount(){
        this._getBreeds();
        this._getAllPetTypes();
    }

    _getBreeds = async () => {
      const {data} = await this.props.client.query({
            query: getAllBreeds,
            fetchPolicy: "no-cache",
        });
      this.setState({breeds: data})
    }
    _getAllPetTypes = async () => {
      const {data} = await this.props.client.query({
            query: getAllPetTypes,
            fetchPolicy: "no-cache",
        });
      this.setState({types: data.pets_types})
    }

    save = async () => {
        let{breeds, types, pet, name, photo, ...dataToSave} = this.state;
        let data = {
            pet_uid: uuidv4(),
            pet_name: name,
            pet_type_id: types.find((p)=> p.pet_type_name === pet).pet_type_id,
            pet_photo: photo
        }
        if(pet === "cat"){
            dataToSave.breed_id = dataToSave.breed_id || breeds.cats_breeds[0].breed_id
            data.cats = { data: dataToSave }
        }

        if(pet === "dog"){
            dataToSave.breed_id = dataToSave.breed_id || breeds.dogs_breeds[0].breed_id
            data.dogs = { data: dataToSave }
        }

        await this.props.client.mutate({
            mutation: addPet,
            variables: {pet: data},
            fetchPolicy: "no-cache",
        });
        if(this.props.navigation.state.params && this.props.navigation.state.params.from === "digitalIdentity")
            this.props.navigation.navigate("Digital Identity");
        else
            this.props.navigation.navigate("Pets");
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        launchImageLibrary(options, res => {
            if(res.uri)
                ImgToBase64.getBase64String(res.uri)
                    .then(base64String => this.setState({photo: `data:image/jpeg;base64,${base64String}`}) );
        });
    }

    render() {
        return (
            <Container>
                <SynHeader
                  title="Add Pet"
                  navigation={this.props.navigation}
                  onClose={() => this.props.navigation.navigate("Pets")}
                />
                <ScrollView>
                <Form>
                    <Item>
                        <Label>Pet    </Label>
                        <View style={{ flex: 1 }}>
                            <Picker
                                style={{marginLeft: 75}}
                                mode="dropdown"
                                placeholder="Select Pet"
                                selectedValue={this.state.pet}
                                onValueChange={(key)=> this.setState({pet:key})}
                            >
                                {this.state.types.map((item, index) =>
                                    <Picker.Item key={index} label={item.pet_type_name.capitalize()} value={item.pet_type_name} />
                                )}
                            </Picker>
                        </View>
                    </Item>
                    <Item>
                        <Label>Gender</Label>
                        <View style={{ flex: 1 }}>
                            <Picker
                                style={{marginLeft: 65}}
                                mode="dropdown"
                                placeholder="Select Gender"
                                selectedValue={this.state.gender}
                                onValueChange={(key)=> this.setState({gender:key})}
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </View>
                    </Item>
                    {this.state.pet === "cat" && this.state.breeds.cats_breeds &&
                    <Item>
                        <Label>Breed</Label>
                        <View style={{flex: 1}}>
                            <Picker
                                style={{marginLeft: 75}}
                                mode="dropdown"
                                placeholder="Select Breed"
                                selectedValue={this.state.breed_id}
                                onValueChange={(key) => this.setState({breed_id: key})}
                            >
                                {this.state.breeds.cats_breeds.map((item, index) =>
                                    <Picker.Item key={index} label={item.breed_name} value={item.breed_id}/>
                                )}
                            </Picker>
                        </View>
                    </Item>
                    }
                    {this.state.pet === "dog" &&
                    <Item>
                        <Label>Breed</Label>
                        <View style={{flex: 1}}>
                            <Picker
                                style={{marginLeft: 75}}
                                mode="dropdown"
                                placeholder="Select Breed"
                                selectedValue={this.state.breed_id}
                                onValueChange={(key) => this.setState({breed_id: key})}
                            >
                                {this.state.breeds.dogs_breeds.map((item, index) =>
                                    <Picker.Item key={index} label={item.breed_name} value={item.breed_id}/>
                                )}
                            </Picker>
                        </View>
                    </Item>
                    }
                    <Item fixedLabel>
                        <Label>Name</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> this.setState({name:value})}/>
                    </Item>
                    <Item fixedLabel>
                        <Label>Color</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> this.setState({colour:value})}/>
                    </Item>
                    <Item fixedLabel>
                        <Label>Weight</Label>
                        <Input type="number" style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> this.setState({weight:value})}/>
                    </Item>
                    <View style={{marginTop: 5, marginLeft: "auto", marginRight:"auto"}}>
                    {this.state.photo &&
                        <Image
                        source={{uri: this.state.photo}}
                        style={{width:200, height:200 }}
                        />
                    }
                        <Button info transparent onPress={this.handleChoosePhoto} >
                            <Text>
                                Choose Photo
                            </Text>
                        </Button>
                    </View>
                </Form>
                </ScrollView>

                <SynFooter
                  onBack={() => this.props.navigation.navigate("Pets")}
                  onCancel={() => this.props.navigation.navigate("Home")}
                  onContinue={this.save}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({

});


const apolloAddPetScreen = withApollo(AddPetScreen);
export default apolloAddPetScreen;
