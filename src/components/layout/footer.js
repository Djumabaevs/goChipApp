import React from "react";
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
const SynFooter = (props) => {
  const {onBack, onCancel, onContinue, disabledContinue} = props;
  return(
    <Footer>
      <FooterTab>
         <Button vertical onPress={onBack} disabled={!onBack}>
          <Icon name="leftcircleo" type="AntDesign"/>
          <Text>Back</Text>
        </Button>
       <Button vertical onPress={onCancel} disabled={!onCancel}>
          <Icon name="closecircleo" type="AntDesign"/>
          <Text>Cancel</Text>
        </Button>
        <Button vertical onPress={onContinue} disabled={!onContinue || disabledContinue}>
          <Icon name="rightcircleo" type="AntDesign"/>
          <Text>Continue</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default SynFooter;
