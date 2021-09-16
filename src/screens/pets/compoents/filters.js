import React from 'react';
import {
    View,
    Text,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Container,
    Content,
    Form,
    Item,
    Label,
    Input,
    Spinner,
} from 'native-base';
import MultiSelect from 'react-native-multiple-select';

import {getAllBreeds, getAllPetTypes} from '../../../apollo/queries';
import {ScrollView} from 'react-native';
import SynFooter from '../../../components/layout/footer';

const PetFilters = (props) => {
    const [dogBreeds, setDogBreeds] = React.useState();
    const [catBreeds, setCatBreeds] = React.useState();
    const [types, setTypes] = React.useState();
    const [selectedType, setSelectedType] = React.useState(props.filters.pet);
    const [selectedDogBreedItems, setDogBreedItems] = React.useState(props.filters.dogBreeds || []);
    const [selectedCatBreedItems, setCatBreedItems] = React.useState(props.filters.catBreeds || []);
    const [selectedGenderItems, setGenderItems] = React.useState(props.filters.genders || []);
    const [color, setColor] = React.useState(props.filters.color ||"");
    const [minWeight, setMinWeight] = React.useState(props.filters.minWeight ||"");
    const [maxWeight, setMaxWeight] = React.useState(props.filters.maxWeight ||"");
    if(!dogBreeds && !catBreeds) {
        props.client.query({
            query: getAllBreeds,
            fetchPolicy: "no-cache",
        }).then(({data}) => {
            if (data && data.dogs_breeds) {
                setDogBreeds(data.dogs_breeds);
            }
            if (data && data.cats_breeds) {
                setCatBreeds(data.cats_breeds);
            }
        });
    }
    if(!types) {
        props.client.query({
            query: getAllPetTypes,
            fetchPolicy: "no-cache",
        }).then(({data}) => {
            if (data && data.pets_types) {
                setTypes(data.pets_types.map((i)=> {
                    i.pet_type_name = i.pet_type_name.capitalize();
                    return i;
                }));
            }
        });
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.close() }>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                       Filters
                    </Title>
                </Body>
            </Header>
            <Content>
                <Form>
                    <Item stackedLabel style={{borderColor: "transparent"}}>
                        <Label> Pet </Label>
                        {!types  &&
                        <Spinner color='#0d2653' />
                        }
                        {types && types.length === 0 &&
                            <Text style={{color:"red"}}>
                                There are no pet types .
                            </Text>
                        }
                        {types && types.length > 0 &&
                            <View style={{flex: 1, width: "100%", marginTop: 20}}>
                                <MultiSelect
                                    single
                                    hideTags
                                    styleMainWrapper={{borderWidth: 0}}
                                    styleSelectorContainer={{marginRight: 20}}
                                    fontSize={16}
                                    items={types}
                                    uniqueKey="pet_type_id"
                                    onSelectedItemsChange={(keys) => {
                                        setSelectedType(keys);
                                        setCatBreedItems([])
                                        setDogBreedItems([]);
                                    }}
                                    selectedItems={selectedType}
                                    selectText=""
                                    searchInputPlaceholderText="Search pet..."
                                    displayKey="pet_type_name"
                                    submitButtonText="Close"
                                />
                            </View>
                        }
                    </Item>
                    { selectedType === "dog" &&
                    <Item stackedLabel style={{borderColor: "transparent"}}>
                        <Label> Breed</Label>
                        {!dogBreeds &&
                        <Spinner color='#0d2653'/>
                        }
                        {dogBreeds && dogBreeds.length === 0 &&
                        <Text style={{color: "red"}}>
                            There are no dogBreeds.
                        </Text>
                        }
                        {dogBreeds && dogBreeds.length > 0 &&
                        <View style={{flex: 1, width: "100%", marginTop: 20}}>
                            <MultiSelect
                                hideTags
                                items={dogBreeds}
                                styleMainWrapper={{borderWidth: 0}}
                                styleSelectorContainer={{marginRight: 20}}
                                fontSize={16}
                                uniqueKey="breed_id"
                                onSelectedItemsChange={(selectedDogBreedItems) => setDogBreedItems(selectedDogBreedItems)}
                                selectedItems={selectedDogBreedItems}
                                selectText=""
                                searchInputPlaceholderText="Search dog breed..."
                                displayKey="breed_name"
                                submitButtonText="Close"
                            />
                        </View>
                        }
                    </Item>
                    }

                    { selectedType === "cat" &&
                    <Item stackedLabel style={{borderColor: "transparent"}}>
                        <Label> Breed </Label>
                        {!catBreeds &&
                        <Spinner color='#0d2653'/>
                        }
                        {catBreeds && catBreeds.length === 0 &&
                        <Text style={{color: "red"}}>
                            There are no dogBreeds.
                        </Text>
                        }
                        {catBreeds && catBreeds.length > 0 &&
                        <View style={{flex: 1, width: "100%", marginTop: 20}}>
                            <MultiSelect
                                hideTags
                                styleSelectorContainer={{marginRight: 20}}
                                fontSize={16}
                                items={catBreeds}
                                uniqueKey="breed_id"
                                onSelectedItemsChange={(catBreedItems) => setCatBreedItems(catBreedItems)}
                                selectedItems={selectedCatBreedItems}
                                selectText=""
                                searchInputPlaceholderText="Search cat breed..."
                                displayKey="breed_name"
                                submitButtonText="Close"
                            />
                        </View>
                        }
                    </Item>
                    }
                    {selectedType &&
                    <Item stackedLabel style={{borderColor: "transparent"}}>
                        <Label>Gender</Label>
                        <View style={{flex: 1, width: "100%", marginTop: 20}}>
                            <MultiSelect
                                hideTags
                                styleSelectorContainer={{marginRight: 20}}
                                fontSize={16}
                                items={[{name: "Male"}, {name: "Female"}]}
                                uniqueKey="name"
                                onSelectedItemsChange={(selectedItems) => setGenderItems(selectedItems)}
                                selectedItems={selectedGenderItems}
                                selectText=""
                                searchInputPlaceholderText="Search gender..."
                                displayKey="name"
                                submitButtonText="Close"
                            />
                        </View>
                    </Item>
                    }
                    {selectedType &&
                    <Item stackedLabel>
                        <Label>Color</Label>
                        <Input style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => setColor(value)}/>
                    </Item>
                    }
                    {selectedType &&
                    <Item stackedLabel>
                        <Label>Min Weight</Label>
                        <Input type="number" style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => setMinWeight(value)}/>
                    </Item>
                    }
                    {selectedType &&
                    <Item stackedLabel>
                        <Label>Max Weight</Label>
                        <Input style={{marginTop: 5, marginRight: 15}}
                               onChangeText={(value) => setMaxWeight(value)}/>
                    </Item>
                    }
                        <Button block primary style={{margin: 15}} onPress={()=> {
                            props.setFilters({
                                minWeight: minWeight,
                                maxWeight: maxWeight,
                                color: color,
                                genders: selectedGenderItems,
                                pet: selectedType? types.find((t)=> t.pet_type_id === selectedType[0]).pet_type_name : undefined,
                                dogBreeds: selectedDogBreedItems,
                                catBreeds: selectedCatBreedItems,
                            });
                            props.close();
                        }}>
                            <Text>
                                Apply
                            </Text>
                        </Button>
                </Form>
            </Content>
            <SynFooter
              onBack={props.close}
              // onCancel={() => this.props.navigation.navigate("Home")}
            />
        </Container>
    )
}

export default PetFilters;
