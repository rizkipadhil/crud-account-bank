import React, { Component } from 'react';
import _ from 'lodash';
import Swal from 'sweetalert2';

import TableAccount from '../services/individualList';

class individualTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            individualList: []
        }
    }
    componentWillMount(){
        const self = this;
        this.onChangeState(self.setData(), 'individualList');
    }
    setData(){
        const data = JSON.parse(localStorage.getItem('accounts'));
        let individualList = data.filter(x => x.type === 'individual');
        return individualList;
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
        let filteredaccountList = this.state.accoutList.filter(x => x.id !== id);
        localStorage.setItem('accounts', JSON.stringify(filteredaccountList));
        this.onChangeState(filteredaccountList, 'accoutList');
    }
    async deleteData(id) {
        const self = this;
        this.getAllData();
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
    render(){
        return (
            <div className="container spacer-heh">
                <div className="card text-left">
                    <div className="card-body">
                        <h4 className="card-title">List Account Individual</h4>
                        <hr />
                        <div className="card-text table-responsive">
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Account Holder Name</th>
                                        <th>Account Number</th>
                                        <th>Swift Code</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Currency</th>
                                        <th>Type</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <TableAccount history={this.props.history} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default individualTable;