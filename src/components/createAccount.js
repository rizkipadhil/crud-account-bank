import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import _ from 'lodash';
import autoBind from 'react-autobind';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

class OptionSelect extends Component {
    render() {
        const datas = this.props.data;
        const listOptions = datas.map((data, index) =>
            <option key={index} value={data.name}>{data.name}</option>
        );
        return listOptions;
    }
}

class CreateAccount extends Component {
    constructor(){
        super();
        this.state = {
            accountHolderName: '',
            firstName: '',
            lastName: '',
            companyName: '',
            accountNumber: '',
            swiftCode: '',
            address: '',
            city: '',
            country: 'Afghanistan',
            type: 'individual',
            stopAction: false,
            loading: false,
            getCountry: [],
            selectedCountry: [],
            currency: [],
            accountList: []
        }
        autoBind(this);
    }
    async componentWillMount(){
        const getDataCountry  = await this.getCountry();
        this.getAllData();
        this.onChangeState(getDataCountry, 'getCountry');
    }
    getAllData() {
        let accountList = JSON.parse(localStorage.getItem("accounts"));
        this.onChangeState(accountList, 'accountList');
    }
    async checkCountryCurrencyCode(country) {
        try {
            const data = await axios.get('http://restcountries.eu/rest/v2/name/' + country);
            return data.data[0].currencies[0].code;
        } catch (error) {
            console.log(error)
        }
    }
    async getCountry() {
        try {
            const data = await axios.get('http://restcountries.eu/rest/v2/all');
            return data.data;
        } catch (error) {
            console.log(error)
        }
    }
    notifHeh(message, status){
        Toast.fire({
            type: status,
            title: message
        })
    }
    cloneState() {
        return _.clone(this.state);
    }
    onChangeState(val, field) {
        let state = this.cloneState();
        state[field] = val;
        this.setState(state);
    }
    checkForm(event, field){
        this.onChangeState(event.target.value, field);
    }
    createAction(){
        const getItem = this.state.accountList;
        const lastId = getItem.length > 0 ? getItem[getItem.length - 1].id : 0;
        const insertdata = {
            id: lastId + 1,
            accountHolderName: this.state.accountHolderName,
            accountNumber: this.state.accountNumber,
            swiftCode: this.state.swiftCode,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            type: this.state.type
        };
        if (this.state.type === 'company') {
            insertdata['companyName'] = this.state.companyName;
        }else{
            insertdata['firstName'] = this.state.firstName;
            insertdata['lastName'] = this.state.lastName;
        }
        const insertingData = getItem.concat(insertdata);
        localStorage.setItem('accounts', JSON.stringify(insertingData));
    }
    appendObjTo(arrayA, newObject) {
        const frozenObj = Object.freeze(newObject);
        return Object.freeze(arrayA.concat(frozenObj));
    }
    submitFormHeh(event){
        const self = this;
        this.checkingState('accountHolderName', 'Account Holder Name Required');
        this.checkingState('accountNumber', 'Account Number Required');
        this.checkingState('swiftCode', 'Swift Code Required');
        this.checkingState('address', 'Address Required');
        this.checkingState('city', 'City Required');
        this.checkingState('country', 'Country Required');
        this.checkingState('type', 'Type Required');
        if (self.state.type === 'company'){
            this.checkingState('companyName', 'Company Name Required');
        }else{
            this.checkingState('firstName', 'First Name Required');
            this.checkingState('lastName', 'Last Name Required');
        }
        setTimeout(function () {
            if (!self.state.stopAction) {
                self.createAction();
                if (self.state.type === 'company') {
                    self.props.history.push("/tableCompany");
                } else {
                    self.props.history.push("/tableIndividual");
                }
            }
        }, 100);
    }
    checkingState(state, message) {
        if (this.state[state] === '') {
            this.notifHeh(message, 'error');
            this.onChangeState(true, 'stopAction');
        }
    }
    render() {
        return (
            <div className="container spacer-heh">
                <div className="card text-left">
                    <div className="card-body">
                        <h4 className="card-title">Create Account</h4>
                        <hr/>
                        <div className="card-text">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label>Account Holder Name</label>
                                    <input type="text" defaultValue={this.state.accountHolderName} onChange={(e) => {
                                        this.checkForm(e, 'accountHolderName')
                                    }} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Account Number</label>
                                    <input type="text" defaultValue={this.state.accountNumber} onChange={(e) => {
                                        this.checkForm(e, 'accountNumber')
                                    }} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Swift Code</label>
                                    <input type="text" defaultValue={this.state.swiftCode} onChange={(e) => {
                                        this.checkForm(e, 'swiftCode')
                                    }} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Type Account</label>
                                    <select className="form-control" defaultValue={this.state.type} onChange={(e) => {
                                        this.checkForm(e, 'type')
                                    }}>
                                        <option value="individual">Individual</option>
                                        <option value="company">Company</option>
                                    </select>
                                </div>
                                {this.state.type === 'individual' ?
                                    <div>
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" defaultValue={this.state.firstName} onChange={(e) => {
                                                this.checkForm(e, 'firstName')
                                            }} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" defaultValue={this.state.lastName} onChange={(e) => {
                                                this.checkForm(e, 'lastName')
                                            }} className="form-control" />
                                        </div>
                                    </div>
                                : 
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input type="text" defaultValue={this.state.companyName} onChange={(e) => {
                                        this.checkForm(e, 'companyName')
                                    }} className="form-control" />
                                </div> }
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" defaultValue={this.state.city} onChange={(e) => {
                                        this.checkForm(e, 'city')
                                    }} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <select className="form-control" defaultValue={this.state.country} onChange={(e) => {
                                        this.checkForm(e, 'country')
                                    }}>
                                        <OptionSelect data={this.state.getCountry}></OptionSelect>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea defaultValue={this.state.address} onChange={(e) => {
                                        this.checkForm(e, 'address')
                                    }} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <button onClick={this.submitFormHeh} className="btn btn-large btn-block btn-danger">Submit</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateAccount;