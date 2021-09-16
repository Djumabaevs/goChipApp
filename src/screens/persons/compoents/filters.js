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





const PersonFilters = (props) => {
    const [person_name, setName] = React.useState(props.filters.person_name ||"");
    const [person_phone, setPhone] = React.useState(props.filters.person_phone ||"");


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
                        <Label>Name</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> setName(value)}/>
                    </Item>
                    <Item stackedLabel>
                        <Label> Phone </Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> setPhone(value)}/>
                    </Item>

                        <Button block primary style={{margin: 15}} onPress={()=> {
                            props.setFilters({
                                person_name,
                                person_phone
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
              // onCancel={() => props.navigation.navigate("Home")}
            />
        </Container>
    )
}

export default PersonFilters;
