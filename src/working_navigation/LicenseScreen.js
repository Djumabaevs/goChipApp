import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet, Image, ScrollView} from 'react-native';
import {Text, Container, Spinner, Content, Icon, H3} from 'native-base';
import {decode as atob, encode as btoa} from 'base-64';


import SynHeader from '../../components/layout/header';
import {getPet} from '../../apollo/queries';
import SynFooter from '../../components/layout/footer';
import PetDetailsChart from './PetDetailsChart';

class LicenseScreen extends Component {

    state = {
        pet: undefined
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.navigation.state.params.id !== this.props.navigation.state.params.id) {
            this.setState({pet: undefined}
              // ,()=> this._getPet()
            );
        }
        return true;
    }




    render() {
        let {pet} = this.state;
        return (
            <Container>
                 <SynHeader title="City License" navigation={this.props.navigation} />
                <PetDetailsChart
                  {...this.props}
                  petUid={this.props.navigation.state.params.id}
                  onBack={() => this.props.navigation.navigate("Pets")}
                />
                <SynFooter
                  onBack={() => this.props.navigation.navigate("Pets")}
                  onCancel={() => this.props.navigation.navigate("Home")}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    image:{width:150, height:150, borderRadius: 100, marginLeft:"auto", marginRight:"auto", marginTop: 10 },
    centered:{ marginLeft: "auto", marginRight: "auto"},
    icon:{fontSize: 110, borderWidth: 5, padding: 10 },
});


const apolloLicenseScreen = withApollo(LicenseScreen);
export default apolloLicenseScreen;