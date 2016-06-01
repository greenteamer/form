import React, { Component } from 'react';
import ProfessionField from './ProfessionField';
import PhoneField from './PhoneField';


var professions = [
	{id: 1, text: 'Парикмахерские услуги'},
	{id: 2, text: 'Маникюр'},
	{id: 3, text: 'Макияж', disabled: true},
	{id: 4, text: 'Ремонтно-отделочные работы'},
	{id: 5, text: 'Строительство частных домов'},
	{id: 6, text: 'Обработка территории'},
	{id: 7, text: 'Создание сайтов'},
	{id: 8, text: 'Ветеринарные услуги'},
	{id: 9, text: 'Ремонт бытовой техники'}
]


var countries = [
	{name: "Russia", img: "../images/flags/Russia/64.png", number: "7"},
	{name: "Denmark", img: "../images/flags/Denmark/64.png", number: "4"},
	{name: "USA", img: "../images/flags/United-States/64.png", number: "1"},
	{name: "France", img: "../images/flags/France/64.png", number: "3"},
	{name: "Israel", img: "../images/flags/Israel/64.png", number: "9"},
]


export default class Form extends Component {
  render() {
    return (
      <form className="register-form center align-center">
				<h4><strong>Зарегистрируйтесь</strong> и начните продавать услуги через интернет сегодня</h4>
				<div className="top-part">
					<div className="form-group form-group-inline form-group-inline-left">
						<label for="formControlsText" className="control-label">Имя</label>
						<input type="text" className="form-control inline-input-left"/>
					</div>

					<div className="form-group form-group-inline">
						<label for="formControlsText" className="control-label">Фамилия</label>
						<input type="text" className="form-control inline-input"/>
					</div>
				</div>

				<ProfessionField professions={professions}/>

				<PhoneField countries={countries} />

				<div className="form-group button-group">
					<button
						className="btn btn-primary">Зарегистрироваться</button>
				</div>
			</form>
    );
  }
}
