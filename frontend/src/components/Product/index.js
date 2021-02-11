import { Button, Col, Row, Table, Tooltip, Popconfirm, Divider } from 'antd'
import ManageProduct from 'components/Product/ManageProduct'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  fetchProductList,
  updateProduct
} from 'store/modules/product'
import { Text } from 'styled/shared.styled'
import {
  ProjectOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons'
import { ACTION } from 'utils/constants'

const Product = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState(ACTION.CREATE)
  const [productId, setProductId] = useState(null)
  const { isLoading, productList } = useSelector(
    (state) => ({
      isLoading: state.product.isLoading,
      productList: state.product.productList
    }),
    []
  )

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchProductList())
    }

    fetchData()
  }, [])

  const columns = [
    {
      title: 'ลำดับ',
      key: 'no',
      width: 150,
      render: (text, record, index) => {
        return <Text>{index + 1}</Text>
      }
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name'
    },
    {
      title: 'รายละเอียดสินค้า',
      dataIndex: 'description'
    },
    {
      title: 'ราคาสินค้า',
      dataIndex: 'price'
    },
    {
      title: 'หน่วยสินค้า',
      dataIndex: 'unit'
    },
    {
      title: 'หมวดหมู่สินค้า',
      dataIndex: 'productCategory',
      render: ((text, record,index) => <span key={index}>{text.name}</span>)
    },
    {
      title: 'Action',
      key: 'action',
      width: '25%',
      render: (text, record) => (
        <Row gutter={8} justify="center">
          <Col>
            <Text size={20}>
              <Tooltip title="ดูรายละเอียด">
                <ProjectOutlined onClick={() => onPreview(record.id)} />
              </Tooltip>
            </Text>
          </Col>
          <Col>
            <Text size={20}>
              <Tooltip title="แก้ไข">
                <EditOutlined onClick={() => onUpdate(record.id)} />
              </Tooltip>
            </Text>
          </Col>
          <Col>
            <Text size={20}>
              <Popconfirm
                onConfirm={() => onConfirm(record.id)}
                title="ต้องการลบใช่หรือไม่"
                okText="ตกลง"
                cancelText="ยกเลิก">
                <DeleteOutlined />
              </Popconfirm>
            </Text>
          </Col>
        </Row>
      )
    }
  ]

  const onUpdate = async (id) => {
    await setProductId(id)
    await setAction(ACTION.UPDATE)
    await setVisible(true)
  }

  const onConfirm = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(fetchProductList())
  }

  const onPreview = async (id) => {
    await setProductId(id)
    await setAction(ACTION.PREVIEW)
    await setVisible(true)
  }

  const onClickVisible = (e) => {
    e.preventDefault()
    setVisible(true)
    setAction(ACTION.CREATE)
  }

  const onOk = async (data) => {
    if (action === ACTION.CREATE) {
      await dispatch(createProduct(data))
    } else {
      await dispatch(updateProduct(data))
    }

    await dispatch(fetchProductList())
    await setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <Row>
        <Divider>สินค้า</Divider>
      </Row>
      <Row justify="end" style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={(e) => onClickVisible(e)}>
          สร้างสินค้า
        </Button>
      </Row>
      <Row>
        <Table
          bordered
          dataSource={productList}
          columns={columns}
          loading={isLoading}
          rowKey={(record) => {
            return record.id
          }}
          style={{ width: '100%' }}
        />
      </Row>
      {visible && (
        <ManageProduct
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
          productId={productId}
        />
      )}
    </div>
  )
}

export default Product
