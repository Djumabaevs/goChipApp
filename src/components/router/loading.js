import React from "react";
import { Container, Content, Spinner} from "native-base";
export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <Spinner color='#0d2653' />
                </Content>
            </Container>
        );
    }
}
