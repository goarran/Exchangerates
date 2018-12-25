import React, { Component } from 'react';
import './App.css';


export default class FxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsList: []
        }
    }

    render() {
        return (
            <div className="list-container">
                <div className="container">
                    <div className="row title">
                        <div className="col-2 grid-items">Date</div>
                        <div className="col-2 grid-items">Base</div>
                        <div className="col-2 grid-items">AUD</div>
                        <div className="col-2 grid-items">CAD</div>
                        <div className="col-2 grid-items">EUR</div>
                        <div className="col-2 grid-items">GBP</div>
                    </div>
                    {this.props.properties.map(property => (
                        <div className="row" key={property.id}>
                            <div className="col-2 grid-items">{property.date}</div>
                            <div className="col-2 grid-items">{property.base}</div>
                            <div className="col-2 grid-items">{property.AUD}</div>
                            <div className="col-2 grid-items">{property.CAD}</div>
                            <div className="col-2 grid-items">{property.EUR}</div>
                            <div className="col-2 grid-items">{property.GBP}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}