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


import {getAllDevicesTypes} from '../../../apollo/queries';
import SynFooter from '../../../components/layout/footer';


const ChipFilters = (props) => {
    const [types, setTypes] = React.useState();
    const [selectedTypes, setSelectedTypes] = React.useState(props.filters.selectedTypes || []);
    const [deviceName, setName] = React.useState(props.filters.deviceName ||"");

    if(!types) {
        props.client.query({
            query: getAllDevicesTypes,
            fetchPolicy: "no-cache",
        }).then(({data}) => {
            if (data && data.devices_types) {
                setTypes(data.devices_types);
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
                    <Item style={{borderColor:"transparent"}} stackedLabel>
                        <Label>Type</Label>
                        {!types &&
                        <Spinner color='#0d2653'/>
                        }
                        {types && types.length === 0 &&
                        <Text style={{color: "red"}}>
                            There are no device types.
                        </Text>
                        }
                        {types && types.length > 0 &&
                        <View style={{flex: 1, width: "100%", marginTop: 20}}>
                            <MultiSelect
                                hideTags
                                items={types}
                                styleMainWrapper={{borderWidth: 0}}
                                styleSelectorContainer={{marginRight: 20}}
                                fontSize={16}
                                uniqueKey="device_type_id"
                                onSelectedItemsChange={(selected) => setSelectedTypes(selected)}
                                selectedItems={selectedTypes}
                                selectText=" "
                                searchInputPlaceholderText="Search device type..."
                                displayKey="device_type_name"
                                submitButtonText="Close"
                            />
                        </View>
                        }
                    </Item>
                    <Item stackedLabel>
                        <Label>Device Name</Label>
                        <Input style={{ marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> setName(value)}/>
                    </Item>
                        <Button block primary style={{margin: 15}} onPress={()=> {
                            props.setFilters({ deviceName, selectedTypes});
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
              // onCancel={() => props.navigation.navigate("Home")}
            />
        </Container>

    )
}

export default ChipFilters;
