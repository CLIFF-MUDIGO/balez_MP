import { Col, Form, Input, Modal, Row, Select, Tabs, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct, EditProduct } from '../../../apicalls/products'
import { setLoader } from '../../../redux/loadersSlice'
import React, { useEffect, useState } from 'react'
import Images from './images'

const additionalThings = [
  {
    label: 'Bill Available',
    name: 'billAvailable',
  },
  {
    label: 'Warranty Available',
    name: 'warrantyAvailable',
  },
  {
    label: 'Accessories Available',
    name: 'accessoriesAvailable',
  },
  {
    label: 'Box Available',
    name: 'boxAvailable',
  }
];

const rules = [
  {
    required: true,
    message: 'required',
  }
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData
}) {
  const [selectedTab, setSelectedTab] = useState("1"); // Corrected this line
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }

      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: null })} // Corrected footer prop
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
          <Tabs.TabPane tab="General" key="1">
            <Form
              layout='vertical' ref={formRef} onFinish={onFinish}
            >
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type='text' />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type='text' />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type='number' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <Select>
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="electronics">Electronics</Select.Option>
                      <Select.Option value="fashion">Fashion</Select.Option>
                      <Select.Option value="home">Home</Select.Option>
                      <Select.Option value="sports">Sports</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type='number' />
                  </Form.Item>
                </Col>
              </Row>
              <div className='flex gap-10'>
                {additionalThings.map((item) => (
                  <Form.Item label={item.label} name={item.name} valuePropName='checked'>
                    <Input
                      type='checkbox'
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          [item.name]: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(item.name)}
                    />
                  </Form.Item>
                ))}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images selectedProduct={selectedProduct} getData={getData} setShowProductForm={setShowProductForm} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
