import React, {useEffect, useState} from 'react';
import {Button, Content, Form, Container, Item, Label, Text, View, Toast} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../../components/router/assets/new_logo.png';
import {Image} from 'react-native';
import {getAllDevices} from '../../../apollo/queries';
import {FormItem} from '../../../newComponents/form/FormItem';

const envs = [{id: 1, name: 'Dev'},{id:2, name:'Prod'}]

const LocalEnvPage = (props) => {
  const [values, setValues] = useState();
  useEffect(()=> {
    AsyncStorage.getItem('@env:key').then((result)=> {
      const env = envs.find((e)=> e.name === result);
      if(env)
        setValues([env.id])
    })
  }, []);

  return (
    <Container style={{backgroundColor:"#0d2653"}}>
      <Content>
        <View >
        <Image source={logo} style={{marginLeft:"auto", marginRight:"auto", resizeMode: 'contain', width: "80%", marginTop: "40%"}}/>
        </View>
        <Form  style={{padding: 20}}>
          <FormItem
            white
            type="dropdown"
            label="Environment"
            uniqueKey="id"
            displayKey="name"
            items={envs}
            values={values !== undefined? values : []}
            setValue={(values) => {setValues([values])}}
            client={props.client}
          />
        </Form>
        <Button block success style={{margin: 15}} disabled={!values} onPress={async ()=>{
          try{
            const keyname = envs.find((item)=>item.id === values[0]).name;
            const value = await AsyncStorage.getItem('@env:key');
            if(value !== keyname) {
              await AsyncStorage.removeItem('@phone:key');
              props.checkPhoneNumber();
            }
            await AsyncStorage.setItem('@env:key', keyname);
            props.setEnv(keyname);
          } catch (error) {
            Toast.show({text: "add to storage env error!", type:"danger", duration: 2000})
          }
        }}>
          <Text>
            Continue
          </Text>
        </Button>
      </Content>
    </Container>
  )
}

export default LocalEnvPage;
