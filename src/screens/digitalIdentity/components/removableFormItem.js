import React from 'react';
import {Button, Icon, View} from 'native-base';
import {FormItem} from '../../../newComponents/form/FormItem';
import {getAllLicenseTypes} from '../../../apollo/queries';

const RemovableFormItem = (props) => {
  const {flag, onRemove} = props;
  if(flag)
  return (
    <View style={{flexDirection:"row"}}>
      <View style={{width: "15%", marginTop: 10}}>
        <Button danger transparent onPress={onRemove}>
          <Icon name="times" type="FontAwesome"/>
        </Button>
      </View>
      <View style={{width: "85%"}}>
        {props.children}
      </View>
    </View>
  )
  return null;
}

export default RemovableFormItem
