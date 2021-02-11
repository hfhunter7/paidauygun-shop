import { Button, Col, Form, Input, Modal, Row, Transfer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductList } from 'store/modules/product'
import { fetchShopById } from 'store/modules/shop'
import { ACTION } from 'utils/constants'

const ManageShop = (props) => {
  const { visible, onOk, onCancel, action, shopId } = props
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const { shopObj, productList } = useSelector(
    (state) => ({
      shopObj: state.shop.shopObj,
      productList: state.product.productList
    }),
    []
  )

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchProductList())
      if (action === ACTION.UPDATE || action === ACTION.PREVIEW) {
        await dispatch(fetchShopById(shopId))
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (action === ACTION.UPDATE || action === ACTION.PREVIEW) {
      form.setFieldsValue({
        name: shopObj.name,
        description: shopObj.description,
        phoneNumber: shopObj.phoneNumber,
        address: shopObj.address
      })

      const selecteds = []
      productList.forEach((product) => {
        shopObj.productSet.forEach((item) => {
          if (item.id === product.id) {
            selecteds.push(item.id)
          }
        })
      })

      setTargetKeys(selecteds)
    }
  }, [shopObj])

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const renderTitle = () => {
    switch (action) {
      case ACTION.CREATE:
        return 'สร้าง'
      case ACTION.UPDATE:
        return 'แก้ไข'
      case ACTION.PREVIEW:
        return 'ดูรายละเอียด'
      default:
        return null
    }
  }

  const onFinish = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      phoneNumber: values.phoneNumber,
      address: values.address,
      productList: targetKeys
    }
    if (action === ACTION.CREATE) {
      onOk(data)
    } else {
      data.id = shopObj.id
      onOk(data)
    }
  }

  return (
    <Modal
      destroyOnClose={true}
      width={800}
      title={`${renderTitle()}ร้านค้า`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          ยกเลิก
        </Button>,
        <Button
          form="manageShop"
          key="ok"
          type="primary"
          htmlType="submit"
          disabled={action === ACTION.PREVIEW}>
          บันทึก
        </Button>
      ]}>
      <Form name="manageShop" form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="ชื่อร้านค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="คำอธิบายร้านค้า">
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="เบอร์ติดต่อร้านค้า"
              rules={[{ required: true, message: 'Please input' }]}>
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="ที่อยู่"
              rules={[{ required: true, message: 'Please input' }]}>
              <Input disabled={action === ACTION.PREVIEW} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Transfer
            style={{ width: '100%' }}
            dataSource={productList}
            titles={['สินค้าทั้งหมด', 'สินค้าในร้าน']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            operations={['เพิ่ม', 'นำออก']}
            listStyle={{
              width: '100%'
            }}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item) => item.name}
            rowKey={(record) => record.id}
          />
        </Row>
      </Form>
    </Modal>
  )
}

export default ManageShop
