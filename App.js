import React, { Component } from 'react';
import JSSoup from 'jssoup'
import axios from 'axios'
import * as Font from 'expo-font'
import { Modal, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Col, Row, Grid } from "react-native-easy-grid";
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
      usd_amount: 1000,
      usd: ['USDUSD', 'American Dollar', '', '', '', '1'],
      cny: null,
      cad: null,
      eur: null,
      jpy: null,
      btc: null,
      aud: null,
      gbp: null,
      nzd: null,
      chf: null,
      hkd: null,
      inr: null,
      idr: null,
      myr: null,
      php: null,
      sgd: null,
      krw: null,
      thb: null,
      czk: null,
      dkk: null,
      huf: null,
      nok: null,
      pln: null,
      rub: null,
      sek: null,
      brl: null,
      egp: null,
      ils: null,
      mxn: null,
      zar: null,
      show_modal: false,
      input_amount: '1000',
      input_currency: '',
      input_rate: 1,
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

  changeCategory = async (c) => {
    await this.setState({ category: c })
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

    const data = []
    tr.findAll('td').forEach(element => {
      data.push(element.string.toString())
    });

    return data
  }

  fetch_data = async () => {
    switch (this.state.category) {
      case 6:
        await axios({
          method: 'get',
          url: 'https://api.exchangeratesapi.io/latest?symbols=USD,CNY',
        })
          .then(response => {
            const data = response.data.rates
            const rate = data.CNY / data.USD

            this.setState({
              cny: ['USDCNY', 'CHINESE YUan', '', '', '', rate]
            })

          })
          .catch(function (error) {
            alert(error);
          });

        await axios({
          method: 'get',
          url: 'https://quotes.ino.com/exchanges/exchange.html?e=FOREX',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr')

            this.setState({
              aud: this.jssoup_extract(tr, 'AUDUSD'),
              gbp: this.jssoup_extract(tr, 'GBPUSD'),
              cad: this.jssoup_extract(tr, 'USDCAD'),
              eur: this.jssoup_extract(tr, 'EURUSD'),
              jpy: this.jssoup_extract(tr, 'USDJPY'),
              nzd: this.jssoup_extract(tr, 'NZDUSD'),
              chf: this.jssoup_extract(tr, 'USDCHF'),
              hkd: this.jssoup_extract(tr, 'USDHKD'),
              inr: this.jssoup_extract(tr, 'USDINR'),
              idr: this.jssoup_extract(tr, 'USDIDR'),
              myr: this.jssoup_extract(tr, 'USDMYR'),
              php: this.jssoup_extract(tr, 'USDPHP'),
              sgd: this.jssoup_extract(tr, 'USDSGD'),
              krw: this.jssoup_extract(tr, 'USDKRW'),
              thb: this.jssoup_extract(tr, 'USDTHB'),
              czk: this.jssoup_extract(tr, 'USDCZK'),
              dkk: this.jssoup_extract(tr, 'USDDKK'),
              huf: this.jssoup_extract(tr, 'USDHUF'),
              nok: this.jssoup_extract(tr, 'USDNOK'),
              pln: this.jssoup_extract(tr, 'USDPLN'),
              rub: this.jssoup_extract(tr, 'USDRUB'),
              sek: this.jssoup_extract(tr, 'USDSEK'),
              brl: this.jssoup_extract(tr, 'USDBRL'),
              egp: this.jssoup_extract(tr, 'USDEGP'),
              ils: this.jssoup_extract(tr, 'USDILS'),
              mxn: this.jssoup_extract(tr, 'USDMXN'),
              zar: this.jssoup_extract(tr, 'USDZAR'),
              tnd: this.jssoup_extract(tr, 'USDTND'),
            })

          })
          .catch(function (error) {
            alert(error);
          });

        await axios({
          method: 'get',
          url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        })
          .then(response => {
            const rate = parseFloat(response.data.bpi.USD.rate.replace(',', ''))

            this.setState({
              btc: ['BTCUSD', 'BIT COIN', '', '', '', rate]
            })

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
          url: 'https://quotes.ino.com/exchanges/exchange.html?e=FOREX',
        })
          .then(response => {
            const soup = new JSSoup(response.data)
            const tr = soup.findAll('tr')

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

  forex_button_press = (value, currency, rate) => {
    this.setState({
      show_modal: true,
      input_amount: value,
      input_currency: currency,
      input_rate: rate,
    })
  }

  exchange_button_press = () => {
    this.setState({
      show_modal: false,
      usd_amount: parseFloat(this.state.input_amount) / this.state.input_rate,
    })
  }

  render() {
    const { loadingFont, category, feeder_cattle, lean_hog, live_cattle,
      brent_crude, ethanol, coal, propane, fuel_oil, natural_gas, gasoline,
      copper, gold, palladium, platinum, silver, corn, red_wheat, soybean_meal,
      soybean_oil, soybean, wheat, cocoa, coffee, cotton, orange_juce, sugar,
      lumber, crude_oil, usd, aud, gbp, cad, eur, jpy, nzd, chf,
      hkd, inr, idr, myr, php, sgd, krw, thb, czk, dkk, huf, nok, pln, rub,
      sek, brl, egp, ils, mxn, zar, tnd, usd_amount, cny, btc, show_modal,
      input_amount, input_currency,
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


        <Modal
          animationType="slide"
          transparent={true}
          visible={show_modal}
        >
          <Content>

            <Item style={{ backgroundColor: 'white' }}>
              <Input
                style={{ height: 100, fontSize: 30 }}
                keyboardType="number-pad"
                value={input_amount}
                onChangeText={e => this.setState({ input_amount: e ? e.match(/^([0-9]+(\.[0-9]+)?)/g)[0] : '1' })}
                onSubmitEditing={() => this.exchange_button_press()} />
              <Text style={{ fontSize: 30 }}>{input_currency}</Text>
              <Button large transparent onPress={() => this.exchange_button_press()}>
                <Icon active name='swap' style={{ fontSize: 50 }} />
              </Button>
              <Button large transparent onPress={() => this.setState({ show_modal: false })}>
                <Icon active name='close' style={{ fontSize: 50 }} />
              </Button>
            </Item>
          </Content>
        </Modal>


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

            <Content>
              <Grid>
                <Col style={{ alignItems: 'center' }}>
                  <Row style={{ height: 60 }}>
                    {usd ?
                      <ForexListItem data={usd} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {cad ?
                      <ForexListItem data={cad} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {gbp ?
                      <ForexListItem data={gbp} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {inr ?
                      <ForexListItem data={inr} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {php ?
                      <ForexListItem data={php} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {thb ?
                      <ForexListItem data={thb} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {huf ?
                      <ForexListItem data={huf} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {rub ?
                      <ForexListItem data={rub} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {egp ?
                      <ForexListItem data={egp} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {zar ?
                      <ForexListItem data={zar} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Row style={{ height: 60 }} >
                    {cny ?
                      <ForexListItem data={cny} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {btc ?
                      <ForexListItem data={btc} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {aud ?
                      <ForexListItem data={aud} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {nzd ?
                      <ForexListItem data={nzd} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {chf ?
                      <ForexListItem data={chf} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {idr ?
                      <ForexListItem data={idr} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {sgd ?
                      <ForexListItem data={sgd} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {czk ?
                      <ForexListItem data={czk} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {nok ?
                      <ForexListItem data={nok} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {sek ?
                      <ForexListItem data={sek} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                </Col>
                <Col style={{ alignItems: 'center' }}>
                  <Row style={{ height: 60 }} >
                    {eur ?
                      <ForexListItem data={eur} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {jpy ?
                      <ForexListItem data={jpy} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {hkd ?
                      <ForexListItem data={hkd} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {myr ?
                      <ForexListItem data={myr} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {krw ?
                      <ForexListItem data={krw} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {dkk ?
                      <ForexListItem data={dkk} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {pln ?
                      <ForexListItem data={pln} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {brl ?
                      <ForexListItem data={brl} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {mxn ?
                      <ForexListItem data={mxn} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}
                      ></ForexListItem> : <Spinner />
                    }
                  </Row>
                  <Row style={{ height: 60 }} >
                    {ils ?
                      <ForexListItem data={ils} usd={usd_amount}
                        buttonPress={(value, currency, rate) => this.forex_button_press(value, currency, rate)}>
                      </ForexListItem> : <Spinner />
                    }
                  </Row>
                </Col>
              </Grid>
            </Content>

            : null
          }


        </Container>
      </Drawer>

    );
  }
}