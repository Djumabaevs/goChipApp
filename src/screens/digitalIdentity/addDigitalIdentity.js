import React, {useEffect, useState} from 'react';
import {Button, Text, Form, Container, Icon, Spinner, Content, H3} from 'native-base';
import {ScrollView} from 'react-native';
import {withApollo, useQuery} from 'react-apollo';

import SynHeader from '../../components/layout/header';
import {NFCScannerContainer} from './NFCScannerContainer.js'
import {FormItem} from '../../newComponents/form/FormItem';
import {getPet, getAllPets, getAllPetTypes, getAllStatuses, getJobTypes, getParameters} from '../../apollo/queries';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {addJob, addJobParams, addPetDevice} from '../../apollo/mutations';
import {v4 as uuidv4} from 'uuid';
import SynFooter from '../../components/layout/footer';
import SuccessContainer from './components/successContainer';
import PetDetailsContainer from '../scan/petDetails';

let statuses = {};
const AddDigitalIdentityScreen = (props) => {
  const [deviceGoChip, setDeviceGoChip] = useState();
  const [flagPet, setFlagPet] = useState(false);
  const [flagSuccess, setFlagSuccess] = useState(false);

  const [petTypeUid, setPetTypeUid] = useState();
  const [petUid, setPetUid] = useState();

  const {data} = useQuery(getAllStatuses);
  if(data && data.statuses && data.statuses.length > 0){
    data.statuses.forEach((item)=> {
      statuses[item.status_id] = item.status_name;
    })
  }

  let petStatus, pet;
  const {data: dataPets, error, errors} = useQuery(getPet, {variables: {pet_uid: petUid || "-1"}});
  console.log("dataPets", dataPets, error, errors)
  if(dataPets && dataPets.pets && dataPets.pets.length > 0 && !petStatus) {
    petStatus = dataPets.pets[0].status;
    pet = dataPets.pets[0];
    console.log("pet", pet);

  }

  const getStatus = (status) => {
    return statuses[status.toString()] || status;
  }


  const save = async () => {

    //save devices to pet in pet_devices
    let itemToSave;
    if (deviceGoChip && deviceGoChip.device_uid) {
      const resultPetDevice = await props.client.mutate({
        mutation: addPetDevice,
        variables: {pet_device: {
            installer_person_uid: props.vet.person_uid,
            pet_uid: petUid,
            device_uid: deviceGoChip.device_uid,
            from_time: new Date()
          }
        },
        fetchPolicy: "no-cache"
      });
      console.log("resultPetDevice", resultPetDevice);
    }

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
      const petParameter = dataParameters.syn_did_parameters
        .find((item) => item.did_parameter_name === "pet_uid");
      const deviceParameter = dataParameters.syn_did_parameters
        .find((item) => item.did_parameter_name === "device_uid");

      itemToSave = [
        {
          job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
          did_parameter_uid: petParameter.did_parameter_uid,
          did_parameter_value: petUid
        }
      ];
      props.client.mutate({
        mutation: addJobParams,
        variables: {jobParams: itemToSave},
        fetchPolicy: "no-cache",
      });
      if (deviceGoChip && deviceGoChip.device_uid) {
        itemToSave = [
          {
            job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
            did_parameter_uid: deviceParameter.did_parameter_uid,
            did_parameter_value: deviceGoChip.device_uid
          }
        ];
        props.client.mutate({
          mutation: addJobParams,
          variables: {jobParams: itemToSave},
          fetchPolicy: "no-cache",
        });
      }
      setFlagSuccess(true);
    }

  }

  if(flagSuccess){
    return (
      <SuccessContainer
        navigation={props.navigation}
        title="Digital Identity"
        message="Digital Identity Created"
        onContinue={() => {
          setDeviceGoChip();
          setFlagPet(false);
          setFlagSuccess(false);
          setPetUid();
          setPetTypeUid();
        }}
        onBack={() => props.navigation.navigate("Home")}
      />
    )
  }

  if(flagPet){
    return (
      <>
      <Container style={{padding:0, margin:0}}>
        <SynHeader
          title="Digital Identity"
          navigation={props.navigation}
          onClose={() => {
            setFlagPet(false);
            setDeviceGoChip();
          }}
        />
        <Form>
          <FormItem
            type="dropdown"
            label="Pet"
            uniqueKey="pet_type_id"
            displayKey="pet_type_name"
            values={petTypeUid !== undefined? [petTypeUid] : []}
            setValue={setPetTypeUid}
            client={props.client}
            gqlQuery={getAllPetTypes}
            dataProps="pets_types"
          />
          {petTypeUid !== undefined &&
          <FormItem
            type="dropdown"
            label="Name"
            uniqueKey="pet_uid"
            displayKey="pet_name"
            values={petUid !== undefined ? [petUid] : []}
            setValue={setPetUid}
            client={props.client}
            gqlQuery={getAllPets}
            gqlVariables={{orderType: "asc", where: {
                pets_type: {pet_type_id: {_eq: petTypeUid}},
                _not:{pets_devices:{pet_uid:{_is_null:false}}}
            }}}
            dataProps="pets"
          />
          }
        </Form>

        {petUid && <PetDetailsContainer
          {...props}
          petUid={petUid}
        />
        }
      </Container>
        <SynFooter
          onBack={() => {
            setDeviceGoChip();
            setFlagPet(false);
          }}
          onCancel={() => props.navigation.navigate("Home")}
          onContinue={save}
          disabledContinue={!petUid || getStatus(petStatus || 0).toLowerCase()=== "in blockchain"}
        />
      </>
    )
  }

  return (
    <Container style={{padding:0, margin:0}}>
      <SynHeader title="Digital Identity" navigation={props.navigation} />
      <NFCScannerContainer
        parrent="digital-identity"
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
                    style={{marginLeft:"auto", marginRight:"auto"}}>
              <Text>
                Authentic Go Chip
                {"\n"}"{deviceGoChip.iso}"
              </Text>
            </Button>
          </>

        }


      </NFCScannerContainer>
      <SynFooter
        onBack={() => {
          setDeviceGoChip();
          setFlagPet(false);
        }}
        onCancel={() => props.navigation.navigate("Home")}
        onContinue={() => setFlagPet(true)}
        disabledContinue={!deviceGoChip || !deviceGoChip.nfc}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  image:{width:150, height:150, borderRadius: 100, marginLeft:"auto", marginRight:"auto", marginTop: 10 },
  centered:{ marginLeft: "auto", marginRight: "auto"},
  icon:{fontSize: 110, borderWidth: 5, padding: 10 },
});


const apolloAddDigitalIdentityScreen = withApollo(AddDigitalIdentityScreen);
export default apolloAddDigitalIdentityScreen;
