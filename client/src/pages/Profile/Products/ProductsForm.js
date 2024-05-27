import { Col, Form, Input, Modal, Row, Select, Tabs } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function ProductsForm({
  showProductForm,
  setShowProductForm,
}) {
  return (
    <Modal 
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Form 
          layout='vertical'
          >
            <Form.Item label="Name" name="name">
              <Input type='text'/>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <TextArea type='text'/>
            </Form.Item>
            <Row
              gutter={[16,16]}
            >
              <Col span={8}>
                <Form.Item label="Price" name="price">
                  <Input type='number'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Category" name="category">
                  <select>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="sports">Sports</option>
                  </select>

                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Age" name="age">
                  <Input type='number'/>
                </Form.Item>
              </Col>
            </Row>
          </Form>

        </Tabs.TabPane>
        <Tabs.TabPane tab="Images" key="2">
          <h1>Images</h1>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default ProductsForm
