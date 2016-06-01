import React, { Component } from 'react';
import Select2 from './Select2';
import _ from 'underscore';


export default class ProfessionField extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	list: this.props.professions,
    	isOpen: false,
    	value: {},
    	text: "",
    	keyIndex: undefined
    };
  }

	changeChars(e){
		// фильтр списка по вводимым символам
		this.openSelect();
		console.log("e.target.value: ", e.target.value, this.state.list)
		this.setState({
			text: e.target.value
		})
		let new_list = _.filter(this.props.professions, (prof)=>{
			let str = prof.text.toLowerCase();
			if (str.indexOf(e.target.value) >= 0){
				return true;
			} else if (prof.text.indexOf(e.target.value) >= 0) {
				return true;
			}
		})
		this.setState({
			list: new_list
		})
	}

	openSelect(){
		setTimeout(()=>{
			this.setState({
				isOpen: true
			})
		}, 100);
	}

	closeSelect(){
		setTimeout(()=>{
			this.setState({
				isOpen: false
			})
		}, 100);
	}

	_selectProfession(prof, e){
		this.setState({
			value: prof,
			text: prof.text
		})
	}

	preparationList(){
		let list = _.map(this.state.list, (prof)=>{
			// преобразуем строку в массив
			let split_text_arr = "";
			if (this.state.text) {
				split_text_arr = prof.text.split(this.state.text);
				if (split_text_arr.length == 1) {
					// если слово начинается с большой буквы
					split_text_arr = prof.text.split(this.state.text[0].toUpperCase() + this.state.text.substr(1));
				}
			}
			return(
				<div
					className="select-item"
					key={ prof.id }
					onClick={this._selectProfession.bind(this, prof)}>
					<a name="">{(split_text_arr.length > 0) ? splitText(split_text_arr, this.state.text) : prof.text}</a>
				</div>
			)
		})
		return list;
	}

	selectByKeyPress(e){
		if (e.keyCode == 40) {
			//  нажатие на стрелку вниз
			console.log("satart key up 40, keyIndex: ", this.state.keyIndex)
			let keyIndex = ((this.state.keyIndex || this.state.keyIndex == 0) && this.state.keyIndex < this.state.list.length) ? this.state.keyIndex + 1 : 0;
			this.setState({
				keyIndex: keyIndex,
				value: this.state.list[keyIndex],
				text: this.state.list[keyIndex].text
			})
		}else if (e.keyCode == 38){
			// нажатие на стрелку вверх
			let index = this.state.keyIndex;
			console.log("satrt key up 38, keyIndex: ", this.state.keyIndex)
			let keyIndex = (index >= 0 || index) ? index - 1 : this.state.list.length-1;
				console.log("end key up 38, keyIndex: ", keyIndex)
			this.setState({
				keyIndex: keyIndex,
				value: this.state.list[keyIndex],
				text: this.state.list[keyIndex].text
			})
		}else if(e.keyCode == 13){
			// нажати на Enter
			e.preventDefault();
      e.stopPropagation();
			this.closeSelect();
		}
		console.log("satart key up 40, keyIndex: ", this.state.keyIndex)
	}

	cancelEnter(e){
		if(e.keyCode == 13){
			// нажати на Enter
			e.preventDefault();
      e.stopPropagation();
			this.closeSelect();
			this.setState({
				keyIndex: undefined
			})
		}
		return false;
	}

	render() {
		if (!this.state.list) {
			return null
		}
		return (
			<div
				className="form-group align-left profession-group"
				onBlur={this.closeSelect.bind(this)}>
				<label for="formControlsText" className="control-label">Профессия</label>
				<input
					ref="tags"
					type="text"
					value={this.state.text}
					className="form-control inline-input profession"
					onChange={this.changeChars.bind(this)}
					onFocus={this.openSelect.bind(this)}
					onBlur={this.closeSelect.bind(this)}
					onKeyUp={this.selectByKeyPress.bind(this)}
					onKeyDown={this.cancelEnter.bind(this)}/>
				<div className={(this.state.isOpen) ? "dropdown-select open" : "dropdown-select"}>
					{this.preparationList()}
				</div>

			</div>
		);
	}
}


function splitText(arr, text){
	// выделяем жирным нужные символы
	return _.map(arr, (word, index)=>{
		if (index == 0 || index & 1) {
			return (
				<span key={index}>
					<span>{word}</span>{(index == (arr.length-1)) ? "" : <strong>{text}</strong>}
				</span>
			)
		} else {
			return <span key={index}>{word}</span>
		}
	})
}

