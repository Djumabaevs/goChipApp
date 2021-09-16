import React from 'react';
import {Button, Header, Icon, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';

const SynSubHeader = (props) => {
  const {openFilters, valueOrder, changeOrder} = props;

  const onOpenFilters = () => {
    openFilters();
  }

  const onChangeOrder = (key) => {
    changeOrder(key);
  }
  const label = props.labelOrder || "Date";

  console.log(label);

  return (
    <Header>
      {openFilters &&
      <Button primary iconRight onPress={onOpenFilters} >
        <Text style={{textTransform: "capitalize", fontSize: 16}}>Filters</Text>
        <Icon name="search" type="FontAwesome"/>
      </Button>
      }
      {changeOrder &&
      <Button info>
        <Picker
          style={{width: 150, color: "white"}}
          dropdownIconColor="white"
          mode="dropdown"
          selectedValue={valueOrder}
          onValueChange={onChangeOrder}
        >
          <Picker.Item label={`${label} Asc`} value="asc"/>
          <Picker.Item label={`${label} Desc`} value="desc"/>
        </Picker>
      </Button>
      }
    </Header>
  )
}

export default SynSubHeader;
