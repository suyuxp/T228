import React from 'react';
import {
	Icon, Form, Input, Row, Col, Button
}
from 'antd';

import _ from "underscore";

import {
	connect
}
from 'react-redux';

import List from "./lists";
import './texts.less';

import classNames from 'classnames';
const InputGroup = Input.Group;

export default class texts extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			iconLoading: false,
			value: '交通安全',
			focus: false,
			url: 'http://127.0.0.1:8360',
			datas: new Array()
		};
	}
	handleInputChange(e) {
		this.setState({
			value: e.target.value,
		});
	}
	handleFocusBlur(e) {
		this.setState({
			focus: e.target === document.activeElement,
		});
	}
	handleSearch() {
		let words = this.state.value;
		if (words) {
			fetch(this.state.url + "/texts?word=" + words)
				.then(res => res.json())
				.then(res => {
					// console.log(JSON.stringify(res));
					console.log(res.length);
					this.setState({datas:res});
				}).catch((error) => {
					console.error(error);
				});
		}
	}
	render() {
		const btnCls = classNames({
			'ant-search-btn': true,
			'ant-search-btn-noempty': !!this.state.value.trim(),
		});
		const searchCls = classNames({
			'ant-search-input': true,
			'ant-search-input-focus': this.state.focus,
		});
		return (
			<div>
				<Row>
					<Col span="1"></Col>
					<Col span="22">
				      <InputGroup className={searchCls} style={this.props.style}>
				        <Input {...this.props} value={this.state.value} onChange={this.handleInputChange.bind(this)}
				          onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
				        <div className="ant-input-group-wrap">
				          <Button className={btnCls} size={this.props.size} onClick={this.handleSearch.bind(this)}>
				            <Icon type="search" />
				          </Button>
				        </div>
				      </InputGroup>
					</Col>
				</Row>
				<Row>
					<Col span="1"></Col>
					<Col span="22">
						<Row>
							{
								this.state.datas.map((data,index) => {
									return <h4>{data.level.name}</h4>
								})
							}
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}