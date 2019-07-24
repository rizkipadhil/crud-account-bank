import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';

// Component
import Pagenotfound from './components/pagenotfound';
import Home from './components/home';
import CreateAccount from './components/createAccount';
import TableCompany from './components/companyTable';
import TableIndividual from './components/individualTable';
import EditAccount from './components/editAccount';

const accountList = [
  { 
    id: 1, 
    accountHolderName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    accountNumber: 123456, 
    swiftCode: 1234, 
    address: 'Bengkuring', 
    city: 'Balikpapan', 
    country: 'Indonesia', 
    currency: 'IDR', 
    type: 'individual'
  },
  {
    id: 2,
    accountHolderName: 'Johnny Dong',
    companyName: 'Johnny Inc.',
    accountNumber: 133446,
    swiftCode: 1334,
    address: 'Bengkuring di Malaysia',
    city: 'Kuching',
    country: 'Malaysia',
    currency: 'MYR',
    type: 'company'
  }
];

if (localStorage.getItem("accounts") === null)
  localStorage.setItem('accounts', JSON.stringify(accountList));

class App extends Component {

  componentWillMount() {
    console.log('rendering');
  }

  render(){
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">Home</Link>
              <Link className="nav-item nav-link" to="/createAccount">Create Account</Link>
              <Link className="nav-item nav-link" to="/tableCompany">List Company</Link>
              <Link className="nav-item nav-link" to="/tableIndividual">List Individual</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createAccount/" component={CreateAccount} />
          <Route path="/tableCompany/" component={TableCompany}/> />
          {/* <Route path="/tableCompany/" component={TableCompany} render={() => <TableCompany companyList={this.state.companyList} />} /> */}
          <Route path="/tableIndividual/" component={TableIndividual} />
          <Route path="/editAccount/:id" component={EditAccount} />
          <Route component={Pagenotfound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
