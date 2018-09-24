import React, { Component } from 'react';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      radiovalue: '',
      dropdownvalue: 'ACT',
      phoneNumValue: '',
    };
    this.inputEmailChange = this.inputEmailChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
    this.phoneNumChange = this.phoneNumChange.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
  }
  inputEmailChange(e) {
    this.setState({emailValue:e.target.value});
  }

  radioChange(e) {
    this.setState({radiovalue:e.target.value});
  }

  dropDownChange(e) {
    this.setState({dropdownvalue:e.target.value});
  }

  phoneNumChange(e) {
    this.setState({phoneNumValue:e.target.value});
  }
  finalSubmit() {
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailValue);
    const phoneNumberValid = /[0-9]/.test(this.state.phoneNumValue);
    class dataObject {
       constructor(label,value,isValid) {
         this.label=label;
         this.value=value;
         this.isValid=isValid
       }
    }
    const EmailObject = new dataObject("Email Address",this.state.emailValue,emailValid);
    const RadioChange = new dataObject("Gender",this.state.radiovalue,true);
    const DropDownChangeObject = new dataObject("State",this.state.dropdownvalue,true);
    const PhoneNumObject = new dataObject("Contact Number",this.state.phoneNumValue,phoneNumberValid);
    const JsonArray = [EmailObject,RadioChange,DropDownChangeObject,PhoneNumObject];
  
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var json = JSON.stringify(JsonArray),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "test.json";
        a.click();
        window.URL.revokeObjectURL(url);
  }
   render(){
      return(
        (<div>
            Email Address<br /> <input type="text" value={this.state.emailValue} onChange={this.inputEmailChange} /><br />
            Gender <br />
            <input type="radio" value="male" checked={this.state.radiovalue=="male"} onClick={this.radioChange} />Male<br />
            <input type="radio" value="female" checked={this.state.radiovalue=="female"} onClick={this.radioChange}/>Female<br />
            <input type="radio" value="Others" checked={this.state.radiovalue=="Others"} onClick={this.radioChange}/>Others<br />
            <div>State</div>
            <select value={this.state.dropdownvalue} onChange={this.dropDownChange}>
                <option value="NSW">NSW</option>
                <option value="QLD">QLD</option>
                <option value="SA">SA</option>
                <option value="TAS">TAS</option>
                <option value="VIC">VIC</option>
                <option value="WA">WA</option>
                <option value="NT">NT</option>
                <option value="ACT">ACT</option>
            </select><br />
            Contact Number<br />
            <input type ="text" value={this.state.phoneNumValue} onChange={this.phoneNumChange}/><br />
            <button onClick={this.finalSubmit}>Submit</button>
          </div>)
      );
   }
}
export default App;