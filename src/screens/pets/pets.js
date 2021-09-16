import React, { Component } from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Left,
    Right,
    List,
    ListItem,
    Icon,
    View,
    Text,
    Header,
    H3,
    Spinner
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {withApollo} from 'react-apollo';
import {Picker} from '@react-native-picker/picker';
import Drawer from 'react-native-drawer';

import {getAllPets, getAllStatuses} from "../../apollo/queries"
import SynHeader from "../../components/layout/header";
import PetFilters from './compoents/filters';
import SynFooter from '../../components/layout/footer';
import SynSubHeader from '../../components/layout/subHeader';
import SynListContainer from '../../components/layout/listContainer';
import {buildVariablesGetAllPet} from '../../apollo/builders';
import PetItemContainer from './compoents/petItemContainer';

let statuses = {};

class PetsScreen extends Component {

    constructor(props) {
        super(props);
        this.state ={
            petsList: undefined,
            orderName: "asc",
            showFilters: false,
            filters: {}
        }
    }

    closeFilters = () => {
        this._drawer.close()
    };
    openFilters = () => {
        this.setState({showFilters: !this.state.showFilters},
          () => this._drawer.open())
    };

    changeOrder = (key) => {
        this.setState({orderName:key})
    }

    render() {
        return (
            <Drawer side="right"
                    ref={(ref) => this._drawer = ref}
                    content={<PetFilters
                    close={this.closeFilters}
                    client={this.props.client}
                    filters={this.state.filters}
                    setFilters={(filters)=> this.setState({filters:filters}, //() => this._getPets()
                    )}
                />}
            >
            <Container>
                <SynHeader title="Pets" navigation={this.props.navigation} />
                <SynSubHeader
                  openFilters={this.openFilters}
                  labelOrder={"Name"}
                  valueOrder={this.state.orderName}
                  changeOrder={this.changeOrder}
                />

                <Button success style={{position:'absolute', zIndex: 100, bottom:10,right: 10,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("Add Pet")} >
                    <Icon name="plus" type="FontAwesome"/>
                </Button>
                <SynListContainer
                  gqlQuery={getAllPets}
                  gqlVariables={buildVariablesGetAllPet(this.state.filters, this.state.orderName)}
                  client={this.props.client}
                  itemContainer={PetItemContainer}
                  keyName="pet_uid"
                  dataProps="pets"
                  onAdd={()=>  this.props.navigation.navigate("Add Pet")}
                  navigation={this.props.navigation}
                />
            </Container>
            <SynFooter
              onBack={() => this.props.navigation.navigate("Home")}
            />
            </Drawer>
        )
    }
}


const apolloPetsScreen = withApollo(PetsScreen);
export default apolloPetsScreen;
