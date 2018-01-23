import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      title: ' Visited country app',
      countries: []
    }
  }
  

  // make ajax calls here

  componentDidMount() {
    console.log('Component has mounted')
    var that = this;
    fetch('http://localhost:3001/api/countries', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
      .then(function(response){
        console.log('HEY', response)
        response.json()
          .then(function(data) {
          let countries = that.state.countries;
          countries.concat(data); 
          that.setState({
            countries: data
        })
      })
  })
}

removeCountry(id) {
  var that = this;
  let countries = this.state.countries;
  let country = countries.find(function(country){
    return country.id === id
  });

  var request = new Request('http://localhost:3001/api/remove/' + id, {
    method: 'DELETE'
  });

  fetch(request)
  .then(function(response) {
    countries.splice(countries.indexOf(country), 1);
    that.setState({
      countries: countries
    })
    response.json()
    .then(function(data) {
      console.log(this)
    })
  })
}

  addCountry(event) {
    var that = this
    event.preventDefault(); // prevent form from submitting
    let country_data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value,
      id: Math.random().toFixed(3)
    };
    var request = new Request('http://localhost:3001/api/new-country', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(country_data)
    });

    let countries = that.state.countries;
    countries.push(country_data);
    that.setState({
      countries: countries
    })
    fetch(request)
      .then(function(response) {
        response.json()
          .then(function(data) {
           
        })
    })
    .catch(function(err) {
      console.log(err)
    })
    this.refs.country_name.value = ""
    this.refs.continent_name.value = ""
  }

  render() {
    let title = this.state.title;
    let countries = this.state.countries;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="countryForm">
          <input type="text" ref="country_name" placeholder="country name"/>
          <input type="text" ref="continent_name" placeholder="continent name"/>
          <button onClick={this.addCountry.bind(this)}>Add country</button>
        </form>
        <ul>
          {countries.map(country => <li key={country.id}>{country.country_name} {country.continent_name} <button onClick={this.removeCountry.bind(this, country.id)}>Remove</button> </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
