import React from 'react';
import { Alert, Button, View, StyleSheet } from 'react-native';
//If the module was not found execute:  npm install react-native-web
//import Read from './Read.jsx';
//import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'coconut',
    id: null,
    name: null,
    logindate:null,
    timestamp: null,
    isLoaded: false,
    error: false,
    accountList: null,
    data: [],
    account: "nix"
    };
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNickName = this.handleChangeNickName.bind(this);
    this.handleSubmitId = this.handleSubmitId.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.handleGET = this.handleGET.bind(this);
}

simpleAlertFunction = () => {
  //function to make simple alert
  Alert.alert('Alert Title','This is Simple Alert');
}

componentDidMount() {
    this.handleAccounts()
}

handleAccounts() {
const params = {
    method: 'GET',
    headers: {
        'accept': 'application/json'
        }
    };
	fetch("http://192.168.2.121:8080/api/accounts/",params)
	        .then(response => response.json())
	        //.then(response => response.blob())  //mutual exclusive with json
            .then(
                                    				(data) => {
                                    					this.setState({
                                    						isLoaded: true,
                                    						accountList: data
                                    					})

                                    			})
            .catch(e => console.error(e));

}

handleGET() {
    const id = this.state.id
    alert('The ID is: '+id);
	console.log("handleGET: "+ "http://localhost:8080/api/account/" + id)
	fetch("http://192.168.2.121:8080/api/account/" + id)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
					isLoaded: true,
						account: (result)
					})
				},
				(error) => {
					this.setState({
					    isLoaded: true,
						error
					});
				}
			)
}


handleChangeId(event) {
   this.setState({id: event.target.value});
}

handleChangeName(event) {
   this.setState({name: event.target.value});
   this.setState({logindate: new Date().toISOString()})
     // soll: 2022-07-26T06:26:01.489+00:00
     //ist toISOString: 2022-07-27T05:17:09.385Z
    // this.handleGET();
}

handleChangeNickName(event) {
   this.setState({nickname: event.target.value});
}

handleSubmitId(event) {
    alert('Your Id is: ' + this.state.id);
    event.preventDefault();
}

handleSubmitName(event) {
   alert('Your name is: ' + this.state.name);
   event.preventDefault();
   //const fetch = require('node-fetch');
   const axios = require('axios')
   let config = {
       headers: {
           "Content-Type": "application/json"
       }
   }
   let data = {
      "id": this.state.id,
      "name": this.state.name,
      "nickname": this.state.nickname,
      "logindate":this.state.logindate
   }
   axios.post("http://192.168.2.121:8080/api/account",data,config)
     .then(function (response) {
       console.log(response);
     })
}

handleDeleteAccount(event) {
Alert.alert(
       //This is title
      'Hello',
        //This is body text
      'This is two option alert.',
      [
        {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );

   event.preventDefault();
   //const fetch = require('node-fetch');
   const axios = require('axios')
   let config = {
       headers: {
           "Content-Type": "application/json"
       }
   }
   axios.delete("http://192.168.2.121:8080/api/delete/"+this.state.id,config)
     .then(function (response) {
       console.log(response);
     })
}

render() {
const { error, isLoaded, data, account } = this.state;
const Button = (props) => {
  return (
    <button>{props.text}</button>
  ); }
  return (
    <div className="App">
        <form onSubmit={this.handleSubmitName}>
         <label>
          Type in your Id:
           <input value={this.state.id} onChange={this.handleChangeId} />
          Type in your given and last name:
          <input value={this.state.name} onChange={this.handleChangeName} />
          Type in your nickname:
            <input value={this.state.nickname} onChange={this.handleChangeNickName} />
          </label>
          <button type="submit" >senden</button>
        </form>
      <hr/>
       <form >
        <label>
              ------------------ <br/>
              Type in your Id:
                       <input value={this.state.id} onChange={this.handleChangeId} />
                       The rest of the content is: {this.state.id},{this.state.name}, {this.state.nickname}, {this.state.logindate}
        </label>
       <button type="button" id="btn1" onClick={this.handleGET.bind(this)} text="read" >Read</button>
       <button type="button" id="btn2" onClick={this.handleDeleteAccount.bind(this)} text="delete" >DELETE</button>
       <br/>
       ID =        {JSON.stringify(this.state.account.id)} <br/>
       NAME =     {JSON.stringify(this.state.account.name)} <br/>
       NICKNAME =     {JSON.stringify(this.state.account.nickname)} <br/>
       LOGINDATE =     {JSON.stringify(this.state.account.logindate)} <br/>
      </form>
      <hr/>
      The complete content is: {this.state.id}, {this.state.name}, {this.state.nickname}, {this.state.logindate}
      <hr/>
      <form onSubmit={this.handleAccounts}>
          <label>
              isLoaded = {JSON.stringify(this.state.isLoaded)} <br/>
              error = {JSON.stringify(this.state.error)} <br/>
              accountList = {JSON.stringify(this.state.accountList)}       <br/>
              data = {this.state.data} <br/>
          </label>
          <button type="submit" >Refresh</button>
      </form>
      <hr/>
    </div>
    );
  }
}

export default App;
// See also https://reactjs.org/docs/forms.html
// <button onClick={this.handleGET(this.state.id)} >Read</button>
// <button onClick={() => this.handleGET(this.state.id)} >Read</button>
// <button type="button" id="btn1" onClick={this.handleGET.bind(this)} text="Einlesen" >Read</button> verhindert, dass es permanent ausgeführt wird.