import React, {useEffect, useRef, useState} from 'react';
import { Button, Container, Fab, Form, Icon, Item, Label, Text} from 'native-base';
import Drawer from 'react-native-drawer';
import SynHeader from '../../../components/layout/header';
import {FormItem} from '../../../newComponents/form/FormItem';
import {getAllDevices, getAllLicenseTypes, getAllPets, getJobTypes, getParameters} from '../../../apollo/queries';
import {Image} from 'react-native';
import logo from '../assets/nfcIco.png';
import {BLEScannerDrawer} from '../BLEScannerDrawer';
import {NFCScannerContainer} from '../NFCScannerContainer';
import PetSubHeader from './petSubHeader';
import RemovableFormItem from './removableFormItem';
import SynFooter from '../../../components/layout/footer';
import {addJob, addJobParams, addLicense, addPetDevice} from '../../../apollo/mutations';
import {v4 as uuidv4} from 'uuid';

const SelectDevicesContainer = (props) => {
  const drawer = useRef();

  useEffect(()=> {
    props.client.query({
      query: getAllPets,
      variables: {orderType: "desc", where: {pet_uid: {_eq: props.petUid}}},
      fetchPolicy: "no-cache",
    }).then((response) => {
      if(response.data && response.data.pets){
        setSelectedPet(response.data.pets[0]);
      }
    });
  }, [props.petUid]);


  const [selectedPet,setSelectedPet] = useState();
  const [flagFab, setFlagFab] = useState(false);
  const [flagLicence, setFlagLicense] = useState(false);
  const [flagGoChip, setFlagGoChip] = useState(false);
  const [flagCityChip, setFlagCityChip] = useState(false);
  const [flagIsoChip, setFlagIsoChip] = useState(false);
  const [flagThirdPartyChip, setFlagThirdPartyChip] = useState(false);
  const [licenseTypeUid, setLicenceTypeUid] = useState();
  const [deviceGoChip, setDeviceGoChip] = useState();
  const [deviceCityChip, setDeviceCityChip] = useState();
  const [isoChipUid, setIsoChipUid] = useState();
  const [thrirdPartyChipUid, setThrirdPartyChipUId] = useState();


  let drawerContent = null;
  if(flagCityChip && deviceCityChip === undefined )
    drawerContent = (
      <BLEScannerDrawer
        drawer={drawer}
        client={props.client}
        onClose={()=> setFlagCityChip(false)}
        setValue={(item)=> {
          setDeviceCityChip(item);
        }}
      />
    )
  if(flagGoChip && deviceGoChip === undefined)
    drawerContent = (
      <NFCScannerContainer
        drawer={drawer}
        showDemoItems
        onClose={()=> setFlagGoChip(false)}
        client={props.client}
        setValue={(item)=> {
          setDeviceGoChip(item);
        }}
      />
    )


  const save = async () => {
    let result;
    console.log("deviceGoChip.device.device_uid",typeof deviceGoChip);
    console.log("deviceCityChip.device_uid",typeof deviceCityChip, deviceCityChip);
    console.log("isoChipUid",typeof isoChipUid, isoChipUid);
    console.log("thrirdPartyChipUid",typeof thrirdPartyChipUid, thrirdPartyChipUid);
    //save devices to pet in pet_devices

    const createLinkPetDevice = (device_uid) => {
      let itemToSave = {
        installer_person_uid: props.vet.person_uid,
        pet_uid: props.petUid,
        device_uid: device_uid,
        from_time: new Date()
      };
      return props.client.mutate({
        mutation: addPetDevice,
        variables: {pet_device: itemToSave},
        fetchPolicy: "no-cache"
      });
    }

    let promises = [];
    if (deviceGoChip && deviceGoChip.device && deviceGoChip.device.device_uid) {
      promises.push(createLinkPetDevice(deviceGoChip.device.device_uid));
    }
    if (deviceCityChip && deviceCityChip.device_uid) {
      promises.push(createLinkPetDevice(deviceCityChip.device_uid));
    }
    if (isoChipUid) {
      promises.push(createLinkPetDevice(isoChipUid));
    }
    if (thrirdPartyChipUid) {
      promises.push(createLinkPetDevice(thrirdPartyChipUid));
    }
    if (licenseTypeUid) {
      promises.push(createLinkPetDevice(licenseTypeUid));
    }

    await Promise.all(promises);

    const {data: dataJobTypes} = await props.client.query({query: getJobTypes});
    const parameter = dataJobTypes.syn_did_job_types.find((item) => item.job_type_name === 'Sync DID (pet and device)');

    const response = await props.client.mutate({
      mutation: addJob,
      variables: {job: {
          job_uid: uuidv4(),
          job_type_id: parameter.job_type_id,
          person_uid: props.vet.person_uid,
          status: 0
        }},
      fetchPolicy: "no-cache",
    });

    if (response.data && response.data.insert_syn_did_jobs &&
      response.data.insert_syn_did_jobs.returning.length > 0 && response.data.insert_syn_did_jobs.returning[0].job_uid) {
      const {data: dataParameters} = await props.client.query({query: getParameters});
      const petParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "pet_uid")
      const deviceParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "device_uid")
      const cityLicenseParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "city_license_uid")
      const saveJobParameter = (uid, value) => {
        const itemToSave = [
          {
            job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
            did_parameter_uid: uid,
            did_parameter_value: value
          }
        ];
        return props.client.mutate({
          mutation: addJobParams,
          variables: {jobParams: itemToSave},
          fetchPolicy: "no-cache",
        });
      }
      promises = [];
      promises.push(saveJobParameter(petParameter.did_parameter_uid, props.petUid));
      if (deviceGoChip && deviceGoChip.device && deviceGoChip.device.device_uid) {
        promises.push(saveJobParameter(deviceParameter.did_parameter_uid, deviceGoChip.device.device_uid));
      }
      if (deviceCityChip && deviceCityChip.device_uid) {
        promises.push(saveJobParameter(deviceParameter.did_parameter_uid, deviceCityChip.device_uid));
      }

      if (isoChipUid) {
        promises.push(saveJobParameter(deviceParameter.did_parameter_uid, isoChipUid));
      }
      if (thrirdPartyChipUid) {
        promises.push(saveJobParameter(deviceParameter.did_parameter_uid, thrirdPartyChipUid));
      }
      if (licenseTypeUid) {
        promises.push(saveJobParameter(cityLicenseParameter.did_parameter_uid, licenseTypeUid));
      }

      await Promise.all(promises);
      props.changeScreen("Success");
    }
  }

  const onBack = () => {
    props.setPet();
    props.changeScreen("Select Pet")
  }

  return (
    <Drawer side="right" ref={drawer} content={drawerContent}>
      <Container style={{padding:0, margin:0}}>
        <SynHeader title="Attach To Pet" navigation={props.navigation} onClose={onBack}
        />
        {selectedPet && <PetSubHeader {...selectedPet}/>}
        <Form>
          <RemovableFormItem flag={flagLicence} onRemove={() => {
              setFlagLicense(false);
              setLicenceTypeUid(undefined);
            }}>
            <FormItem
              type="dropdown"
              label="License"
              uniqueKey="license_type_id"
              displayKey="license_type_name"
              values={licenseTypeUid !== undefined ? [licenseTypeUid] : []}
              setValue={setLicenceTypeUid}
              client={props.client}
              gqlQuery={getAllLicenseTypes}
              gqlVariables={{orderType: "desc", where: {}}}
              dataProps="license_types"
            />
          </RemovableFormItem>

          <RemovableFormItem flag={flagIsoChip} onRemove={() => {
            setFlagIsoChip(false);
            setIsoChipUid(undefined);
          }}>
            <FormItem
              type="dropdown"
              label="ISO Chip"
              uniqueKey="device_uid"
              displayKey="[chips][iso]"
              values={isoChipUid !== undefined ? [isoChipUid] : []}
              setValue={setIsoChipUid}
              client={props.client}
              gqlQuery={getAllDevices}
              gqlVariables={{ where: {device_type_id: {_eq: 1}}}}
              dataProps="devices"
            />
          </RemovableFormItem>

          <RemovableFormItem flag={flagThirdPartyChip} onRemove={() => {
            setFlagThirdPartyChip(false);
            setThrirdPartyChipUId(undefined);
          }}>
            <FormItem
              type="dropdown"
              label="Third Party Chip"
              uniqueKey="device_uid"
              displayKey="device_name"
              values={thrirdPartyChipUid !== undefined ? [thrirdPartyChipUid] : []}
              setValue={setThrirdPartyChipUId}
              client={props.client}
              gqlQuery={getAllDevices}
              gqlVariables={{ where: {device_type_id: {_eq: 3}}}}
              dataProps="devices"
            />
          </RemovableFormItem>

          <RemovableFormItem flag={deviceGoChip} onRemove={() => {
            setFlagGoChip(false);
            setDeviceGoChip(undefined);
          }}>
            {deviceGoChip && <Item style={{padding: 20}}>
              <Label>GoChip</Label>
              <Text style={{fontSize: 14, color:"#525966"}}> {deviceGoChip.device.device_name} </Text>
            </Item> }
          </RemovableFormItem>

          <RemovableFormItem flag={deviceCityChip} onRemove={() => {
            setFlagCityChip(false);
            setDeviceCityChip(undefined);
          }}>
            {deviceCityChip && <Item style={{padding: 20}}>
              <Label>City Tag</Label>
              <Text style={{fontSize: 14, color: "#525966"}}> {deviceCityChip.device_name} </Text>
            </Item>
            }
          </RemovableFormItem>
        </Form>

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
          <Button style={{backgroundColor: "white"}}
                  onPress={() =>{
                    setFlagGoChip(true)
                    setFlagFab(false)
                    drawer.current.open()
                  }}>
            <Image source={logo} style={{height: 35, width: 35, borderRadius:50}}/>
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
          {!flagIsoChip &&
          <Button style={{backgroundColor: "#000"}}
                  onPress={() => {
                    setFlagIsoChip(true)
                    setFlagFab(false)
                  }}>
            <Icon name="hardware-chip-outline" type="Ionicons"/>
          </Button>
          }
          {!flagThirdPartyChip &&
          <Button style={{backgroundColor: "#466bb1"}}
                  onPress={() => {
                    setFlagThirdPartyChip(true)
                    setFlagFab(false)
                  }}>
            <Icon name="chip" type="MaterialCommunityIcons"/>
          </Button>
          }
        </Fab>
        }
      </Container>
      <SynFooter
        onBack={onBack}
        onCancel={() => props.navigation.navigate("Home")}
        onContinue={save}
        disabledContinue={!licenseTypeUid && !deviceCityChip && !deviceGoChip && !isoChipUid && !thrirdPartyChipUid}
      />
    </Drawer>
  )
}

export default SelectDevicesContainer;
