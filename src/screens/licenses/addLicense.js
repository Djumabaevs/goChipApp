import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet} from 'react-native';
import {Text, Container, Item, Input, Button, Form, Label, View} from 'native-base';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import SynHeader from '../../components/layout/header';
import {addLicenseType} from '../../apollo/mutations';
import {getAllLicenseTypes} from '../../apollo/queries';
import SynFooter from '../../components/layout/footer';
// import {Picker} from '@react-native-picker/picker';
// import {getAllPets, getAllCities, getAllLicenseTypes, getMaxLicenseId} from '../../apollo/queries';

class AddLicenseScreen extends Component {
    state = {
        license_type_name: "",
        // city_license_uid: uuidv4(),
        // license_id: uuidv4(),
        // pet_uid: undefined,
        // city_uid: undefined,
        // license_type_id: undefined,
        // effective_from: new Date(),
        // effective_to: new Date(),
        // cost_paid: 0,
        // pets: [],
        // cities: [],
        // types: []
    }

    componentDidMount() {
        // this.getPets();
        // this.getCities();
        // this.getLicenses();
        // this.getMaxLicense();
    }

    // getPets = async () => {
    //     const {data} = await this.props.client.query({
    //         query: getAllPets,
    //         orderType: "desc",
    //         where: {},
    //         fetchPolicy: "no-cache",
    //     });
    //     this.setState({...this.state, pets: data.pets})
    // }
    //
    // getCities = async () => {
    //     const {data} = await this.props.client.query({
    //         query: getAllCities,
    //         fetchPolicy: "no-cache",
    //     });
    //     if(data.cities && data.cities.length > 0)
    //     this.setState({...this.state, cities: data.cities})
    // }
    //
    // getLicenses = async () => {
    //     const {data} = await this.props.client.query({
    //         query: getAllLicenseTypes,
    //         fetchPolicy: "no-cache",
    //     });
    //     this.setState({...this.state, types: data.license_types})
    // }
    //
    // getMaxLicense = async () => {
    //     const {data} = await this.props.client.query({
    //         query: getMaxLicenseId,
    //         fetchPolicy: "no-cache",
    //     });
    //     if(data && data.city_licenses_aggregate &&
    //       data.city_licenses_aggregate.aggregate && data.city_licenses_aggregate.aggregate.max)
    //         this.setState({...this.state,
    //             license_id: (parseInt(data.city_licenses_aggregate.aggregate.max.license_id)+1).toString()
    //         })
    // }

    save = async () => {
        const {pets, cities, types, ...dataToSave} = this.state
        let id="0";
        const {data} = await this.props.client.query({
            query: getAllLicenseTypes,
            variables: {
                orderType: this.state.orderName,
                where: {}
            },
            fetchPolicy: "no-cache"
        });
        if(data && data.license_types && data.license_types.length > 0){
            id = parseInt(Math.max(...data.license_types.map((item) => item.license_type_id))) + 1;
        }
        await this.props.client.mutate({
            mutation: addLicenseType,
            variables: {license: {...dataToSave, license_type_id: id}},
            fetchPolicy: "no-cache",
        });


        if(this.props.navigation.state.params && this.props.navigation.state.params.from === "digitalIdentity")
            this.props.navigation.navigate("Digital Identity");
        else
            this.props.navigation.navigate("Licenses");
    }

    render() {
        return (
          <>
            <Container>
                <SynHeader
                  title="Add License"
                  navigation={this.props.navigation}
                  onClose={() => this.props.navigation.navigate("Licenses")}
                />
                <Form>
                    <Item fixedLabel>
                        <Label>Name</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               value={this.state.license_type_name}
                               onChangeText={(value)=> this.setState({...this.state, license_type_name:value})}/>
                    </Item>
                </Form>
            </Container>

          <SynFooter
            onBack={() => this.props.navigation.navigate("Licenses")}
            onCancel={() => this.props.navigation.navigate("Home")}
            disabledContinue={!this.state.license_type_name}
            onContinue={this.save}
          />
          </>
        )
    }
}

const styles = StyleSheet.create({

});


const apolloAddLicenseScreen = withApollo(AddLicenseScreen);
export default apolloAddLicenseScreen;
