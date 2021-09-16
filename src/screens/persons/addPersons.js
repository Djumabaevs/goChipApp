import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import {StyleSheet} from 'react-native';
import {Text, Container, Item, Input, Button, Form, Label, View} from 'native-base';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import SynHeader from '../../components/layout/header';
import {addPerson} from '../../apollo/mutations';
import SynFooter from '../../components/layout/footer';

class AddPersonScreen extends Component {
    state = {
        person_name: "",
        person_phone: "",
        person_uid:  uuidv4()
    }

    save = async () => {
        const result = await this.props.client.mutate({
            mutation: addPerson,
            variables: {person: this.state},
            fetchPolicy: "no-cache",
        });
        this.props.navigation.navigate("Persons");
    }

    render() {
        return (
          <>
            <Container>
                <SynHeader
                  title="Add Person"
                  navigation={this.props.navigation}
                  onClose={() => this.props.navigation.navigate("Persons")}
                />
                <Form>
                    <Item fixedLabel>
                        <Label>Name</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> this.setState({person_name:value})}/>
                    </Item>
                    <Item fixedLabel>
                        <Label>Phone</Label>
                        <Input style={{marginTop:5, marginRight: 15}}
                               onChangeText={(value)=> this.setState({person_phone:value})}/>
                    </Item>
                </Form>
            </Container>
            <SynFooter
              onBack={() => this.props.navigation.navigate("Persons")}
              onCancel={() => this.props.navigation.navigate("Home")}
              onContinue={this.save}
            />
        </>
        )
    }
}

const styles = StyleSheet.create({

});


const apolloAddPersonScreen = withApollo(AddPersonScreen);
export default apolloAddPersonScreen;
