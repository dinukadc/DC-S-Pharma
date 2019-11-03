import React, {Component} from 'react';

class Breadcrumb extends Component {
    render() {
        return(
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">{this.props.path}</li>
            </ol>
        );
    }
}

export default Breadcrumb;