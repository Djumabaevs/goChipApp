import React from 'react';
import {Container, Content, Spinner} from 'native-base';

const SynLogoApp = () => {
  return(
    <Container style={{backgroundColor:"#0d2653"}}>
      <Content>
        <Spinner color='#0d2653' />
      </Content>
    </Container>
  )
}

export default SynLogoApp;
