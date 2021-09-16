import React, {useEffect, useState} from 'react';
import SynFooter from '../../components/layout/footer';
import {Container, Content, Input, Item, Label, Form} from 'native-base';
import {getAllChips} from '../../apollo/queries';
import {withApollo} from 'react-apollo';
import SynHeader from '../../components/layout/header';
import {ScrollView} from 'react-native';

const DetailsChipScreen = (props) => {
  const [chip, setChip] = useState();
  useEffect(()=> {
    const _getChip = async () => {
      const {data} = await props.client.query({
        query: getAllChips,
        variables:{ where: { device_uid: { _eq: props.navigation.state.params.id } } },
        fetchPolicy: "no-cache",
      });
      if(data && data.devices.length > 0){
        setChip(data.devices[0]);
      }
    }
   _getChip();
  }, [props.navigation.state.params.id]);
  if(chip) {
    let type = chip.devices_type.device_type_id;
    const showItem = type === 0 || type === 1 || type === 2 || type === 4;
    let item = {};
    switch (type) {
      case(4): {
        item = chip.city_chips[0] || {};
        break;
      }
      case(3): {
        break;
      }
      case(2): {
        item = chip.gochip_collars[0] || {};
        break;
      }
      case(1): {
        item = chip.chips[0] || {};
        break
      }
      case(0): {
        item = chip.gochips[0] || {};
        break;
      }
      default: item = {};
    }

    return (
      <Container>
        <SynHeader
          title={`Details ${chip.devices_type.device_type_name.capitalize()}`}
          navigation={props.navigation}
          onClose={props.onBack}
        />
        <Container>
          <ScrollView>
            <Content>
              <Form>
              <Item fixedLabel>
                <Label>Type</Label>
                <Input style={{marginTop: 5, marginRight: 15}} value={chip.devices_type.device_type_name.capitalize()} disabled/>
              </Item>
              <Item fixedLabel>
                <Label>Manufacturer</Label>
                <Input style={{marginTop: 5, marginRight: 15}} value={chip.manufacturer.manufacturer_name.capitalize()} disabled/>
              </Item>
                <Item fixedLabel>
                <Label>Name</Label>
                <Input style={{marginTop: 5, marginRight: 15}} value={chip.device_name} disabled/>
              </Item>
                {showItem &&
                <Item fixedLabel>
                  <Label>Batch Number</Label>
                  <Input style={{marginTop: 5, marginRight: 15}} value={item.batch_number} disabled/>
                </Item>
                }
                {showItem &&
                <Item fixedLabel>
                  <Label>Model Number</Label>
                  <Input type="number" style={{marginTop: 5, marginRight: 15}} value={item.model_number} disabled/>
                </Item>
                }
                {showItem &&
                <Item fixedLabel>
                  <Label>Serial Number</Label>
                  <Input type="number" style={{marginTop: 5, marginRight: 15}} value={item.serial_number} disabled/>
                </Item>
                }
                {(type === 0 || type === 1) &&
                <Item fixedLabel>
                  <Label>ISO</Label>
                  <Input type="number" style={{marginTop: 5, marginRight: 15}} value={item.iso} disabled/>
                </Item>
                }
                {type === 0 &&
                <Item fixedLabel>
                  <Label>NFC</Label>
                  <Input type="number" style={{marginTop: 5, marginRight: 15}} value={item.nfc} disabled/>
                </Item>
                }

                {(type === 4 || type ===2) &&
                <Item fixedLabel>
                  <Label>Device Id</Label>
                  <Input style={{marginTop: 5, marginRight: 15}} value={item.device_id} disabled/>
                </Item>
                }
              </Form>
            </Content>
          </ScrollView>
        </Container>
        <SynFooter
          onBack={() => props.navigation.navigate("Devices")}
          onCancel={() => props.navigation.navigate("Home")}
        />
      </Container>
    )
  }
  return (
      <SynFooter
      onBack={() => props.navigation.navigate("Devices")}
      onCancel={() => props.navigation.navigate("Home")}
    />
  );
}

const apolloDetailsChipScreen = withApollo(DetailsChipScreen);
export default apolloDetailsChipScreen;
