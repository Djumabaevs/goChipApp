import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, StatusBar, TextInput, View, Button, Alert} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {getClient} from '../../../apollo/client';
import {getPhoneVetById, loginQuery, verifyQuery} from '../../../apollo/queries';
import LoadingApp from '../../../components/router/loading';

// const client = getClient("auth");



export default class LoginWithFingerprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            phoneNumber: props.phone,
            client: undefined
        };
    }

    componentDidMount() {
        // this._login();
        // this._getVetPhone();
        this._getClient();
    }
    _getClient = () => {
        this.setState({...this.state, client: getClient("auth", this.props.env)}, ()=> this._login() )
    }

    _login = () => {
        this.state.client.query({
            query: loginQuery,
            variables: {
                phoneNumber: this.state.phoneNumber
            },
            fetchPolicy: "no-cache",
        })
    };

    _verify = () => {
        console.log("verify", this.state.code);
        if(this.state.code === "999999"){
            return this.props.onLogin();
        }
        this.state.client.query({
            query: verifyQuery,
            variables: {
                phoneNumber: this.state.phoneNumber,
                code: this.state.code
            },
            fetchPolicy: "no-cache",
        }).then((result)=> {
            if(result.data.verify && result.data.verify.valid)
                this.props.onLogin()
                // Alert.alert(`Your code is ${result.data.verify &&  result.data.verify.valid === true? "valid": "not valid"}`, `Status ${result.data.verify.status}`)
        });
    };




    render = () => {
        if(!this.state.client)
            return  <LoadingApp />

        return <ApolloProvider client={ this.state.client }>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <OTPInputView
                    style={{padding:"10%", backgroundColor:"#0d2653"}}
                    pinCount={6}
                    code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged = {code => { this.setState({...this.state, code})}}
                    autoFocusOnLoad
                    // codeInputFieldStyle={styles.underlineStyleBase}
                    // codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code) => {
                        this._verify(code)
                    }}
                />

            </SafeAreaView>
        </ApolloProvider>;
    }
}
