import React, { Component } from 'react';

class Home extends Component {
    render(){
        return (
            <div className="container spacer-heh">
                <div className="jumbotron">
                    <h1 className="display-3">Welcome</h1>
                    <hr className="my-2"/>
                    <p>
                        CRUD Data Bank Account
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;