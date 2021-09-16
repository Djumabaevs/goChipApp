import React from 'react';
import { DataTable } from 'react-native-paper';
import moment from 'moment';

const PetDevicesList = (props) => {
  let items = [];
  if(props.petDevices){
     items = [...items, ...props.petDevices.map((item) => (
        <DataTable.Row key={item.device.device_uid}>
          <DataTable.Cell>{item.device.devices_type.device_type_name.capitalize()}</DataTable.Cell>
          <DataTable.Cell>{moment(item.from_time).format("DD-MM-YYYY")}</DataTable.Cell>
          <DataTable.Cell>{item.to_time? moment(item.to_time).format("DD-MM-YYYY") : "No date"}</DataTable.Cell>
        </DataTable.Row>
      )
    )];
  }

  if(props.city_licenses){
    items = [...items, ...props.city_licenses.map((item) =>(
      <DataTable.Row key={item.city_license_uid}>
        <DataTable.Cell>{item.license_type.license_type_name}</DataTable.Cell>
        <DataTable.Cell>{moment(item.effective_from).format("DD-MM-YYYY")}</DataTable.Cell>
        <DataTable.Cell>{item.effective_to? moment(item.effective_to).format("DD-MM-YYYY") : "No date"}</DataTable.Cell>
      </DataTable.Row>
    ))]
  }


  if(items.length > 0){
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>From</DataTable.Title>
          <DataTable.Title>To</DataTable.Title>
        </DataTable.Header>

        {items}

      </DataTable>
    )
  }

  return null;
}

export default PetDevicesList;
