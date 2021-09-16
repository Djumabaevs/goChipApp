import React from 'react';
import SynHeader from '../../../components/layout/header';
import {Button, Container, Content, Icon, Text, View} from 'native-base';
import {Dimensions} from 'react-native';
import SynFooter from '../../../components/layout/footer';

const SuccessContainer = (props) => {

  return(
    <>
      <Container style={{padding:0, margin:0}}>
        <SynHeader
          title={props.title}
          navigation={props.navigation}
          onClose={props.onBack}
        />
        <Content padder>
          <View style={{justifyContent: 'center', height: Dimensions.get("window").height- 150}}>
            <Button success vertical onPress={props.onContinue}
                    style={{marginLeft: "auto", marginRight: "auto", height: 320}}>
              <Icon name="briefcase-check-outline" type="MaterialCommunityIcons" style={{fontSize: 280}}/>
              {/*<Text style={{width:"100%"}}> Digital Identity Created </Text>*/}
            </Button>
            <Button success transparent vertical style={{marginLeft: "auto", marginRight: "auto"}}>
              <Text> {props.message} </Text>
            </Button>
          </View>
        </Content>
      </Container>
      <SynFooter
        onContinue={props.onContinue}
      />
    </>
  )
};

export default SuccessContainer;
