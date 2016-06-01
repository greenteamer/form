import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import _ from 'underscore';


export default class PhoneField extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	currentCountry: this.props.countries[0],
			dropdownCountry: false,
			isFocusPhone: false,
			phoneValue: ""
    };
  }

	_onDropdownCountryClick(){
		this.setState({
			dropdownCountry: !this.state.dropdownCountry
		})
	}

	_changeCountry(country){
		this._onDropdownCountryClick();
		var phone = this.changePhoneCode(this.state.phoneValue, country)
		this.setState({
			currentCountry: country,
			phoneValue: phone
		})
		// console.log("current country: ", country)
	}

	_onFocusPhone(){
		this.setState({
			isFocusPhone: !this.state.isFocusPhone,
			phoneValue: (this.state.phoneValue == "") ? this.state.currentCountry.number : this.state.phoneValue
		})
	}

	_onBlurPhone(){
		this.setState({
			isFocusPhone: !this.state.isFocusPhone
		})
	}

	_onChangePhone(e){
		this.setState({
			phoneValue: e.target.value
		})
	}

	changePhoneCode(phone, country){
		var searchCode = "+" + this.state.currentCountry.number;
		var newCode = "+" + country.number;
		var newPhone =  phone.replace(searchCode, newCode);
		return newPhone;
	}

  render(){
		console.log("phone value: ", this.state.phoneValue)
		var placeholder = (!this.state.phoneValue) ? <span className="placeholder"><span className="dark">+{ this.state.currentCountry.number } </span>495 123-66-55</span> : "";
		return(
			<div className="form-group align-left">
				<label for="formControlsText" class="control-label">Телефон</label>
				<div className="input-group">

					<div className={this.state.dropdownCountry ? "input-group-btn open" : "input-group-btn"}>
						<button
							type="button"
							className="btn btn-default dropdown-toggle flag"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded={this.state.dropdownCountry ? "true" : "false"}
							onClick={this._onDropdownCountryClick.bind(this)}>
							<img
								src={this.state.currentCountry.img}
								height="100"/>
								<span className="ion-ios-arrow-down"></span></button>
						<ul className="dropdown-menu dropdown-menu-left">
							{_.map(this.props.countries, (country)=>{
								return(
								  <li key={ country.name }>
								  	<a
								  		name=""
								  		onClick={this._changeCountry.bind(this, country)}>{ country.name }</a>
								  </li>
								)
							})}
						</ul>
					</div>
					<div className="placeholder-wrap">
						<MaskedInput
							className="form-control"
							mask="+1 111 111-11-11"
							placeholder=" "
							name="card"
							size="20"
							value={this.state.phoneValue}
							onChange={this._onChangePhone.bind(this)}
							onFocus={this._onFocusPhone.bind(this)}
							onBlur={this._onBlurPhone.bind(this)}/>
						{placeholder}
					</div>

				</div>
			</div>
		)
	}
}
