import React, {useEffect, useRef, useState} from 'react';
import {useQuery, withApollo} from 'react-apollo';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Fab,
  Form,
  H3,
  Icon,
  Item,
  Label,
  Left,
  Text,
  View,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import Drawer from 'react-native-drawer';

import SynHeader from '../../components/layout/header';
import {NFCScannerContainer} from './NFCScannerContainer';
import {FormItem} from '../../newComponents/form/FormItem';
import {getGoChipByCode, getAllLicenseTypes, getAllStatuses, getJobTypes, getParameters} from '../../apollo/queries';
import {BLEScannerDrawer} from './BLEScannerDrawer';
import {v4 as uuidv4} from 'uuid';
import {addJob, addJobParams, addLicense, addPetDevice} from '../../apollo/mutations';
import SynFooter from '../../components/layout/footer';
import SuccessContainer from './components/successContainer';
import PetDetailsContainer from '../scan/petDetails';


let statuses = {};
let petDetails;

const AssociateChipScreen = (props) => {

  const [deviceGoChip, setDeviceGoChip] = useState();
  const [deviceCollarGoChip, setDeviceCollarGoChip] = useState();
  const [deviceCityChip, setDeviceCityChip] = useState();
  const [licenseTypeUid, setLicenceTypeUid] = useState();
  const [flagFab, setFlagFab] = useState(false);
  const [flagPet, setFlagPet] = useState(false);
  const [flagLicence, setFlagLicense] = useState(false);
  const [flagGoChip, setFlagGoChip] = useState(false);
  const [flagCityChip, setFlagCityChip] = useState(false);
  const [flagConfirm, setFlagConfirm] = useState(false);
  const drawer = useRef();

  const {data} = useQuery(getAllStatuses);
  if(data && data.statuses && data.statuses.length > 0){
    data.statuses.forEach((item)=> {
      statuses[item.status_id] = item.status_name;
    })
  }
  const {data: dataDevice} = useQuery(getGoChipByCode, {variables: {nfc: deviceGoChip && deviceGoChip.nfc ? deviceGoChip.nfc : "--"}});

  useEffect(() => {
    return () => {
      petDetails = undefined;
    }
  }, [deviceGoChip])

  if(dataDevice && dataDevice.gochips.length > 0 && !petDetails) {
    const _gochip = dataDevice.gochips[0];
    petDetails = _gochip && _gochip.device &&
    _gochip.device.pets_devices.length > 0 && _gochip.device.pets_devices[0].pet ?
      _gochip.device.pets_devices[0].pet : undefined;
    setDeviceGoChip(_gochip);
  }

  const save = async () => {

    let itemToSave;

    const {data: dataJobTypes} = await props.client.query({query: getJobTypes});
    const parameter = dataJobTypes.syn_did_job_types.find((item) => item.job_type_name === 'Sync DID (pet and device)');

    itemToSave = {
      job_uid: uuidv4(),
      job_type_id: parameter.job_type_id,
      person_uid: props.vet.person_uid,
      status: 0
    }
    const response = await props.client.mutate({
      mutation: addJob,
      variables: {job: itemToSave},
      fetchPolicy: "no-cache",
    });

    if (response.data && response.data.insert_syn_did_jobs &&
      response.data.insert_syn_did_jobs.returning.length > 0 && response.data.insert_syn_did_jobs.returning[0].job_uid) {

      const {data: dataParameters} = await props.client.query({query: getParameters});
      const petParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "pet_uid")
      const deviceParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "device_uid")
      const cityLicenseParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "city_license_uid")
      itemToSave = [
        {
          job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
          did_parameter_uid: petParameter.did_parameter_uid,
          did_parameter_value: petDetails.pet_uid
        }
      ];
      props.client.mutate({
        mutation: addJobParams,
        variables: {jobParams: itemToSave},
        fetchPolicy: "no-cache",
      });
      if (deviceCollarGoChip && deviceCollarGoChip.id) {
        itemToSave = {
          installer_person_uid: props.vet.person_uid,
          pet_uid: petDetails.pet_uid,
          device_uid: deviceCollarGoChip.id,
          from_time: new Date()
        }
        props.client.mutate({
          mutation: addPetDevice,
          variables: {pet_device: itemToSave},
          fetchPolicy: "no-cache"
        });
        itemToSave = [
          {
            job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
            did_parameter_uid: deviceParameter.did_parameter_uid,
            did_parameter_value: deviceCollarGoChip.id
          }
        ];
        props.client.mutate({
          mutation: addJobParams,
          variables: {jobParams: itemToSave},
          fetchPolicy: "no-cache",
        });
      }
      if (deviceCityChip && deviceCityChip.id) {
        itemToSave = {
          installer_person_uid: props.vet.person_uid,
          pet_uid: petDetails.pet_uid,
          device_uid: deviceCityChip.id,
          from_time: new Date()
        }
        props.client.mutate({
          mutation: addPetDevice,
          variables: {pet_device: itemToSave},
          fetchPolicy: "no-cache"
        });
        itemToSave = [
          {
            job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
            did_parameter_uid: deviceParameter.did_parameter_uid,
            did_parameter_value: deviceCityChip.id
          }
        ];
        props.client.mutate({
          mutation: addJobParams,
          variables: {jobParams: itemToSave},
          fetchPolicy: "no-cache",
        });
      }

      if(licenseTypeUid){
        itemToSave = {
          city_license_uid: uuidv4(),
          license_id: uuidv4(),
          pet_uid: petDetails.pet_uid,
          //TODO hardcoded
          city_uid: "674fa22b-8d27-4188-aa02-8616c0b72395",
          cost_paid: 0,
          //
          license_type_id: licenseTypeUid.toString(),
          effective_from: new Date()
        }
        await props.client.mutate({
          mutation: addLicense,
          variables: {license: itemToSave},
          fetchPolicy: "no-cache",
        });
        itemToSave = [
          {
            job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
            did_parameter_uid: cityLicenseParameter.did_parameter_uid,
            did_parameter_value: licenseTypeUid.toString()
          }
        ];
        props.client.mutate({
          mutation: addJobParams,
          variables: {jobParams: itemToSave},
          fetchPolicy: "no-cache",
        });
      }
      setFlagConfirm(true);
    }
  }

  const getStatus = (status) => {
    return statuses[status.toString()] || status;
  }

  //TODO First Component
  if(!flagPet)
  return (
    <>
    <Container style={{padding:0, margin:0}}>
      <SynHeader
        title="Associate Items"
        navigation={props.navigation}
      />
      <NFCScannerContainer
        parrent="assciate-items"
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
              {petDetails && `Stauts: ${getStatus(petDetails.status)}`}
            </Text>
          </Button>
        </>

        }


      </NFCScannerContainer>

    </Container>
      <SynFooter
        onBack={() => {
          setFlagPet(false);
          setFlagConfirm(false);
          setFlagCityChip(false);
          setFlagGoChip(false)
          setFlagLicense(false);
          setDeviceGoChip();
          setDeviceCollarGoChip();
          setDeviceCityChip();
          setLicenceTypeUid();
        }}
        onCancel={() => props.navigation.navigate("Home")}
        onContinue={() => setFlagPet(true)}
        disabledContinue={!deviceGoChip || !deviceGoChip.nfc}
      />
      </>
  )


  let drawerContent = null;
  if(flagCityChip && deviceCityChip === undefined )
    drawerContent = (
      <BLEScannerDrawer
        drawer={drawer}
        deviceTypeId={4}
        client={props.client}
        onClose={()=> setFlagCityChip(false)}
        setValue={(item)=> {
          setDeviceCityChip(item);
        }}
      />
    )
  if(flagGoChip && deviceCollarGoChip === undefined)
    drawerContent = (
      <BLEScannerDrawer
        drawer={drawer}
        deviceTypeId={2}
        client={props.client}
        onClose={()=> setFlagCityChip(false)}
        setValue={(item)=> {
          setDeviceCollarGoChip(item);
        }}
      />
    )
   if(flagConfirm){
      return (
        <SuccessContainer
          navigation={props.navigation}
          title="Associate Items"
          message="Items where associated"
          onContinue={() => {
            setFlagPet(false);
            setFlagConfirm(false);
            setFlagCityChip(false);
            setFlagGoChip(false)
            setFlagLicense(false);
            setDeviceGoChip();
            setDeviceCollarGoChip();
            setDeviceCityChip();
            setLicenceTypeUid();
          }}
          onBack={() => props.navigation.navigate("Home")}
        />
      )
   }
  return (
    <Drawer
      side="right"
      ref={drawer}
      content={drawerContent}
    >
      <Container style={{padding:0, margin:0}}>
        <SynHeader
          title="Associate Items"
          navigation={props.navigation}
          onClose={() =>{
            setFlagPet(false);
            setDeviceGoChip();
          }}
        />
        {petDetails.pet_uid && <PetDetailsContainer
          {...props}
          petUid={petDetails.pet_uid}
        >

        <Form>
          {flagLicence &&
          <View style={{flexDirection:"row"}}>
            <View style={{width: "15%", marginTop: 10}}>
              <Button danger transparent onPress={()=> {
                setFlagLicense(false);
                setLicenceTypeUid(undefined);
              }}>
                <Icon name="times" type="FontAwesome"/>
              </Button>
            </View>
            <View style={{width: "85%"}}>
              <FormItem
                type="dropdown"
                label="License"
                uniqueKey="license_type_id"
                displayKey="license_type_name"
                values={licenseTypeUid !== undefined ? [licenseTypeUid] : []}
                setValue={setLicenceTypeUid}
                client={props.client}
                gqlQuery={getAllLicenseTypes}
                gqlVariables={{orderType: "asc", where: {}}}
                dataProps="license_types"
              />
            </View>
          </View>
          }
          {deviceCollarGoChip &&

          <View style={{flexDirection:"row"}}>
            <View style={{width: "15%", marginTop: 10}}>
              <Button danger transparent onPress={()=> {
                setFlagGoChip(false);
                setDeviceCollarGoChip(undefined);
              }}>
                <Icon name="times" type="FontAwesome"/>
              </Button>
            </View>
            <View style={{width: "85%"}}>
              <Item style={{paddingTop: 20, paddingBottom: 20}}>
                <Label>Collar GoChip</Label>
                <Label> {deviceCollarGoChip.name} </Label>
              </Item>
            </View>
          </View>
          }
          {deviceCityChip &&

          <View style={{flexDirection:"row"}}>
            <View style={{width: "15%", marginTop: 10}}>
              <Button danger transparent onPress={()=> {
                setFlagCityChip(false);
                setDeviceCityChip(undefined);
              }}>
                <Icon name="times" type="FontAwesome"/>
              </Button>
            </View>
            <View style={{width: "85%"}}>
              <Item style={{paddingTop: 20, paddingBottom: 20}}>
                <Label>City Tag</Label>
                <Label> {deviceCityChip.name} </Label>
              </Item>
            </View>
          </View>
          }
        </Form>
        </PetDetailsContainer>
        }
        {(!flagLicence || !flagGoChip || !flagCityChip) &&
        <Fab
          active={flagFab}
          direction="up"
          position="bottomRight"
          onPress={() => setFlagFab(!flagFab)}
          style={{backgroundColor: "#5cb85c"}}
        >
          <Icon name="plus" type="FontAwesome"/>
          {!flagGoChip &&
          <Button style={{backgroundColor: "#62B1F6"}}
                  onPress={() =>{
                    setFlagGoChip(true)
                    setFlagFab(false)
                    drawer.current.open()
                  }}>
            <Icon name="cube" type="FontAwesome"/>
          </Button>
          }
          {!flagCityChip &&
          <Button style={{backgroundColor: "#466bb1"}}
                  onPress={() => {
                    setFlagCityChip(true)
                    setFlagFab(false)
                    drawer.current.open()
                  }}>
            <Icon name="bluetooth" type="Feather"/>
          </Button>
          }
          {!flagLicence &&
          <Button style={{backgroundColor: "#f0ad4e"}}
                  onPress={() => {
                    setFlagLicense(true)
                    setFlagFab(false)
                  }}>
            <Icon name="license" type="MaterialCommunityIcons"/>
          </Button>
          }
        </Fab>
        }
      </Container>
      <SynFooter
        onBack={() => {
          setFlagPet(false);
          setFlagConfirm(false);
          setFlagCityChip(false);
          setFlagGoChip(false)
          setFlagLicense(false);
          setDeviceGoChip();
          setDeviceCollarGoChip();
          setDeviceCityChip();
          setLicenceTypeUid();
        }}
        onCancel={() => props.navigation.navigate("Home")}
        onContinue={save}
        disabledContinue={!licenseTypeUid && !deviceCityChip && !deviceCollarGoChip}
      />
    </Drawer>
  )
}



const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#0d2653",
  },
  headerCard: {
    color:"white",
    fontWeight:"bold",
    marginLeft: "auto",
    marginRight: "auto"
  },
  bodyCard: {
    color:"white",
    marginLeft: "auto",
    marginRight: "auto"
  },
  icon: {
    fontSize: 30,
    width: 30,
    color: "white"
  }
});



const apolloAssociateChipScreen = withApollo(AssociateChipScreen);
export default apolloAssociateChipScreen;
