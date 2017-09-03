import * as React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {bithumbApiTicker} from 'bit-stream/dist/modules/api/bithumb'
import {BTC, Ticker} from 'bit-stream'
import {RootState} from '../@types/store'
import {BootstrapTable as Table, TableHeaderColumn as Th} from 'react-bootstrap-table'
import {comma, date, w1000, w10000} from '../utils/formatter'

export const Home = connect<S, D, O>(
  (state: RootState) => ({
    tickers: state.bit.bithumb.tickers
  }),
  dispatch => bindActionCreators({
    bithumbApiTicker
  }, dispatch)
)(
  class Home extends React.Component<Props, State> {
    private timer
    render() {
      if (!this.props.tickers) {
        return <div>loading...</div>
      }
      return (
        <div className="row Home">
          <Table data={this.props.tickers.slice(0, 10)}>
            <Th dataField="date" dataAlign="center" width="140" dataFormat={date} isKey>날짜</Th>
            <Th dataField="closingPrice" dataAlign="center" width="140" dataFormat={w1000}>현재 가격</Th>
            <Th dataField="buyPrice" dataAlign="center" width="140" dataFormat={w1000}>사겠다!</Th>
            <Th dataField="sellPrice" dataAlign="center" width="140" dataFormat={w1000}>팔겠다!</Th>
            <Th dataField="openingPrice" dataAlign="center" width="140" dataFormat={w1000}>24시간 전 가격</Th>
            <Th dataField="averagePrice" dataAlign="center" width="140" dataFormat={w1000}>평균 가격</Th>
            <Th dataField="minPrice" dataAlign="center" width="140" dataFormat={w1000}>최소 가격</Th>
            <Th dataField="maxPrice" dataAlign="center" width="140" dataFormat={w1000}>최대 가격</Th>
            {/*<Th dataField="unitsTraded" dataAlign="center" width="140" dataFormat={comma}>거래 량</Th>*/}
            <Th dataField="volume1Day" dataAlign="center" width="140" dataFormat={comma}>24시간 거래량</Th>
            <Th dataField="volume7Day" dataAlign="center" width="140" dataFormat={comma}>7일 거래량</Th>
          </Table>
        </div>
      )
    }

    componentDidMount() {
      if (!this.timer) {
        console.info('timer set')
        this.timer = setInterval(_ => this.props.bithumbApiTicker(BTC), 2000)
      }
    }
  }
)

interface S {
  tickers: Ticker[]
}
interface D {
  bithumbApiTicker: typeof bithumbApiTicker
}
interface O {
}

type Props = S & D & O
interface State {
}
