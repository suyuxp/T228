import React from 'react';
import {
	Icon, Form, Input, Row, Col, Button
}
from 'antd';

import _ from "underscore";
import './lists.less';

export default class lists extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			data:this.props.data
		};
	}

	render() {
		return (
			<Row>
				<div className="header">
					<span className="title"><a title="点击进入高级检索">{this.state.data?this.state.data.level.name:''}   (共{this.state.data.texts.length}篇) </a></span>
				</div>
				<div>
					{this.state.data?this.state.data.level.name:''}--{this.state.data.texts.length}					
				</div>
			</Row>
		);
	}
}