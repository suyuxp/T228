import '../common/lib';
import Categories from '../component/categories';
import Texts from '../component/texts';
import ReactDOM from 'react-dom';
import React, {
	Component,
}
from 'react';

import {
	Row,
	Col
}
from "antd";

class App extends React.Component {
	render() {
		return (
			<div style={{display:"flex",flex:4}}> 
				<div style ={{flex:1,background:"#FFFFFF"}}>
					<Categories /> 
				</div>
				<div style ={{flex:3,paddingLeft:5,paddingRight:5,paddingTop:5,paddingBottom:5,}}>
					<Texts />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react-content'));