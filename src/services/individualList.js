import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import _ from 'lodash';
import autoBind from 'react-autobind';
import CurrencyView from '../components/currency';

class individualList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accoutList: []
        }
        autoBind(this);
    }
    componentWillMount() {
        this.setData();
    }
    getFullData() {
        const data = JSON.parse(localStorage.getItem('accounts'));
        return data;
    }
    setData() {
        const data = this.getFullData();
        let accoutList = data.filter(x => x.type === 'individual');
        this.onChangeState(accoutList, 'accoutList');
    }
    cloneState() {
        return _.clone(this.state);
    }
    onChangeState(val, field) {
        let state = this.cloneState();
        state[field] = val;
        this.setState(state);
    }
    removeItem(id) {
        const data = this.getFullData();
        let filteredaccountList = data.filter(x => x.id !== id);
        localStorage.setItem('accounts', JSON.stringify(filteredaccountList));
        this.setData();
    }
    async deleteData(id) {
        const self = this;
        setTimeout(async () => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            if (result.value) {
                self.removeItem(id);
            }
        }, 100);
    }
    editPage(id) {
        this.props.history.push("editAccount/" + id);
    }
    render() {
        return (
            <tbody>
                {this.state.accoutList.map((item, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.accountHolderName}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.swiftCode}</td>
                        <td>{item.address}</td>
                        <td>{item.city}</td>
                        <td>{item.country}</td>
                        <td>
                            <CurrencyView country={item.country}></CurrencyView>
                        </td>
                        <td>{item.type}</td>
                        <td>
                            <button className="btn btn-warning withWidth" onClick={() => this.editPage(item.id)}>Edit</button>
                            <button className="btn btn-danger withWidth" onClick={() => this.deleteData(item.id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        );
    }
}

export default withRouter(individualList);