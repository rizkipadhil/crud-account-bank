import React, { Component } from 'react';
import _ from 'lodash';

import TableAccount from '../services/companyList';

class companyTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyList: []
        }
    }
    cloneState() {
        return _.clone(this.state);
    }
    onChangeState(val, field) {
        let state = this.cloneState();
        state[field] = val;
        this.setState(state);
    }
    render(){
        return (
            <div className="container spacer-heh">
                <div className="card text-left">
                    <div className="card-body">
                        <h4 className="card-title">List Account Company</h4>
                        <hr/>
                        <div className="card-text table-responsive">
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Company Name</th>
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

export default companyTable;