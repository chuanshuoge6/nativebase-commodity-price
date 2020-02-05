import React, { Component } from 'react';
import JSSoup from 'jssoup'
import axios from 'axios'
import * as Font from 'expo-font'
import { Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import DrawerContent from './Drawer'
import CommodityListItem from './CommodityListItem'
import ForexListItem from './ForexListItem'
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
      category: 6,
      feeder_cattle: null,
      lean_hog: null,
      live_cattle: null,
      brent_crude: null,
      crude_oil: null,
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
      usd: 1000,
      exchanges: [],
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loadingFont: false })

    this.fetch_data()

    setInterval(() => {
      this.fetch_data()
    }, 10000);
  }


  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  changeCategory = (c) => {
    this.setState({ category: c })
    this.fetch_data()
  }

  //find the first row of table with the first column containing the symbol
  //return all columns in the row
  jssoup_extract = (trs, symbol) => {
    let tr
    for (let i = 0; i < trs.length; i++) {
      try {
        if (trs[i].find('td').string.toString().includes(symbol)) {
          tr = trs[i]
          break
        }
      }
      catch (err) {
        continue
      }
    }

    let data = []
    tr.findAll('td').forEach(element => {
      data.push(element.string.toString())
    });

    return data
  }

  //extract data from rows with first cell having 6 chars and containing 'USD'
  jssoup_extract_currency = (trs) => {
    this.setState({ exchanges: [] })
    let array_3d = []

    for (let i = 0; i < trs.length; i++) {
      try {
        const symbol = trs[i].find('td').string.toString()
        if (symbol.includes('USD') && symbol.length === 6) {

          let data = []
          trs[i].findAll('td').forEach(element => {
            data.push(element.string.toString())
          });

          array_3d.push(data)
        }
      }
      catch (err) {
        continue
      }

      this.setState({ exchanges: array_3d })
    }
  }

  fetch_data = async () => {
    switch (this.state.category) {
      case 6:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/exchange.html?e=FOREX',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr')

            this.jssoup_extract_currency(tr)

            let gold = this.jssoup_extract(tr, 'XAUUSDO')
            gold[1] = 'Spot'
            this.setState({ gold })

            let palladium = this.jssoup_extract(tr, 'XPDUSDO')
            palladium[1] = 'Spot'
            this.setState({ palladium })

            let platinum = this.jssoup_extract(tr, 'XPTUSDO')
            platinum[1] = 'Spot'
            this.setState({ platinum })

            let silver = this.jssoup_extract(tr, 'XAGUSDO')
            silver[1] = 'Spot'
            this.setState({ silver })
          })
          .catch(function (error) {
            alert(error);
          });
        break;

      case 1:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/category.html?c=energy',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr', 'odd')

            this.setState({
              brent_crude: this.jssoup_extract(tr, 'QBZ'),
              crude_oil: this.jssoup_extract(tr, 'CL.'),
              ethanol: this.jssoup_extract(tr, 'QCU'),
              coal: this.jssoup_extract(tr, 'QMTF'),
              propane: this.jssoup_extract(tr, 'Q8K'),
              fuel_oil: this.jssoup_extract(tr, 'MFB'),
              natural_gas: this.jssoup_extract(tr, 'QNN'),
              gasoline: this.jssoup_extract(tr, 'QRB.')
            })

          })
          .catch(function (error) {
            alert(error);
          });
        break

      case 2:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/category.html?c=metals',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr', 'odd')

            this.setState({ copper: this.jssoup_extract(tr, 'HG') })

          })
          .catch(function (error) {
            alert(error);
          });

        break

      case 3:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/category.html?c=grains',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr', 'odd')

            this.setState({
              corn: this.jssoup_extract(tr, 'ZC'),
              red_wheat: this.jssoup_extract(tr, 'MW'),
              soybean_meal: this.jssoup_extract(tr, 'ZM'),
              soybean_oil: this.jssoup_extract(tr, 'ZL'),
              soybean: this.jssoup_extract(tr, 'ZS'),
              wheat: this.jssoup_extract(tr, 'ZW')
            })

          })
          .catch(function (error) {
            alert(error);
          });
        break
      case 4:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/exchange.html?e=CME',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr', 'odd')

            this.setState({ lumber: this.jssoup_extract(tr, 'LBS') })

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

            this.setState({
              cocoa: this.jssoup_extract(tr, 'CC'),
              coffee: this.jssoup_extract(tr, 'KC'),
              cotton: this.jssoup_extract(tr, 'CT'),
              orange_juce: this.jssoup_extract(tr, 'OJ'),
              sugar: this.jssoup_extract(tr, 'SB')
            })

          })
          .catch(function (error) {
            alert(error);
          });
        break

      case 5:
        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/category.html?c=livestock',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr', 'odd')

            this.setState({
              feeder_cattle: this.jssoup_extract(tr, 'GF'),
              lean_hog: this.jssoup_extract(tr, 'HE.'),
              live_cattle: this.jssoup_extract(tr, 'LE')
            })

          })
          .catch(function (error) {
            alert(error);
          });
        break

      default:
        break;
    }
  }

  render() {
    const { loadingFont, category, feeder_cattle, lean_hog, live_cattle,
      brent_crude, ethanol, coal, propane, fuel_oil, natural_gas, gasoline,
      copper, gold, palladium, platinum, silver, corn, red_wheat, soybean_meal,
      soybean_oil, soybean, wheat, cocoa, coffee, cotton, orange_juce, sugar,
      lumber, crude_oil, exchanges,
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
          <Header style={{ marginTop: 25 }}>
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
                            category === 6 ? 'Forex' :
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

              {crude_oil ?
                <CommodityListItem
                  iconName='wti_crude'
                  title='Crude Oil'
                  data={crude_oil}
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
                  unit='USD/Pound'
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

          {category === 6 ?
            exchanges.length > 0 ?
              <Content>
                {exchanges.map((item) => {
                  return <ForexListItem data={item} key={item[0]}></ForexListItem>
                })} 

              </Content>
              : <Spinner />
            : null
          }

        </Container>
      </Drawer>

    );
  }
}