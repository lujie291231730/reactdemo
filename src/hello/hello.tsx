import React, { useState } from "react";

import { Button, Form, Row, Col, Card, Input } from 'antd';
import 'antd/dist/antd.css';


function HelloWorld() {
  const [hello] = useState("");
  const [count, setCount] = useState(1);
  const [suername, setUuername] = useState("");
  // const [getFieldDecorator]= useState(props.form);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }
  return (
    <div style={{width: "90%",margin: "0 auto"}}>
      <Row gutter={24}>
        <Col span={24}>
          <Card>
            <Form layout="inline" onSubmit={handleSubmit}>
              <Form.Item label="用户名">
                <Input value={suername} onChange={(e) => {setUuername(e.target.value)}} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item>
                <Button type="dashed" htmlType="submit">
                  数量+1
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <p>{hello}</p>
      <div>{count}</div>
      <Button icon="search" type="primary" onClick={ () => setCount(count * 2)}>点击</Button>
    </div>
  );
}
export default HelloWorld;