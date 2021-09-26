import React,  {Component} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MultiSelect from 'react-native-multiple-select';

const items = [
 { id:1 , name: 'Vet Details'},
 { id: 2, name: 'Insurance'}
];

export default class multiSelect extends Component {

    state = {
      selectedItems : []
    };
  
    
    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    };
  
    render() {
      const { selectedItems } = this.state;
  
      return (
        <View style={{ flex: 1 }}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={ (text)=> console.log(text)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <View>
            {this.multiSelect.getSelectedItemsExt(selectedItems)}
          </View>
        </View>
      );
    }
  }