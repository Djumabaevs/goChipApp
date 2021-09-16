import React, {useEffect, useState} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Text, Title, View, Spinner, Toast} from 'native-base';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {Dimensions, Image} from 'react-native';
import {getGoChipWithPetWithoutCityChipViewByCode, getGoChipViewByCode, getAllDevices} from '../../apollo/queries';
import logo from './assets/nfc.png';
// import NFCImage from './assets/nfc.png';

export const NFCScannerContainer = (props) => {
  useEffect(()=> {
    NfcManager.start();
  }, [])

  useEffect(()=>{
    if(!props.device) {
      setLoading(false);
      setLocalValue();
    }
  }, [props.device])

  const [loading, setLoading] = useState(false);
  const [localValue, setLocalValue] = useState();


  const findNFCPetWithoutGoChip = async (nfc) => {
    const result = await props.client.query({
      query: getGoChipViewByCode,
      variables: nfc ? {nfc: nfc} : {},
      fetchPolicy: "no-cache",
    });
    if(result.data && result.data.gochips_not_associated && result.data.gochips_not_associated.length > 0) {
      const filteredResults = result.data.gochips_not_associated.filter((item) => item.is_assigned === false);
      if(filteredResults && filteredResults.length > 0){
        const index = nfc ? 0 : Math.floor(Math.random() * result.data.gochips_not_associated.length)
        props.setValue(result.data.gochips_not_associated[index]);
        setLocalValue(result.data.gochips_not_associated[index].nfc);
      }
      else {
        props.setValue({error:`GoChip "${nfc}" is assigned to a pet`});
      }
    }
    else {
      props.setValue({error:`GoChip "${nfc}" is invalid`})
    }
    setLoading(false);
  }

  const findNFCPetWithoutCityChip = async (nfc) => {
    const result = await props.client.query({
      query: getGoChipWithPetWithoutCityChipViewByCode,
      variables: nfc ? {nfc: nfc} : {},
      fetchPolicy: "no-cache",
    });

    if(result.data && result.data.gochips_associated_with_pet_without_citychip
      && result.data.gochips_associated_with_pet_without_citychip.length >0){
      const index = nfc ? 0 : Math.floor(Math.random() * result.data.gochips_associated_with_pet_without_citychip.length)
      props.setValue(result.data.gochips_associated_with_pet_without_citychip[index]);
      setLocalValue(result.data.gochips_associated_with_pet_without_citychip[index].nfc);
    }
    else {
      props.setValue({error:`GoChip "${nfc}" have a city tag assigned`});
    }
    setLoading(false);
  }


  const findNFCPet = async (nfc) => {
    const result = await props.client.query({
      query: getAllDevices,
      variables: {
        where: {
            pets_devices: { pet: { pet_name: { _is_null: false } } } ,
            gochips: { nfc: nfc? { _eq: nfc } : {} }
        }
      },
      fetchPolicy: "no-cache",
    });
    if(result.data && result.data.devices && result.data.devices.length > 0){
      const index = nfc ? 0 : Math.floor(Math.random() * result.data.devices.length)
      props.setValue(result.data.devices[index].gochips[0]);
      setLocalValue(result.data.devices[index].gochips[0].nfc);
    }
    else {
      props.setValue({error:`GoChip "${nfc}" is not assigned to a pet`});
    }
    setLoading(false);
  }

  const findNFCItem = (nfc) => {
    if(nfc){
      setLocalValue(nfc);
    }
    setLoading(true);
    switch (props.parrent) {
      case("assciate-items"): {
        findNFCPetWithoutCityChip(nfc);
        break;
      }
      case("digital-identity"): {
        findNFCPetWithoutGoChip(nfc);
        break;
      }
      default: findNFCPet(nfc);
    }
  }

  const readNdef = () => {
    setLoading(true);
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      if(tag && tag.id) {
        findNFCItem(tag.id);
      }

      NfcManager.unregisterTagEvent().catch(() => 0);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
    });
    NfcManager.registerTagEvent();
  }

  return (
    <Container>
      {!props.noDrawer &&
        <Header>
          <Left>
            <Button transparent onPress={() => {
              props.onClose();
              props.drawer.current.close();
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>
              Scan GoChip
            </Title>
          </Body>
        </Header>
      }
      <Content padder>
        <View style={{justifyContent: 'center', height: Dimensions.get("window").height- 150}}>
          <Button info transparent vertical
                  style={{marginLeft: "auto", marginRight: "auto", maxHeight: 320}}
                  onPress={readNdef}>
            <Image source={logo} style={{height: 180, width: 220}}/>
          </Button>
          {props.showDemoItems && !localValue &&
            <>
              <Button block success transparent onPress={()=> findNFCItem()}>
                <Text> Check Valid </Text>
              </Button>
              <Button block danger transparent onPress={()=> findNFCItem("04B5F1A27571801")}>
                <Text> Check Invalid </Text>
              </Button>
            </>
          }
          {loading && <Spinner />}
          {props.children}
        </View>
      </Content>
    </Container>
  );
}
