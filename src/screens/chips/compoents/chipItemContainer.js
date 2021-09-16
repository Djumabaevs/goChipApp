import React from 'react';
import {Body, Button, Icon, Left, ListItem, Right, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';

const ChipItemContainer = (props) => {
  return(
    <ListItem thumbnail>
      <Left>
        {[0,1,4].includes(props.devices_type.device_type_id) &&
        <Icon name="hardware-chip-outline" type="Ionicons"
              style={{fontSize: 30, width: 30}}/>
        }
        {props.devices_type.device_type_id === 3 &&
        <Icon name="devices-other" type="MaterialIcons"
              style={{fontSize: 30, width: 30}}/>
        }
        {props.devices_type.device_type_id === 2 &&
        <Icon name="poker-chip" type="MaterialCommunityIcons"
              style={{fontSize: 30, width: 30}}/>
        }
      </Left>
      <Body>
        <Text style={{fontWeight:"bold"}}>
          {props.device_name}
          {/*({this.getStatus(props.status)}) */}
        </Text>
        <Text note numberOfLines={1}>{props.devices_type.device_type_name}</Text>
      </Body>
      <Right>
        <Button transparent>
          <TouchableOpacity  onPress={()=> props.navigation.navigate("Details Chip", {id: props.device_uid, name: props.device_name})}>
            <Text>Details</Text>
          </TouchableOpacity>
        </Button>
      </Right>
    </ListItem>
  )
}

export default ChipItemContainer;
