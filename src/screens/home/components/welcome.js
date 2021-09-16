import {Body, Card, CardItem, Content, H3, Icon, Left, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useQuery} from 'react-apollo';
import {getAllStatuses} from '../../../apollo/queries';

const WelcomeUser = (props) => {

    let statuses = {};
    const {data} = useQuery(getAllStatuses);
    if(data && data.statuses && data.statuses.length > 0){
        data.statuses.forEach((item)=> {
            statuses[item.status_id] = item.status_name;
        })
    }

    const getStatus = (status) => {
        return statuses[status.toString()] || status;
    }

    const {vet, checkVetStatus} = props;
    return (
        <Card transparent>
            <CardItem style={styles.welcomeCard}>
                <Left>
                    <Icon name="doctor" style={{color:"white", fontSize:40}} type="Fontisto"/>
                    <Body>
                        <H3 style={styles.headerCard}>
                            Welcome {vet.person_name}!
                        </H3>
                        <Text style={styles.bodyCard}>
                            Your status is {getStatus(vet.status)}.
                        </Text>
                    </Body>
                    <TouchableOpacity onPress={checkVetStatus}>
                        <Icon name="refresh" style={{color:"white", fontSize:20, marginTop: 20}} type="FontAwesome"/>
                    </TouchableOpacity>
                </Left>

            </CardItem>
        </Card>
    )
}


const styles = StyleSheet.create({
    welcomeCard: {
        backgroundColor: "#0d2653",
        // minHeight: 150
        // flexShrink: 0
        // flex: "0 1 auto"
        // flexGrow: 0
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
    }
});

export default WelcomeUser;
