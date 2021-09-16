import React, { Component } from 'react';
import { Button, Container, Icon } from 'native-base';
import {withApollo} from 'react-apollo';
import Drawer from 'react-native-drawer';

import {getAllPersons} from '../../apollo/queries';
import SynHeader from "../../components/layout/header";
import PersonFilters from './compoents/filters';
import PersonItemContainer from './compoents/personItemContainer';
import SynSubHeader from '../../components/layout/subHeader';
import {buildVariablesGetAllPersons} from '../../apollo/builders';
import SynListContainer from '../../components/layout/listContainer';
import SynFooter from '../../components/layout/footer';

class PersonsScreen extends Component {

    state ={
        orderName: "asc",
        showFilters: false,
        filters: {}
    }

    closeFilters = () => {
        this._drawer.close()
    };

    openFilters = () => {
        this._drawer.open()
    };

    changeOrder = (key) => {
        this.setState({orderName:key})
    }

    render() {
        return (
            <Drawer side="right"
                    ref={(ref) => this._drawer = ref}
                    content={<PersonFilters
                    close={this.closeFilters}
                    client={this.props.client}
                    filters={this.state.filters}
                    setFilters={(filters)=> this.setState({filters:filters})}
                />}
            >
            <Container>
                <SynHeader title="Persons" navigation={this.props.navigation} />
                <SynSubHeader
                  openFilters={this.openFilters}
                  labelOrder={"Name"}
                  valueOrder={this.state.orderName}
                  changeOrder={this.changeOrder}
                />

                <Button success style={{position:'absolute', zIndex: 100, bottom:10,right: 10,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("Add Person")} >
                    <Icon name="plus" type="FontAwesome"/>
                </Button>

                <SynListContainer
                  gqlQuery={getAllPersons}
                  gqlVariables={buildVariablesGetAllPersons(this.state.filters, this.state.orderName)}
                  client={this.props.client}
                  itemContainer={PersonItemContainer}
                  keyName="person_uid"
                  dataProps="persons"
                  onAdd={()=>  this.props.navigation.navigate("Add Person")}
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


const apolloPersonsScreen = withApollo(PersonsScreen);
export default apolloPersonsScreen;
