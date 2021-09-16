import React, { Component } from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Title,
    Text,
    H3,
    Card,
    CardItem, H1,
} from 'native-base';
import {StyleSheet, NativeModules} from 'react-native';
import SynHeader from '../../components/layout/header';
import WelcomeUser from './components/welcome';
import {Can} from '../../config/can';


const { CalendarModule } = NativeModules;
const items= ["Pets", "Persons", "Devices", "Licenses", "Digital Identity", "Associate Items", "Scan Pet using NFC", "Scan Pet using BLE"];

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.onTestNativeModule = this.onTestNativeModule.bind(this);
    }

    onTestNativeModule = () => {
        CalendarModule.createCalendarEvent('testName', 'testLocation');
    }

    render() {
        const {vet} = this.props;
        return (
            <Container>
                <SynHeader title="Home" navigation={this.props.navigation} />

                <WelcomeUser vet={vet} checkVetStatus={this.props.checkVetStatus}/>
                <Content>
                    {/*<Button danger onPress={this.onTestNativeModule } >*/}
                    {/*    <Text> Test Native Module </Text>*/}
                    {/*</Button>*/}
                {items.map((item) => (
                  <Can do="read" on={item} key={item}>
                    <Card style={styles.primaryCard}>
                        <CardItem button style={styles.primaryCard} onPress={() => this.props.navigation.navigate(item)}>
                            <Text style={styles.bodyCard}> {item} </Text>
                        </CardItem>
                    </Card>
                  </Can>
                ))}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    primaryCard: {
        backgroundColor: "#0d2653",
        margin: 10
    },
    bodyCard: {
        color:"white"
    }
});
