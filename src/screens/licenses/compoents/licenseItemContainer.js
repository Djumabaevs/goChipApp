import React from 'react';
import {Body, Icon, Left, ListItem, Text} from 'native-base';

const LicenseItemContainer = (props) => {

  return(
    <ListItem thumbnail>
      <Left>
        <Icon name="license" type="MaterialCommunityIcons"  style={{fontSize:30, width: 30}}/>
      </Left>
      <Body>
        <Text style={{fontWeight:"bold"}}> { props.license_type_name }  </Text>
        {/*<Text note={1}>  Status: {this.getStatus(license.status)}  </Text>*/}
      </Body>
    </ListItem>
  )
}

export default LicenseItemContainer;
