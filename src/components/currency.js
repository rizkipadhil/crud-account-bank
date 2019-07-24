import React, { Component } from 'react';
import axios from 'axios';

class Currency extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryCurrency: [],
            country: ''
        }
    }
    async componentWillMount(){
        const self = this;
        let countryCurrency = await self.checkCountryCurrency(self.props.country);
        let country = self.props.country;
        this.setState((prevState, props) => (
            {
                countryCurrency: countryCurrency,
                country: country
            }
        ));
    }

    async checkCountryCurrency(country){
        try {
            const data = await axios.get('http://restcountries.eu/rest/v2/name/' + country);
            return data.data[0].currencies[0];
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { code, symbol } = this.state.countryCurrency;
        return (
            <div>
                <i>
                    Code {code} & Symbol { symbol }
                </i>
            </div>
        )
    }
}

export default Currency;