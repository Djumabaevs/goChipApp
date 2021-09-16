import React, {useState} from 'react';
import {withApollo} from 'react-apollo';
import {Button, Container, Content, Form, Text, Toast, View} from 'native-base';
import {Image} from 'react-native';
import logo from '../../components/router/assets/new_logo.png';
import {FormItem} from '../../newComponents/form/FormItem';

const profiles = [{id: 1, name: 'Vet'},{id:2, name:'User'}]

const ProfileSelectScreen = (props) => {

  const [values, setValues] = useState([1]);

  const handleOnPress = () => {
    console.log(values, props.persons);
    if(values){
      const profile = profiles.find((p)=> p.id === values[0])
      if(profile.name === 'Vet'){
        const person = props.persons.find((p) => p.persons_vets.length > 0)
        props.setVet(person);
      }
      if(profile.name === 'User'){
        const person = props.persons.find((p) => p.persons_vets.length === 0)
        props.setVet(person);
      }

    }
  }

  return(
    <Container style={{backgroundColor:"#0d2653"}}>
      <Content>
        <View>
          <Image source={logo} style={{marginLeft:"auto", marginRight:"auto", resizeMode: 'contain', width: "80%", marginTop: "40%"}}/>
        </View>
        <Form  style={{padding: 20}}>
          <FormItem
            white
            type="dropdown"
            label="Profile"
            uniqueKey="id"
            displayKey="name"
            items={profiles}
            values={values !== undefined? values : []}
            setValue={(values) => {setValues([values])}}
            client={props.client}
          />
        </Form>
        <Button block success style={{margin: 15}} disabled={!values} onPress={handleOnPress}>
          <Text>
            Continue
          </Text>
        </Button>
      </Content>
    </Container>
  )
}

export default ProfileSelectScreen;
