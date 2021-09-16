import React, { Component } from 'react';
import { Button, Container, Icon } from 'native-base';
import {withApollo} from 'react-apollo';
import Drawer from 'react-native-drawer';

import {getAllLicenseTypes} from '../../apollo/queries';
import SynHeader from "../../components/layout/header";
import LicenseFilters from './compoents/filters';
import SynSubHeader from '../../components/layout/subHeader';
import SynListContainer from '../../components/layout/listContainer';
import {buildVariablesGetAllLicenseTypes} from '../../apollo/builders';
import LicenseItemContainer from './compoents/licenseItemContainer';
import SynFooter from '../../components/layout/footer';

class LicensesScreen extends Component {

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
                content={<LicenseFilters
                close={this.closeFilters}
                client={this.props.client}
                filters={this.state.filters}
                setFilters={(filters)=> this.setState({filters:filters})}
            />}
        >
            <Container>
                <SynHeader title="Licenses" navigation={this.props.navigation} />
                <SynSubHeader
                  openFilters={this.openFilters}
                  labelOrder={"Name"}
                  valueOrder={this.state.orderName}
                  changeOrder={this.changeOrder}
                />

                <Button success style={{position:'absolute', zIndex: 100, bottom:10,right: 10,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("Add License")} >
                    <Icon name="plus" type="FontAwesome"/>
                </Button>

                <SynListContainer
                  gqlQuery={getAllLicenseTypes}
                  gqlVariables={buildVariablesGetAllLicenseTypes(this.state.filters, this.state.orderName)}
                  client={this.props.client}
                  itemContainer={LicenseItemContainer}
                  keyName="license_type_id"
                  dataProps="license_types"
                  onAdd={()=>  this.props.navigation.navigate("Add License")}
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

const apolloLicensesScreen = withApollo(LicensesScreen);
export default apolloLicensesScreen;
