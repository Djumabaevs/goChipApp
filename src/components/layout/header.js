import {Body, Button, Container, Header, Icon, Left, Right, Text, Title} from 'native-base';
import React from 'react';
import logo from '../router/assets/new_logo.png';
import {Image} from 'react-native';

const SynHeader = (props) => {

    return   <Header>
        <Left>
            { !props.onClose &&
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
                <Icon name='menu'/>
            </Button>
            }
            { props.onClose &&
            <Button transparent onPress={props.onClose}>
                <Icon name='arrow-back' />
            </Button>
            }
        </Left>
        <Body>
            <Title>
                {props.title}
            </Title>
        </Body>
        <Right>
            <Image source={logo} style={{resizeMode: 'contain', width: "100%"}}/>
        </Right>
    </Header>
}

export default SynHeader;
