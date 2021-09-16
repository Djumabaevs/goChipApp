import React, { Component } from 'react';
import {Platform, Alert} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';


export default class LoginWithFingerprint extends Component {


    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .catch( (error) => {
                console.debug("FingerprintScanner", error);
                this.props.setAuth("OTP");
            } );
        if (this.requiresLegacyAuthentication()) {
            this.authLegacy();
        } else {
            this.authCurrent();
        }
    }

    componentWillUnmount = () => {
        FingerprintScanner.release();
    }

    requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }

    authCurrent() {
        FingerprintScanner
            .authenticate({ description: this.props.description || 'Login',  })
            .then(() => {
                this.props.onLogin()
                // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                console.debug("FingerprintScanner", error);
                this.props.setAuth("OTP");
                // Alert.alert('Fingerprint Authentication', error.message);
                // errorMessage: error.message, biometric: error.biometric
            });
    }

    authLegacy() {
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
            .then(() => {
                // this.props.handlePopupDismissedLegacy();
                // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
                this.props.onLogin()
            })
            .catch((error) => {
                console.debug("FingerprintScanner", error);
                this.props.setAuth("OTP");
                // if error go to login with OTP
                // this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
                // this.description.shake();
            });
    }



    handleAuthenticationAttemptedLegacy = (error) => {
        console.debug("FingerprintScanner", error);
        this.props.setAuth("OTP");
        // if error go to login with OTP
        // this.setState({ errorMessageLegacy: error.message });
        // this.description.shake();
    };

    render = () => {
        return null;
    }
}
