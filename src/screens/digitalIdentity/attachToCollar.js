import React, {useState} from 'react';
import {Button, Container, Form, Text, Toast} from 'native-base';
import {withApollo} from 'react-apollo';
import {v4 as uuidv4} from 'uuid';

import SynHeader from '../../components/layout/header';
import {FormItem} from '../../newComponents/form/FormItem';
import {getAllDevices, getJobTypes, getParameters} from '../../apollo/queries';
import {addJob, addJobParams, addLinkedDevice} from '../../apollo/mutations';
import SynFooter from '../../components/layout/footer';
import SuccessContainer from './components/successContainer';

const AttachToCollarScreen = (props) => {
  const [goChipUid, setGoChipUid] = useState();
  const [collarUid, setCollarUid] = useState();
  const [flagSuccess, setFlagSuccess] = useState(false);

  const save = async () => {
    let itemToSave = {
      person_uid: props.vet.person_uid,
      device_uid: goChipUid,
      linked_device_uid: collarUid,
      from_time: new Date()
    };
    await props.client.mutate({
      mutation: addLinkedDevice,
      variables: {linked_device: itemToSave},
      fetchPolicy: "no-cache"
    });

    const {data: dataJobTypes} = await props.client.query({query: getJobTypes});
    const parameter = dataJobTypes.syn_did_job_types.find((item) => item.job_type_name === 'Sync linked devices');

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
      const deviceParameter = dataParameters.syn_did_parameters.find((item) => item.did_parameter_name === "device_uid")

      itemToSave = [
        {
          job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
          did_parameter_uid: deviceParameter.did_parameter_uid,
          did_parameter_value: goChipUid
        }
      ];
      props.client.mutate({
        mutation: addJobParams,
        variables: {jobParams: itemToSave},
        fetchPolicy: "no-cache",
      });


      itemToSave = [
        {
          job_uid: response.data.insert_syn_did_jobs.returning[0].job_uid,
          did_parameter_uid: deviceParameter.did_parameter_uid,
          did_parameter_value: collarUid
        }
      ];
      props.client.mutate({
        mutation: addJobParams,
        variables: {jobParams: itemToSave},
        fetchPolicy: "no-cache",
      });
      setFlagSuccess(true);
    }
  }

  if(flagSuccess)
    return (
      <SuccessContainer
        navigation={props.navigation}
        title="Attach To Collar"
        onContinue={() => props.navigation.navigate("Home")}
        onBack={() => props.navigation.navigate("Home")}
      />
    )

  return (
    <>
    <Container style={{padding:0, margin:0}}>
      <SynHeader title={`Attach To Collar`} navigation={props.navigation} />
      <Form>
        <FormItem
          type="dropdown"
          label="GoChip"
          uniqueKey="device_uid"
          displayKey="device_name"
          values={goChipUid !== undefined? [goChipUid] : []}
          setValue={setGoChipUid}
          client={props.client}
          gqlQuery={getAllDevices}
          gqlVariables={{where: {device_type_id: {_eq: 0}}}}
          dataProps="devices"
        />
        {goChipUid &&
        <FormItem
          type="dropdown"
          label="Collar"
          uniqueKey="device_uid"
          displayKey="device_name"
          values={collarUid !== undefined ? [collarUid] : []}
          setValue={setCollarUid}
          client={props.client}
          gqlQuery={getAllDevices}
          gqlVariables={{where: {device_type_id: {_eq: 2}}}}
          dataProps="devices"
        />
        }
      </Form>
    </Container>

      <SynFooter
        onBack={() => props.navigation.navigate("Home")}
        onCancel={() => props.navigation.navigate("Home")}
        onContinue={save}
        disabledContinue={!goChipUid || !collarUid}
      />
    </>
  )
}


const apolloAttachToCollarScreen = withApollo(AttachToCollarScreen);
export default apolloAttachToCollarScreen;

