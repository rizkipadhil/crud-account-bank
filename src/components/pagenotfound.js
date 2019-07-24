import React, { Component } from 'react';

class Pagenotfound extends Component {
    render(){
        return (
            <div className="container spacer-heh">
                <h3>
                    No match for <code>{window.location.pathname}</code>
                    <hr/>
                </h3>
            </div>
        );
    }
}

export default Pagenotfound;