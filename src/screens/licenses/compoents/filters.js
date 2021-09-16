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
    Input,
    Label,
} from 'native-base';
import SynFooter from '../../../components/layout/footer';





const LicenseFilters = (props) => {
    const [license_type_name, setName] = React.useState(props.filters.license_type_name ||"");
    const [country_name, setCountryName] = React.useState(props.filters.country_name ||"");
    const [city_name, setCityName] = React.useState(props.filters.city_name ||"");
    const [pet, setPet] = React.useState(props.filters.pet ||"");


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
                    <Item stackedLabel>
                        <Label>License Name</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> setName(value)}/>
                    </Item>
                        <Button block primary style={{margin: 15}} onPress={()=> {
                            props.setFilters({
                                country_name,
                                city_name,
                                license_type_name,
                                pet
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
              onBack={() =>  props.close()}
            />
        </Container>
    )
}

export default LicenseFilters;
