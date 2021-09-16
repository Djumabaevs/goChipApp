import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, Card, View, H1} from "native-base";
import logo from './assets/new_logo.png';
import {Can} from '../../config/can';
const routes = ["Home", "Pets", "Persons", "Devices", "Licenses", "Digital Identity", "Associate Items", "Scan Pet using NFC", "Scan Pet using BLE"];
export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <View style={{backgroundColor:"#0d2653"}}>
                        <Image source={logo} style={{marginLeft:"auto", marginRight:"auto", resizeMode: 'contain', width: "80%", height:100}}/>
                        <H1 style={{marginTop: -15, fontWeight:"bold", backgroundColor:"#0d2653", color:"white"}}> {this.props.vet.person_name} </H1>
                    </View>
                    <List>
                        {routes.map((item, index) => (
                          <Can do="read" on={item} key={item}>
                              <ListItem
                                key={index}
                                button
                                onPress={() => this.props.navigation.navigate(item)}>
                                <Text>{item}</Text>
                            </ListItem>
                          </Can>
                        ))}
                        <ListItem
                          button
                          onPress={() => this.props.logout()}>
                            <Text>Logout</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
