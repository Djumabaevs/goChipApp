import React from 'react';
import {Buffer} from 'buffer';
import { Content, CardItem, Button, ListItem, Text, Icon, Left, Body, Right, Spinner } from 'native-base';

export const ListElementsBLE = (props) => {
    const {items, device, handleConnect} = props;
    if(!items || items.length === 0)
        return null;
    return (
      <>
          { items.map((item) => (
            // <React.Fragment key={item.id}>
            //     <CardItem header>
            //         <Text>{item.name}</Text>
            //     </CardItem>
            //     <CardItem bordered>
            //         <Body>
            //             <Text>{item.id}</Text>
            //             <Text note>
            //             {Buffer.from(item.manufacturerData, 'base64').toString("hex")}
            //             </Text>
            //         </Body>
            //     </CardItem>
            // </React.Fragment>
            <ListItem
              key={item.id}
              icon
              button={true}
              onPress={() => handleConnect(item)}
            >
                <Left>
                    <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="bluetooth-transfer" type="MaterialCommunityIcons"/>
                    </Button>
                </Left>
                <Body>
                    <Text>{item.name || item.id}</Text>
                </Body>
                <Right>
                    {/*{device !== null && item.id === device.id  && <Spinner /> }*/}
                    {/*{ (device === null || item.id !== device.id) &&*/}
                    <Icon name="transit-connection" type="MaterialCommunityIcons"/>
                    {/*}*/}
                </Right>
            </ListItem>
          )) }
      </>
    )
    // return (
    //     <Content>
    //         { items.map((item) => (
    //             <ListItem
    //                 key={item.id}
    //                 icon
    //                 button={true}
    //                 onPress={() => handleConnect(item)}
    //             >
    //                 <Left>
    //                     <Button style={{ backgroundColor: "#FF9501" }}>
    //                         <Icon active name="bluetooth-transfer" type="MaterialCommunityIcons"/>
    //                     </Button>
    //                 </Left>
    //                 <Body>
    //                     <Text>{item.name}</Text>
    //                 </Body>
    //                 <Right>
    //                     {device !== null && item.id === device.id  && <Spinner /> }
    //                     { (device === null || item.id !== device.id) &&
    //                     <Icon name="transit-connection" type="MaterialCommunityIcons"/> }
    //                 </Right>
    //             </ListItem>
    //         )) }
    //     </Content>
    // )
}
