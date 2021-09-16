import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {Form, Item, Label, View, Spinner, Button, Text} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import PropTypes  from 'prop-types';

const options = (white) => ( {
  hideTags: true,
  fixedHeight: true,
  single: true,
  styleListContainer:{maxHeight: 200},
  styleDropdownMenuSubsection:{borderBottomWidth: 0},
  styleInputGroup: white ? {} : { marginRight: 25},
  selectText:"",
  searchInputPlaceholderText:"Search...",
  submitButtonText:"Close"
} )

export const DropDownFromItem = (props) => {
  const [loading, setLoading] = useState(JSON.stringify(props.items) === "[]" || props.items === undefined);
  const [error, setError] = useState();
  const [items, setItems] = useState(props.items);

  let displayName = props.displayKey;

  const partDisplayName = displayName.split(["["]);
  if(partDisplayName.length > 1) {
    items.filter((item) => {
      let name = {...item};
      partDisplayName.forEach((dName)=> {
        if(dName && name){
          name = name[dName.split("]")[0]]
          if(Array.isArray(name)) {
            name = name[0]
          }
        }
      })
      if(name){
        item.name = name;
        return item;
      }
    })
    displayName = "name";
  }

  useEffect(()=> {
    if (props.gqlQuery) {
      props.client.query({
        query: props.gqlQuery,
        variables: props.gqlVariables,
        fetchPolicy: "no-cache",
      }).then((response) => {
        const {data, loading: loadingData, errors} = response;
        if(data && data[props.dataProps]){
          setItems(data[props.dataProps]);
        }
        setError(errors);
        setLoading(loadingData);
      });
    }
  }, [props.gqlQuery,props.gqlVariables]);

  const handleSelect = (items) => {
    Keyboard.dismiss();
    props.setValue(items[0]);
  }

  return (
    <Item>
      <Label style={props.white ? {color:"white"} : {}}> {props.label} </Label>
      <View style={{flex: 1, marginTop: 10}}>
        { items.length > 0 &&
        <MultiSelect
          {...options(props.white)}
          items={items}
          uniqueKey={props.uniqueKey}
          onSelectedItemsChange={handleSelect}
          selectedItems={props.values}
          displayKey={displayName}
        />
        }
       { loading && <Spinner /> }
        {error && <Button danger transparent>
          <Text>Data Error</Text>
        </Button>}
       { !loading && !error && items.length === 0 &&
       <Button info transparent>
         <Text>No data</Text>
       </Button>
       }
      </View>
    </Item>
  )
}

DropDownFromItem.propTypes = {
  label: PropTypes.string,
  uniqueKey: PropTypes.string,
  displayKey: PropTypes.string,
  items: PropTypes.array,
  values: PropTypes.array
}


DropDownFromItem.defaultProps = {
  label: `Prop "label" is not set`,
  uniqueKey: "id",
  displayKey: "name",
  items: [],
  values: [],
  dataProps: "data",
  gqlQuery: undefined,
  gqlVariables: undefined

}
