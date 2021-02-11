import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from 'store/modules/product'
import { fetchProductCategoryList } from 'store/modules/productCategory'
import { ACTION } from 'utils/constants'
import { renderTitle } from 'utils/utils'

const ManageProduct = (props) => {
  const { visible, onOk, onCancel, action, productId } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const { productObj, productCategoryList } = useSelector(
    (state) => ({
      productObj: state.product.productObj,
      productCategoryList: state.productCategory.productCategoryList
    }),
    []
  )

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchProductCategoryList())
      if (action === ACTION.UPDATE || action === ACTION.PREVIEW) {
        await dispatch(fetchProductById(productId))
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (action === ACTION.UPDATE || action === ACTION.PREVIEW) {
      form.setFieldsValue({
        name: productObj.name,
        description: productObj.description,
        price: productObj.price,
        unit: productObj.unit
      })

      if (productObj.productCategory) {
        form.setFieldsValue({
          productCategoryId: productObj.productCategory.id
        })
      }
    }
  }, [productObj])

  const onFinish = (values) => {
    const data = {
      productCategoryId: values.productCategoryId,
      name: values.name,
      description: values.description,
      price: values.price,
      unit: values.unit
    }
    if (action === ACTION.CREATE) {
      onOk(data)
    } else {
      data.id = productObj.id
      onOk(data)
    }
  }

  return (
    <Modal
      destroyOnClose={true}
      width={800}
      title={`${renderTitle(action)}สินค้า`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          ยกเลิก
        </Button>,
        <Button
          form="manageProduct"
          key="ok"
          type="primary"
          htmlType="submit"
          disabled={action === ACTION.PREVIEW}>
          บันทึก
        </Button>
      ]}>
      <Form
        name="manageProduct"
        form={form}
        layout="vertical"
        onFinish={onFinish}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="ชื่อสินค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="productCategoryId"
              label="หมวดหมู่สินค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <Select disabled={action === ACTION.PREVIEW}>
                {productCategoryList.length > 0 &&
                  productCategoryList.map((item, index) => {
                    return (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name="description" label="คำอธิบายร้านค้า">
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="ราคาสินค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <InputNumber
                style={{ width: '100%' }}
                disabled={action === ACTION.PREVIEW}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="unit"
              label="หน่วยสินค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ManageProduct
