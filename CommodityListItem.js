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

export default class CommodityListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old: '',
            background: '#1C2833'
        };
    }

    update_field = () => {
        this.setState({ background: 'rgba(255, 255, 0, 0.3)' })
        setTimeout(() => {
            this.setState({ background: '#1C2833' })
        }, 1000);
    }

    render() {
        const data = this.props.data
        if (this.state.old !== data[5]) {
            this.update_field()
            this.setState({ old: data[5] })
        }

        return (
            <ListItem icon noBorder style={{ height: 120 }}>
                <Left><CustomIcon name={this.props.iconName} size={50} color="white"></CustomIcon></Left>
                <Body>
                    <Text style={{ color: 'gold' }}>{this.props.title}</Text>
                    <Text style={{ color: 'white' }}>
                        <Text style={{color:'white' ,backgroundColor: this.state.background}}>{data[5]}</Text>{' '}
                        {
                            data[6].includes('-') ?
                                <CustomIcon name='down' size={15} color="red"></CustomIcon> :
                                <CustomIcon name='up' size={15} color="green"></CustomIcon>
                        }
                        {
                            data[6].includes('-') ?
                                <Text style={{ color: 'red' }}>{data[6]} ({data[7].replace('-', '')})</Text> :
                                <Text style={{ color: 'green' }}>{data[6].replace('+', '')} ({data[7].replace('+', '')})</Text>
                        }
                    </Text>
                    <Text note numberOfLines={2} style={{ color: 'white' }}>Open: {data[2]}{'\n'}
                        High: {data[3]} Low: {data[4]}
                    </Text>
                </Body>
                <Right style={{ paddingTop: 80 }}>
                    <Text style={{ color: 'pink' }}>{this.props.unit} {"\n"}
                        <Text note>Contract: {'\n'} {data[1]} {'\n'}</Text>
                    </Text>
                </Right>
            </ListItem>
        )
    }
}