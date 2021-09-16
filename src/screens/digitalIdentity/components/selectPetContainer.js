import React, {useState} from 'react';
import {Container, Form} from 'native-base';
import SynHeader from '../../../components/layout/header';
import {FormItem} from '../../../newComponents/form/FormItem';
import {getAllPets, getAllPetTypes} from '../../../apollo/queries';
import SynFooter from '../../../components/layout/footer';

const SelectPetContainer = (props) => {
  const [petTypeUid, setPetTypeUid] = useState();
  const [petUid, setPetUid] = useState();

  const save = () => {
    props.setPet({pet_uid: petUid});
    props.changeScreen("Select Devices");
  }

  return(
    <>
      <SynHeader title="Attach To Pet" navigation={props.navigation} />
      <Container>
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
          gqlVariables={{orderType: "desc", where: {pets_type: {pet_type_id: {_eq: petTypeUid}}}}}
          dataProps="pets"
        />
        }
      </Form>
    </Container>
    <SynFooter
      onBack={() => props.navigation.navigate("Home")}
      onCancel={() => props.navigation.navigate("Home")}
      onContinue={save}
      disabledContinue={!petUid}
    />
    </>
  )
}

export default SelectPetContainer;
