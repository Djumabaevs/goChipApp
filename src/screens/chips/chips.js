import React, { Component } from 'react';
import { Button, Container, Icon} from 'native-base';
import {Image} from 'react-native';
import {withApollo} from 'react-apollo';
import Drawer from 'react-native-drawer';

import {getAllChips} from '../../apollo/queries';
import SynHeader from "../../components/layout/header";
import ChipsFilters from './compoents/filters';
import logo from '../digitalIdentity/assets/nfcIco.png';
import SynSubHeader from '../../components/layout/subHeader';
import SynListContainer from '../../components/layout/listContainer';
import {buildVariablesGetAllChips} from '../../apollo/builders';
import ChipItemContainer from './compoents/chipItemContainer'
import SynFooter from '../../components/layout/footer';

class ChipsScreen extends Component {

    constructor(props) {
        super(props);
        this.state ={
            chipsList: undefined,
            orderName: "asc",
            showFilters: false,
            filters: {}
        }
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
                    content={<ChipsFilters
                    close={this.closeFilters}
                    client={this.props.client}
                    filters={this.state.filters}
                    setFilters={(filters)=> this.setState({filters:filters})}
                />}
            >
            <Container>
                <SynHeader title="Devices" navigation={this.props.navigation} />
                <SynSubHeader
                  openFilters={this.openFilters}
                  valueOrder={this.state.orderName}
                  labelOrder={"Name"}
                  changeOrder={this.changeOrder}
                />

                <Button warning style={{position:'absolute', zIndex: 110, bottom:10,right: 115,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("BLE Chip")} >
                    <Icon name="bluetooth-connect" type="MaterialCommunityIcons"/>
                </Button>
                <Button transparent style={{position:'absolute', zIndex: 110, bottom:10,right: 63,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("Scan Chip")} >
                    <Image source={logo} style={{height: 40, width: 50, borderRadius:50}}/>
                </Button>
                <Button success style={{position:'absolute', zIndex: 100, bottom:10,right: 10,borderRadius: 20}}
                        onPress={()=> this.props.navigation.navigate("Add Chip")} >
                    <Icon name="plus" type="FontAwesome"/>
                </Button>

                <SynListContainer
                  gqlQuery={getAllChips}
                  gqlVariables={buildVariablesGetAllChips(this.state.filters, this.state.orderName)}
                  client={this.props.client}
                  itemContainer={ChipItemContainer}
                  keyName="device_uid"
                  dataProps="devices"
                  onAdd={()=>  this.props.navigation.navigate("Add Chip")}
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

const apolloChipsScreen = withApollo(ChipsScreen);
export default apolloChipsScreen;
