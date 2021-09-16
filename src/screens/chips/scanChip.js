import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet, Dimensions, Image} from 'react-native';
import {View, Text, Container, Item, Input, Button, Form, Label, Icon, Toast, Content} from 'native-base';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

import SynHeader from '../../components/layout/header';
import {getGoChipByCode} from '../../apollo/queries';
import logo from '../digitalIdentity/assets/nfc.png';
import SynFooter from '../../components/layout/footer';

class ScanChipScreen extends Component {
    constructor(props) {
        super(props);
        this.initNfc();
    }
    state = {
        code: "",
        flagContinue: false
    }
// NFC PART
    initNfc = async () => {
        await NfcManager.start();
    }

    readNdef = () => {
        const cleanUp = () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
            NfcManager.setEventListener(NfcEvents.SessionClosed, null);
        };
        return new Promise((resolve) => {
            let tagFound = null;
            NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
                tagFound = tag;
                if(tagFound && tagFound.id) {
                    console.log(tagFound.id);
                    this.setState({code: tagFound.id}, ()=> this.scan());
                    resolve(tagFound);
                }

                // NfcManager.setAlertMessageIOS('NDEF tag found');
                NfcManager.unregisterTagEvent().catch(() => 0);
            });

            NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
                cleanUp();
                if (!tagFound) {
                    resolve();
                }
            });
            NfcManager.registerTagEvent();
        });
    }
// END NFC PART

    scan = async () => {
        const result = await this.props.client.query({
            query: getGoChipByCode,
            variables: {nfc: this.state.code},
            fetchPolicy: "no-cache",
        });

        if(result.data && result.data.gochips){
            if(result.data.gochips.length > 0)
                Toast.show({text: `Found GoChip  '${this.state.code}'`, type:"success", duration: 2000})
            else {
                Toast.show({
                    text: `Not Found GoChip '${this.state.code}'`,
                    buttonText: "Add It",
                    duration: 5000,
                    buttonTextStyle: { color: "white" },
                    onClose: () => this.props.navigation.navigate("Add Chip", {nfc: this.state.code}),
                    buttonStyle: { backgroundColor: "#5cb85c" }})

            }
        }
        else
            Toast.show({text: `Warning GoChip '${this.state.code}'`, type:"warning", duration: 2000})
    }

    render() {
        return (
            <Container>
                <SynHeader
                  title="Scan GoChip"
                  navigation={this.props.navigation}
                  onClose={() => this.props.navigation.navigate("Chips")}
                />
                <Content padder>
                <Form>

                    {/*<Item fixedLabel>*/}
                    {/*    <Label>Serial Number</Label>*/}
                    {/*    <Input style={{borderBottomWidth: 1, marginTop: 5, marginRight: 15}}*/}
                    {/*           defaultValue={this.state.code}*/}
                    {/*           onChangeText={(value) => this.setState({code: value})}/>*/}
                    {/*</Item>*/}
                    <View style={{justifyContent: 'center', height: Dimensions.get("window").height- 150}}>
                        <Button info vertical transparent
                                style={{marginLeft: "auto", marginRight: "auto", maxHeight: 320}}
                                onPress={this.readNdef}>
                            <Image source={logo} style={{height: 180, width: 220}}/>
                            {/*<Icon name="cube-scan" type="MaterialCommunityIcons" style={{fontSize: 280}}/>*/}
                            <Text style={{width:"100%"}}> Scan GoChip </Text>
                        </Button>

                    </View>
                </Form>
                </Content>
                <SynFooter
                  onBack={() => this.props.navigation.navigate("Devices")}
                  disabledContinue={!this.state.flagContinue}
                  onContinue={()=>{

                  }}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({

});


const apolloScanChipScreen = withApollo(ScanChipScreen);
export default apolloScanChipScreen;
