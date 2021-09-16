import React from 'react';
import {Body, Icon, Left, List, ListItem, Text} from 'native-base';

const PersonItemContainer = (props) => {

  return (
    <ListItem thumbnail>
      <Left>
        <Icon name="person" type="MaterialIcons"  style={{fontSize:30, width: 30}}/>
      </Left>
      <Body>
        <Text style={{fontWeight:"bold"}}>
          { props.person_name }
        {/*({this.getStatus(person.status)}) */}
        </Text>
        <Text note numberOfLines={1}> Phone: +{props.person_phone}</Text>
      </Body>
    </ListItem>
  )
}

export default PersonItemContainer;
