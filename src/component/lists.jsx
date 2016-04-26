import React from 'react';
import {
	Icon, Form, Input, Row, Col, Button
}
from 'antd';

import _ from "underscore";

export default class lists extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		console.log(JSON.stringify(props));
	}

	render() {
		return (
			<div></div>
		);
	}
}