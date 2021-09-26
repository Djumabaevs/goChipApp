import React, {useEffect, useContext, useState} from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {ApolloProvider} from 'react-apollo';


import HomeScreen from "../../screens/home/home";
import PetsScreen from "../../screens/pets/pets";
import AddPetScreen from "../../screens/pets/addPet";
import DetailsPetScreen from "../../screens/pets/detailsPet";
import PersonsScreen from "../../screens/persons/persons";
import AddPersonScreen from "../../screens/persons/addPersons";
import LicensesScreen from "../../screens/licenses/licenses";
import AddLicenseScreen from "../../screens/licenses/addLicense";
import ChipsScreen from "../../screens/chips/chips";
import AddChipScreen from "../../screens/chips/addChip";
import ScanChipScreen from "../../screens/chips/scanChip";
import {ScanBLEDevice} from "../../screens/chips/scanBLE";
import DigitalIdentityScreen from "../../screens/digitalIdentity/addDigitalIdentity";
import AttachToPetScreen from "../../screens/digitalIdentity/attachToPet";
import AttachToCollarScreen from "../../screens/digitalIdentity/attachToCollar";
import AssociateChip from "../../screens/digitalIdentity/associateChip";
import ScanPetNFC from "../../screens/scan/scanPetNFC";
import SideBar from "./sidebar";
import LoadingApp from "./loading";

import {getClient} from '../../apollo/client';
import {getVetPersonByPhone} from '../../apollo/queries';
import ScanPetBLE from '../../screens/scan/scanPetBLE';
import DetailsChipScreen from '../../screens/chips/detailsChip';
import {AbilityContext} from '../../config/can';
import defineRulesFor from '../../config/ability';
import ProfileSelectScreen from '../../screens/welcome/profileSelect'

const SynRouter = (props) => {
  const [client, setClient] = useState();
  const [vet, setVet] = useState();
  const [persons, setPersons] = useState();
  const ability = useContext(AbilityContext);

  const logout = () => {
    setVet();
    props.logout();
  }

  useEffect(()=> {
      setClient(getClient("api", props.env));
    }, [])

    if(!client)
      return  <LoadingApp />

    if(!vet) {
        client.query({
            query: getVetPersonByPhone,
            variables: {
                phone: props.phone
            },
            fetchPolicy: "no-cache",
        }).then(({data}) => {
            if (data && data.persons.length > 0) {
              if(data.persons.length === 1) {
                let person = data.persons[0];
                person.role = person.persons_vets.length > 0 ? "admin" : "city";
                setVet(person);
                ability.update(defineRulesFor(person));
              }
              else {
                setPersons(data.persons)
              }
            }
        });
      if(persons && persons.length > 1){
        return (
          <ApolloProvider client={ client }>
            <ProfileSelectScreen
              setVet={(person) => {
                person.role = person.persons_vets.length > 0 ? "admin" : "city";
                setVet(person);
                ability.update(defineRulesFor(person));
              }}
              persons={persons}
            />
          </ApolloProvider>
        )
      }
      return <LoadingApp />
    }

    const checkVetStatus = async () => {
        client.query({
            query: getVetPersonByPhone,
            variables: {
                phone: props.phone
            },
            fetchPolicy: "no-cache",
        }).then(({data}) => {
            if (data && data.persons.length > 0) {
              const person = data.persons[0];
              person.role =  person.persons_vets.length > 0? "admin" : "city";
              setVet(person);
              ability.update(defineRulesFor(person));
            }
        });
    };



    const navigation = createDrawerNavigator(
        {
            Home: {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <HomeScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                            checkVetStatus={checkVetStatus}
                        />
                    </ApolloProvider>
            // },
            },
            Pets: {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <PetsScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Add Pet": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AddPetScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Details Pet": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <DetailsPetScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            Persons: {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <PersonsScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "PetDetailsChart": {
                screen: screenProps => 
                <ApolloProvider client={ client }>
                    <PetDetailsChartScreen
                     {...screenProps}
                     {...props}
                     vet={vet}
                     />
                </ApolloProvider>
            },
            "Add Person": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AddPersonScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
          Licenses: {
            screen: screenProps =>
              <ApolloProvider client={ client }>
                <LicensesScreen
                  {...screenProps}
                  {...props}
                  vet={vet}
                />
              </ApolloProvider>
          },
          "Add License": {
            screen: screenProps =>
              <ApolloProvider client={ client }>
                <AddLicenseScreen
                  {...screenProps}
                  {...props}
                  vet={vet}
                />
              </ApolloProvider>
          },
            Devices: {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <ChipsScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Details Chip": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <DetailsChipScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Add Chip": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AddChipScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Scan Chip": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <ScanChipScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "BLE Chip": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <ScanBLEDevice
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Digital Identity": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <DigitalIdentityScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
            "Attach To Pet": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AttachToPetScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
          "Attach To Collar": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AttachToCollarScreen
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
          "Associate Items": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <AssociateChip
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
          "Scan Pet using NFC": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <ScanPetNFC
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            },
          "Scan Pet using BLE": {
                screen: screenProps =>
                    <ApolloProvider client={ client }>
                        <ScanPetBLE
                            {...screenProps}
                            {...props}
                            vet={vet}
                        />
                    </ApolloProvider>
            }
        },
        {
            unmountInactiveRoutes: true,
            initialRouteName: "Home",
            drawerPosition: "left",
            openByDefault: true,
            contentComponent: _props => <SideBar {..._props} {...props} vet={vet} logout={logout}/>
        }
    );
    let AppContainer = createAppContainer(navigation);
    return (
        <AppContainer />
    );
}

export default SynRouter;
