import React, { Component } from 'react';
import './App.css';
import FxList from './FxList';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          fxList: [],
          currentRate: ''
        };
    }
    componentDidMount () {
        this.getData();
    }

    getData() {
        const self = this;
        let promises = [];
        for(var i = 0; i <= 30; i++) {
            const currDate = new Date();
            currDate.setDate(currDate.getDate() - i);
            const dateStr = self.getDateStr(currDate);
            promises.push(fetch("https://api.openrates.io/"+dateStr+"?symbols=GBP,EUR,AUD,CAD&amp;base=USD"));
        }

        Promise.all(promises).then(allResponses => {
            let jsonPromises = [];
            for (var i = 0; i <= 30; i++) {
                jsonPromises.push(allResponses[i].json());
                //allResponses[i].json().then(res => {
                    // console.log('res ', res);
                    // this.state.fxDetails.push(respObj);
                //});
            }
            Promise.all(jsonPromises).then(jsonResponses => {
                const respArr = [];
                self.setState({currentRate: jsonResponses[0].rates.CAD});
                for (var i =0; i <= 30; i++) {
                    const respObj = {'id': i, 'date': jsonResponses[i].date, 'base': jsonResponses[i].base, 'AUD': jsonResponses[i].rates.AUD, 'CAD': jsonResponses[i].rates.CAD, 'EUR': jsonResponses[i].rates.EUR, 'GBP': jsonResponses[i].rates.GBP};
                    respArr.push(respObj);
                }
                self.setState({fxList: respArr});
            })
        });
    }

    getDateStr (date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + '-' + month + '-' + day;
    }

    render() {
        if(this.state.fxList.length > 0) {
            return (
              <div className="fx-root">
                <h1>Last 30 days Exchange Rates</h1>
                <div>
                    <button onClick={() => this.getData()}>Refresh</button>
                </div>
                <div>
                    Current exchange rate from USD to CAD is {this.state.currentRate}
                </div>
                
                <FxList properties={this.state.fxList} />	
              </div>
            );
        } else {
            return (<div>Loading</div>);
        }
    }
}
export default App;