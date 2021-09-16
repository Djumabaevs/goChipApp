import React, {useEffect, useState} from 'react';
import {Button, Content, H3, List, Spinner, Text, View} from 'native-base';

const SynListContainer = (props) => {
  const {onAdd, itemContainer, keyName} = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState(props.items || []);

  useEffect(()=> {
    if (props.gqlQuery) {
      setLoading(true);
      setItems([]);
      setError();
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

  if(loading){
    return  <Spinner color='#0d2653' />
  }

  if(error){
    return( <Button danger transparent>
      <Text>Data Error</Text>
    </Button>
    )
  }

  if(items.length === 0 && onAdd) {
    return (
      <View>
        <H3 style={{ marginTop: 20,marginLeft: "auto", marginRight:"auto"}}>
          Empty list!
        </H3>
        <Button transparent style={{marginLeft: "auto", marginRight:"auto"}}
                onPress={onAdd}>
          <Text>
            Add
          </Text>
        </Button>
      </View>
    )
  }

  return(
    <Content>
      <List style={{marginBottom: 50}}>
        {items && items.map((item) => itemContainer({ navigation: props.navigation, ...item, key: item[keyName]})) }
      </List>
    </Content>
  )
}

export default SynListContainer;
