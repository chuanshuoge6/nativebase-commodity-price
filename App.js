import React, { Component } from 'react';
import JSSoup from 'jssoup'
import axios from 'axios'
import * as Font from 'expo-font'
import { Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import DrawerContent from './Drawer'
import CommodityListItem from './CommodityListItem'
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFont: true,
      category: 2,
      feeder_cattle: null,
      lean_hog: null,
      live_cattle: null,
      brent_crude: null,
      ethanol: null,
      coal: null,
      propane: null,
      fuel_oil: null,
      natural_gas: null,
      gasoline: null,
      copper: null,
      gold: null,
      palladium: null,
      platinum: null,
      silver: null,
      corn: null,
      red_wheat: null,
      soybean_meal: null,
      soybean_oil: null,
      soybean: null,
      wheat: null,
      cocoa: null,
      coffee: null,
      cotton: null,
      orange_juce: null,
      sugar: null,
      lumber: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadingFont: false })

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/category.html?c=metals',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let copper = []
        tr[0].findAll('td').forEach(element => {
          copper.push(element.string.toString())
        });
        this.setState({ copper })

        let gold = []
        tr[4].findAll('td').forEach(element => {
          gold.push(element.string.toString())
        });
        this.setState({ gold })

        let palladium = []
        tr[6].findAll('td').forEach(element => {
          palladium.push(element.string.toString())
        });
        this.setState({ palladium })

        let platinum = []
        tr[8].findAll('td').forEach(element => {
          platinum.push(element.string.toString())
        });
        this.setState({ platinum })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/charting/?s=FOREX_XAGUSDO',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const table = soup.findAll('table')

        let data1 = []
        table[0].findAll('tr').forEach(tr => {
          data1.push(tr.find('td').string.toString())
        });

        let data2 = []
        table[1].findAll('tr').forEach(tr => {
          data2.push(tr.find('td').string.toString())
        });

        const dif = parseFloat(data1[0]) - parseFloat(data1[1])
        const percentDif = dif / parseFloat(data1[1])
        const change = dif >= 0 ? '+' + dif.toString() : '-' + dif.toString()
        const pct = dif >= 0 ? '+' + percentDif.toString() + '%' : '-' + percentDif.toString() + '%'
        const silver = ['', data2[3].split(' ')[0], data2[0], data2[1], data1[2], data1[0], change, pct, data2[3].split(' ')[1]]
        this.setState({ silver })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/category.html?c=grains',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let corn = []
        tr[0].findAll('td').forEach(element => {
          corn.push(element.string.toString())
        });
        this.setState({ corn })

        let red_wheat = []
        tr[2].findAll('td').forEach(element => {
          red_wheat.push(element.string.toString())
        });
        this.setState({ red_wheat })

        let soybean_meal = []
        tr[6].findAll('td').forEach(element => {
          soybean_meal.push(element.string.toString())
        });
        this.setState({ soybean_meal })

        let soybean_oil = []
        tr[8].findAll('td').forEach(element => {
          soybean_oil.push(element.string.toString())
        });
        this.setState({ soybean_oil })

        let soybean = []
        tr[10].findAll('td').forEach(element => {
          soybean.push(element.string.toString())
        });
        this.setState({ soybean })

        let wheat = []
        tr[12].findAll('td').forEach(element => {
          wheat.push(element.string.toString())
        });
        this.setState({ wheat })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/category.html?c=energy',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let brent_crude = []
        tr[2].findAll('td').forEach(element => {
          brent_crude.push(element.string.toString())
        });
        this.setState({ brent_crude })

        let ethanol = []
        tr[8].findAll('td').forEach(element => {
          ethanol.push(element.string.toString())
        });
        this.setState({ ethanol })

        let coal = []
        tr[10].findAll('td').forEach(element => {
          coal.push(element.string.toString())
        });
        this.setState({ coal })

        let propane = []
        tr[12].findAll('td').forEach(element => {
          propane.push(element.string.toString())
        });
        this.setState({ propane })

        let fuel_oil = []
        tr[26].findAll('td').forEach(element => {
          fuel_oil.push(element.string.toString())
        });
        this.setState({ fuel_oil })

        let natural_gas = []
        tr[80].findAll('td').forEach(element => {
          natural_gas.push(element.string.toString())
        });
        this.setState({ natural_gas })

        let gasoline = []
        tr[120].findAll('td').forEach(element => {
          gasoline.push(element.string.toString())
        });
        this.setState({ gasoline })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/exchange.html?e=CME',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let lumber = []
        tr[45].findAll('td').forEach(element => {
          lumber.push(element.string.toString())
        });
        this.setState({ lumber })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/category.html?c=food',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let cocoa = []
        tr[0].findAll('td').forEach(element => {
          cocoa.push(element.string.toString())
        });
        this.setState({ cocoa })

        let coffee = []
        tr[2].findAll('td').forEach(element => {
          coffee.push(element.string.toString())
        });
        this.setState({ coffee })

        let cotton = []
        tr[4].findAll('td').forEach(element => {
          cotton.push(element.string.toString())
        });
        this.setState({ cotton })

        let orange_juce = []
        tr[6].findAll('td').forEach(element => {
          orange_juce.push(element.string.toString())
        });
        this.setState({ orange_juce })

        let sugar = []
        tr[8].findAll('td').forEach(element => {
          sugar.push(element.string.toString())
        });
        this.setState({ sugar })

      })
      .catch(function (error) {
        alert(error);
      });

    await axios({
      method: 'get',
      url: 'https://quotes.ino.com/exchanges/category.html?c=livestock',
    })
      .then(response => {
        const soup = new JSSoup(response.data)
        const tr = soup.findAll('tr', 'odd')

        let feeder_cattle = []
        tr[0].findAll('td').forEach(element => {
          feeder_cattle.push(element.string.toString())
        });
        this.setState({ feeder_cattle })

        let lean_hog = []
        tr[2].findAll('td').forEach(element => {
          lean_hog.push(element.string.toString())
        });
        this.setState({ lean_hog })

        let live_cattle = []
        tr[6].findAll('td').forEach(element => {
          live_cattle.push(element.string.toString())
        });
        this.setState({ live_cattle })
      })
      .catch(function (error) {
        alert(error);
      });
  }


  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  changeCategory = (c) => {
    this.setState({ category: c })
  }

  render() {
    const { loadingFont, category, feeder_cattle, lean_hog, live_cattle,
      brent_crude, ethanol, coal, propane, fuel_oil, natural_gas, gasoline,
      copper, gold, palladium, platinum, silver, corn, red_wheat, soybean_meal,
      soybean_oil, soybean, wheat, cocoa, coffee, cotton, orange_juce, sugar,
      lumber,
    } = this.state

    if (loadingFont) {
      return (<Container style={{ backgroundColor: '#1C2833' }}>
        <Content><Spinner /></Content></Container>)
    }

    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={
          <DrawerContent
            changeCategory={(c) => this.changeCategory(c)}
            closeDrawer={() => this.closeDrawer()}>
          </DrawerContent>
        }
        onClose={() => this.closeDrawer()} >

        <Container style={{ backgroundColor: '#1C2833' }}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body style={{ alignItems: 'center' }}>
              <Title>
                {
                  category === 1 ? 'Energy' :
                    category === 2 ? 'Metals' :
                      category === 3 ? 'Grains' :
                        category === 4 ? 'Softs' :
                          category === 5 ? 'Livestock' :
                            'drawer'
                }
              </Title>
            </Body>
            <Right></Right>
          </Header>

          {category === 1 ?
            <Content>
              {brent_crude ?
                <CommodityListItem
                  iconName='brent_crude'
                  title='Brent Crude'
                  data={brent_crude}
                  unit='USD/Barrel'
                ></CommodityListItem> :
                <Spinner />}

              {gasoline ?
                <CommodityListItem
                  iconName='gasoline'
                  title='Gasoline'
                  data={gasoline}
                  unit='USD/Gallon'
                ></CommodityListItem> :
                <Spinner />}

              {natural_gas ?
                <CommodityListItem
                  iconName='natural_gas'
                  title='Natural Gas'
                  data={natural_gas}
                  unit='USD/MMBtu'
                ></CommodityListItem> :
                <Spinner />}

              {coal ?
                <CommodityListItem
                  iconName='coal'
                  title='Coal'
                  data={coal}
                  unit='USD/Ton'
                ></CommodityListItem> :
                <Spinner />}

              {ethanol ?
                <CommodityListItem
                  iconName='ethanol'
                  title='Ethanol'
                  data={ethanol}
                  unit='USD/Gallon'
                ></CommodityListItem> :
                <Spinner />}

              {propane ?
                <CommodityListItem
                  iconName='propane'
                  title='Propane'
                  data={propane}
                  unit='USD/Gallon'
                ></CommodityListItem> :
                <Spinner />}

              {fuel_oil ?
                <CommodityListItem
                  iconName='fuel_oil'
                  title='Fuel Oil'
                  data={fuel_oil}
                  unit='USD/Barrel'
                ></CommodityListItem> :
                <Spinner />}

            </Content> :
            null}

          {category === 2 ?
            <Content>
              {gold ?
                <CommodityListItem
                  iconName='gold'
                  title='Gold'
                  data={gold}
                  unit='USD/Ounce'
                ></CommodityListItem> :
                <Spinner />}

              {silver ?
                <CommodityListItem
                  iconName='silver'
                  title='Silver'
                  data={silver}
                  unit='USD/Ounce'
                ></CommodityListItem> :
                <Spinner />}

              {platinum ?
                <CommodityListItem
                  iconName='platinum'
                  title='Platinum'
                  data={platinum}
                  unit='USD/Ounce'
                ></CommodityListItem> :
                <Spinner />}

              {palladium ?
                <CommodityListItem
                  iconName='palladium'
                  title='Palladium'
                  data={palladium}
                  unit='USD/Ounce'
                ></CommodityListItem> :
                <Spinner />}

              {copper ?
                <CommodityListItem
                  iconName='copper'
                  title='Copper'
                  data={copper}
                  unit='USD/Ton'
                ></CommodityListItem> :
                <Spinner />}

            </Content> :
            null}

          {category === 3 ?
            <Content>
              {corn ?
                <CommodityListItem
                  iconName='corn'
                  title='Corn'
                  data={corn}
                  unit='Cent/Bushel'
                ></CommodityListItem> :
                <Spinner />}

              {red_wheat ?
                <CommodityListItem
                  iconName='red_wheat'
                  title='Red Wheat'
                  data={red_wheat}
                  unit='Cent/Ton'
                ></CommodityListItem> :
                <Spinner />}

              {soybean_meal ?
                <CommodityListItem
                  iconName='soybean_meal'
                  title='Soybean Meal'
                  data={soybean_meal}
                  unit='USD/Ton'
                ></CommodityListItem> :
                <Spinner />}

              {soybean_oil ?
                <CommodityListItem
                  iconName='soybean_oil'
                  title='Soybean Oil'
                  data={soybean_oil}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {soybean ?
                <CommodityListItem
                  iconName='soybean'
                  title='Soybean'
                  data={soybean}
                  unit='Cent/Bushel'
                ></CommodityListItem> :
                <Spinner />}

              {wheat ?
                <CommodityListItem
                  iconName='wheat'
                  title='Wheat'
                  data={wheat}
                  unit='Cent/Ton'
                ></CommodityListItem> :
                <Spinner />}

            </Content> :
            null}

          {category === 4 ?
            <Content>
              {cocoa ?
                <CommodityListItem
                  iconName='cocoa'
                  title='Cocoa'
                  data={cocoa}
                  unit='USD/Ton'
                ></CommodityListItem> :
                <Spinner />}

              {coffee ?
                <CommodityListItem
                  iconName='coffee'
                  title='Coffee'
                  data={coffee}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {cotton ?
                <CommodityListItem
                  iconName='cotton'
                  title='Cotton'
                  data={cotton}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {orange_juce ?
                <CommodityListItem
                  iconName='orange_juice'
                  title='Orange Juice'
                  data={orange_juce}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {sugar ?
                <CommodityListItem
                  iconName='sugar'
                  title='Sugar'
                  data={sugar}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {lumber ?
                <CommodityListItem
                  iconName='lumber'
                  title='Lumber'
                  data={lumber}
                  unit={'USD/1000' + '\n' + 'board feet'}
                ></CommodityListItem> :
                <Spinner />}

            </Content> :
            null}

          {category === 5 ?
            <Content>
              {feeder_cattle ?
                <CommodityListItem
                  iconName='feeder_cattle'
                  title='Feeder Cattle'
                  data={feeder_cattle}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {lean_hog ?
                <CommodityListItem
                  iconName='hog'
                  title='Lean Hog'
                  data={lean_hog}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}

              {live_cattle ?
                <CommodityListItem
                  iconName='live_cattle'
                  title='Live Cattle'
                  data={live_cattle}
                  unit='Cent/Pound'
                ></CommodityListItem> :
                <Spinner />}
            </Content> :
            null}

        </Container>
      </Drawer>

    );
  }
}

