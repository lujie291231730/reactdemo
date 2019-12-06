import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Audit from './audit/audit'
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


// ReactDOM.render(<App name="啊旺"/>, document.getElementById('root'));
ReactDOM.render(<ConfigProvider locale={zhCN}><Audit /></ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
