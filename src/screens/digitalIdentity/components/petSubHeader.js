import React from 'react';
import {Body, Card, CardItem, H3, Icon, Left, Text} from 'native-base';
import {StyleSheet} from 'react-native';

const PetSubHeader = (props) => {

  let breed =`${props.pets_type.pet_type_name}s`;
  breed = props[breed][0][`${breed}_breed`].breed_name;
  return(
    <Card transparent>
      <CardItem style={styles.subHeader}>
        <Left>
          {props.pets_type.pet_type_name.toLowerCase() === "cat" &&
          <Icon name="cat" type="FontAwesome5" style={styles.icon}/>
          }
          {props.pets_type.pet_type_name.toLowerCase() === "dog" &&
          <Icon name="dog" type="FontAwesome5" style={styles.icon}/>
          }
          <Body>
            <H3 style={styles.headerCard}>{props.pets_type.pet_type_name.capitalize()} {props.pet_name}</H3>
            <H3 style={styles.headerCard}>
              Breed: {breed}.
            </H3>
            {props.persons_pets && props.persons_pets.length > 0 &&
            <Text style={styles.bodyCard}>
              Master: {props.persons_pets[0].person.person_name}
            </Text>
            }
          </Body>
        </Left>
      </CardItem>
    </Card>
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


export default PetSubHeader;
