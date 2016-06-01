import React, { Component } from 'react';
import Form from './Form';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<Form />
					</div>
				</div>
			</div>
		);
	}
}
