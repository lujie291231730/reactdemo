import React, { useState } from "react";

import { Card, Form, Button, Input, Select, DatePicker, Table } from 'antd';
// import { Option } from Select;
import 'antd/dist/antd.css';
import { FormComponentProps } from "antd/lib/form";

function Audit(props: FormComponentProps) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const handleSubmit = (e:any) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const value = {
          'range-picker': [values['range-picker'][0].format('YYYY-MM-DD'), values['range-picker'][1].format('YYYY-MM-DD')],
        };
        console.log("Received values of form: ", value);
      }
    });
  }
  const [option] = useState(
    [
      {
        value: '1',
        name: '下拉框1'
      },
      {
        value: '2',
        name: '下拉框2'
      }, 
      {
        value: '3',
        name: '下拉框3'
      },
    ]
  );
  return (
    <div style={{marginLeft: '240px',backgroundColor: '#eff4f8',height: '937px',overflow: 'hidden'}}>
      <Card style={{width: '90%',margin: '50px auto',height: '88px'}}>
        <Form layout="inline" onSubmit={handleSubmit}>
          <Form.Item label={'用户名'}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空！' }],
            })(
              <Input placeholder="请输入用户名" />,
            )}
          </Form.Item>
          <Form.Item label={'密码'}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空！' }],
            })(
              <Input.Password  placeholder="请输入密码" type="password" />,
            )}
          </Form.Item>
          <Form.Item label="下拉框">
            {getFieldDecorator('select', {
              rules: [{ required: true, message: '下拉框不能为空！' }],
            })(
              <Select style={{width: '165px'}} allowClear={true} placeholder="请选择">
                {option.map(item =>
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                )}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="选择日期">
            {getFieldDecorator('range-picker', {
              rules: [{  type: 'array', required: true, message: '请选择时间！' }],
            })(<RangePicker placeholder={['开始时间','结束时间']}/>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Table style={{width: '90%',margin: '0 auto',backgroundColor: 'white'}} bordered={true} dataSource={dataSource} columns={columns} />;
    </div>
  );
}
export default  Form.create()(Audit);