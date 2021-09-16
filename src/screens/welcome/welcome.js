import React, {useEffect, useState} from 'react';
import {
    H1,
    Text,
    Content,
    Card,
    CardItem,
    Container,
    Icon,
    Label,
    Form,
    Item,
    Input,
    Button,
    Toast,
    View,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {getClient} from '../../apollo/client';
import {checkPhoneNumber} from '../../apollo/queries';
import LoadingApp from '../../components/router/loading';
import {Image} from 'react-native';
import logo from '../../components/router/assets/new_logo.png';

const Welcome = (props) => {
    const [phoneNumber, setPhone] = React.useState("");

    const [clientApi, setClient] = useState();
    useEffect(()=> {
        setClient(getClient("api", props.env));
    }, [])

    if(!clientApi)
        return  <LoadingApp />



    const _checkPhoneNumber = async () => {
        const {data} = await clientApi.query({
            query: checkPhoneNumber,
            variables: {
                phone: phoneNumber
            },
            fetchPolicy: "no-cache",
        });
        if(data && data.persons.length > 0){
            props.setPhoneNumber(phoneNumber);
            try{
                await AsyncStorage.setItem('@phone:key',phoneNumber);
            } catch (error) {
                Toast.show({text: "add to storage phone error!", type:"danger", duration: 2000})
            }
        }
        else
            Toast.show({text: "User not found!", type:"danger", duration: 2000})
    }

    return (
        <Container style={{backgroundColor:"#0d2653"}}>
                <Content>
                    <View >
                        <Image source={logo} style={{marginLeft:"auto", marginRight:"auto", resizeMode: 'contain', width: "80%", marginTop: "40%"}}/>
                    </View>
                    <Form  style={{padding: 5, margin:20}}>
                        <Item fixedLabel>
                            <Label style={{color:"white"}}>Phone Number</Label>
                            <Input style={{marginTop:5, marginRight: 15, color:"white"}}
                                   keyboardType="numeric"
                                   onChangeText={(value)=> setPhone(value)}/>
                        </Item>
                        <Text style={{fontSize:14, marginLeft:"auto", paddingRight: 15, height: 50, lineHeight:40, color:"white"}}> Without plus sign (+) </Text>
                    </Form>
                    <Button block success style={{margin: 15}} onPress={()=> {_checkPhoneNumber()}} disabled={!phoneNumber}>
                        <Text>
                            Continue
                        </Text>
                    </Button>
                </Content>
        </Container>
    )
}

export default Welcome;
