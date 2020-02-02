import React, { Component } from 'react';
import {
    Container, Header, Title, Content, Footer,
    FooterTab, Button, Left, Right, Body, Icon, Text,
    Accordion, Card, CardItem, Thumbnail, ListItem,
    CheckBox, DatePicker, DeckSwiper, View, Fab,
    Badge, Form, Item, Input, Label, Picker, Textarea,
    Switch, Radio, Spinner, Tab, Tabs, TabHeading,
    ScrollableTab, H1, H2, H3, Drawer,
} from 'native-base';

import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icon_json from './assets/selection.json'

const icon_ttf = require("./assets/icomoon.ttf");
const CustomIcon = createIconSetFromIcoMoon(icon_json, '', icon_ttf);

export default class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#1C2833' }}>
                <Header style={{ marginTop: 25 }}>
                    <Body>
                        <Title>Commodity Price</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.closeDrawer()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <ListItem icon noBorder onPress={() => { this.props.changeCategory(1); this.props.closeDrawer() }}>
                        <Left>
                            <Icon type='FontAwesome5' name="fire" style={{ color: 'white' }} />
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Energy</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder onPress={() => { this.props.changeCategory(2); this.props.closeDrawer() }}>
                        <Left>
                            <CustomIcon name='gold' size={24} color="white"></CustomIcon>
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Metals</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder onPress={() => { this.props.changeCategory(3); this.props.closeDrawer() }}>
                        <Left>
                            <CustomIcon name='grain' size={24} color="white"></CustomIcon>
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Grains</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder onPress={() => { this.props.changeCategory(4); this.props.closeDrawer() }}>
                        <Left>
                            <CustomIcon name='coffee' size={24} color="white"></CustomIcon>
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Softs</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon noBorder onPress={() => { this.props.changeCategory(5); this.props.closeDrawer() }}>
                        <Left>
                            <CustomIcon name='live_cattle' size={24} color="white"></CustomIcon>
                        </Left>
                        <Body>
                            <Text style={{ color: 'white' }}>Livestock</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}
