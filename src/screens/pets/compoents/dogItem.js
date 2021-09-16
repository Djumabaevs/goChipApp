import React from 'react';
import {Body, Button, Icon, Left, ListItem, Right, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

const DogItem = (props) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Icon name="dog" type="FontAwesome5" style={{fontSize: 30, width: 30}}/>
      </Left>
      <Body>
        <Text style={{fontWeight:"bold"}}> {props.pet_name} ({props.dogs[0].dogs_breed.breed_name}) </Text>
        <Text note numberOfLines={1}>
          {props.dogs[0].colour.capitalize()}
        {/*({this.getStatus(pet.status)})*/}
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <TouchableOpacity  onPress={()=> props.navigation.navigate("Details Pet", {id: props.pet_uid, name: props.pet_name})}>
            <Text>Details</Text>
          </TouchableOpacity>
        </Button>
      </Right>
    </ListItem>
  )
}

export default DogItem;
