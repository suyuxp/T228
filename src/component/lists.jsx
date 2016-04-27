import React from 'react';
import {
	Icon, Form, Input, Row, Col, Button, Modal
}
from 'antd';

import _ from "underscore";
import moment from "moment";
import './lists.less';

export default class lists extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			url: this.props.url,
			level: new Array(),
			texts: new Array(),
			visible: false,
			modalTitle: '',
			modalContent: ''
		};
	}

	clickTitle(e) {
		e.preventDefault();
	}

	showModal(text) {
		fetch(url + '/texts/' + text.id)
			.then(res => res.json())
			.then(res => {
				console.log(JSON.stringify(res.content));
				this.setState({
					visible: true,
					modalTitle: res.name,
					modalContent: res.content,
				});
			}).catch((error) => {
				console.error(error);
			});
	}
	handleOk() {
		console.log('点击了确定');
		this.setState({
			visible: false,
			modalTitle: '',
			modalContent: '',
		});
	}
	handleCancel(e) {
		this.setState({
			visible: false,
			modalTitle: '',
			modalContent: '',
		});
	}
	componentDidMount() {
		let texts = _.map(this.state.data.texts, (text, index) => {
			return (
				<Row className="text" key={text.id}>
					<Col span="1" style={{textAlign:"-webkit-center"}}>
						{index+1}、
					</Col>
					<Col span="20">
						{text.name}&nbsp;&nbsp;&nbsp;&nbsp;(颁布日期:{moment(text.issue_date).format("YYYY-MM-DD")})
					</Col>
					<Col span="3">
						<Button type="primary" size="small" onClick={this.showModal.bind(this,text)}>查看全文</Button>
					</Col>
				</Row>
			)
		});
		this.setState({
			level: this.state.data.level,
			texts: texts,
		});
	}

	render() {
		return (
			<div>
				<Row>
					<div className="header">
						<span className="title">
							<a title="点击进入高级检索" 
							onClick={this.clickTitle.bind(this)}>{this.state.data?this.state.data.level.name:''}   (共{this.state.data.texts.length}篇) 
							</a>
						</span>
					</div>
					<div className="lists">
						{
							this.state.texts
						}					
					</div>
				</Row>
				<div>
			        <Modal title={this.state.modalTitle} visible={this.state.visible}
			          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
						<p>{this.state.modalContent}</p>
			        </Modal>
		      	</div>
	      	</div>
		);
	}
}