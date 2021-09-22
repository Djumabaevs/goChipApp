import React, {useEffect, useState} from 'react';
import {Container, Content, H3, Icon, Spinner, Text} from 'native-base';
import {getPet} from '../../apollo/queries';
import SynHeader from '../../components/layout/header';
import {Image, ScrollView, StyleSheet} from 'react-native';
import PetDevicesList from './petDevicesList';

const PetDetailsContainer = (props) => {
  const [pet, setPet] = useState();
  const _getPet = async () => {
    const {data} = await props.client.query({
      query: getPet,
      variables:{
        pet_uid: props.petUid
      },
      fetchPolicy: "no-cache",
    });
   if(data){
     setPet(data.pets[0])
   }
  }

  useEffect(() => {_getPet()}, [props.petUid]);

  if(pet){
    return (
      <Container>
        {props.onBack && <SynHeader
          title={pet.pet_name}
          navigation={props.navigation}
          onClose={props.onBack}
        />
        }
        <ScrollView>
          <Content>
            {pet.pet_photo && <Image source={{uri: pet.pet_photo}} style={styles.image} /> }
            {!pet.pet_photo &&
            <Icon name={pet.dogs.length > 0? "dog" : "cat"} type="FontAwesome5" style={{...styles.image, ...styles.icon}}/>
            }
            <H3 style={styles.centered}>Hi, I am {pet.pet_name} a {pet.pets_type.pet_type_name}.</H3>
            {pet.dogs.length > 0 && <>
              <Text style={styles.centered}> Breed: {pet.dogs[0].dogs_breed.breed_name}</Text>
              <Text style={styles.centered}> Color: {pet.dogs[0].colour.capitalize()}</Text>
              <Text style={styles.centered}> Gender: {pet.dogs[0].gender.capitalize()}</Text>
              <Text style={styles.centered}> Weight: {pet.dogs[0].weight} kg</Text>
            </>
            }
            {pet.cats.length > 0 && <>
              <Text style={styles.centered}> Breed: {pet.cats[0].cats_breed.breed_name}</Text>
              <Text style={styles.centered}> Color: {pet.cats[0].colour.capitalize()}</Text>
              <Text style={styles.centered}> Gender: {pet.cats[0].gender.capitalize()}</Text>
              <Text style={styles.centered}> Weight: {pet.cats[0].weight} kg</Text>
            </>
            }

            
            <PetDevicesList petDevices={pet.pets_devices} city_licenses={pet.city_licenses}/>
            {props.children}
          </Content>
        </ScrollView>
      </Container>
    )
  }


  return(
    <Container>
      <Spinner />
    </Container>
  );
}

const styles = StyleSheet.create({
  image:{width:150, height:150, borderRadius: 100, marginLeft:"auto", marginRight:"auto", marginTop: 10 },
  centered:{ marginLeft: "auto", marginRight: "auto"},
  icon:{fontSize: 110, borderWidth: 5, padding: 10 },
});

export default PetDetailsContainer;
