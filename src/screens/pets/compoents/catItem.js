import React from 'react';
import {Body, Button, Icon, Left, ListItem, Right, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

const CatItem = (props) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Icon name="cat" type="FontAwesome5" style={{fontSize: 30, width: 30}}/>
      </Left>
      <Body>
        <Text style={{fontWeight:"bold"}}> {props.pet_name} ({props.cats[0].cats_breed.breed_name}) </Text>
        <Text note numberOfLines={1}>
          {props.cats[0].colour.capitalize()}
              {/*({this.getStatus(pet.status)})*/}
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <TouchableOpacity onPress={()=> props.navigation.navigate("Details Pet", {id: props.pet_uid, name: props.pet_name})}>
            <Text>Details</Text>
          </TouchableOpacity>
        </Button>
      </Right>
    </ListItem>
  );
}

export default CatItem;
