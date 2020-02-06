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

export default class ForexListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old: '',
            background: '#1C2833',
        };
    }

    render() {
        const { data, usd } = this.props
        let reciprocal = false
        const currency = data[0] === 'USDUSD' ? ['USD', ''] : data[0].split('USD')
        if (currency[1] === '') { reciprocal = true }

        return (
            <Button vertical style={{ flex: 1, margin: 2, backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
                <Text numberOfLines={1}
                    style={{ color: 'gold', fontSize: 12 }}>
                    {data[1].replace(/&nbsp;/g, ' ')}
                </Text>
                <Text numberOfLines={1} style={{ color: 'white', fontSize: 12 }}>{
                    reciprocal ?
                        (usd / parseFloat(data[5])).toFixed(2).toString() :
                        (usd * parseFloat(data[5])).toFixed(2).toString()
                }{' '}
                    <Text style={{ color: 'gold', fontSize: 12 }}>{currency[0]}{currency[1]}</Text>
                </Text>
            </Button>
        )
    }
}