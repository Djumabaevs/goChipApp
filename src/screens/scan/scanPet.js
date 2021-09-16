import React, {useEffect, useState} from 'react';
import SynHeader from '../../components/layout/header';
import {NFCScannerContainer} from '../digitalIdentity/NFCScannerContainer';
import {Button, Container, Text} from 'native-base';
import {useQuery} from 'react-apollo';
import {getGoChipByCode} from '../../apollo/queries';

const ScanPet = (props) => {
  const [deviceGoChip, setDeviceGoChip] = useState();
  const [petDetails, setPetDetails] = useState();

  useEffect(()=> {
    const getData = async () => {
      const {data: dataDevice} = await props.client.query({
        query: getGoChipByCode,
        variables: {nfc: deviceGoChip && deviceGoChip.nfc ? deviceGoChip.nfc : "--"}
      });
      if (dataDevice && dataDevice.gochips.length > 0 && !petDetails) {
        const _gochip = dataDevice.gochips[0];
        setDeviceGoChip(_gochip);
        if(_gochip){
          if(_gochip.device.pets_devices.length > 0 && _gochip.device.pets_devices[0].pet){
            const _pet = _gochip.device.pets_devices[0].pet;
            setPetDetails(_pet);
            props.setDisableContiue(false);
            props.setPetUid(_pet.pet_uid)
          }
        }
      }
    }
    if(deviceGoChip && deviceGoChip.nfc){
      getData();
    }

  },[ deviceGoChip])
  console.log("petDetails", petDetails);
  return (
    <Container style={{padding:0, margin:0}}>
      <SynHeader
        title="Scan Pet using NFC"
        navigation={props.navigation}
      />
      <NFCScannerContainer
        parrent="scan-pet"
        noDrawer
        showDemoItems
        client={props.client}
        setValue={(item)=> {
          setDeviceGoChip(item);
        }}
        device={deviceGoChip}
      >
        {deviceGoChip && deviceGoChip.error &&
        <>
          <Button danger transparent
                  style={{marginLeft:"auto", marginRight:"auto"}}>
            <Text>
              {deviceGoChip.error}
            </Text>
          </Button>
        </>
        }

        {deviceGoChip && deviceGoChip.nfc &&
        <>
          <Button success transparent
                  style={{marginLeft:"auto", marginRight:"auto", marginTop: 20}}>
            <Text style={{textAlign:"center"}}>
              Authentic Go Chip
              {"\n"}
              "{deviceGoChip.iso}"
              {"\n"}
              {petDetails && petDetails.pets_type.pet_type_name.toUpperCase()}: {petDetails && petDetails.pet_name}
              {"\n"}
            </Text>
          </Button>
        </>

        }


      </NFCScannerContainer>

    </Container>
  )
}
export default ScanPet;
