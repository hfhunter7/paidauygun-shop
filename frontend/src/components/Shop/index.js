import { Button, Col, Row, Table, Tooltip, Popconfirm, Divider } from 'antd'
import ManageShop from 'components/Shop/ManageShop'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShop, deleteShop, fetchShopList, updateShop } from 'store/modules/shop'
import { Text } from 'styled/shared.styled'
import {
  ProjectOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons'
import { ACTION } from 'utils/constants'

const Shop = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState(ACTION.CREATE)
  const [shopId, setShopId] = useState(null)
  const { isLoading, shopList } = useSelector(
    (state) => ({
      isLoading: state.shop.isLoading,
      shopList: state.shop.shopList
    }),
    []
  )

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchShopList())
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
      title: 'ชื่อร้านค้า',
      dataIndex: 'name'
    },
    {
      title: 'คำอธิบายร้านค้า',
      dataIndex: 'description'
    },
    {
      title: 'เบอร์ติดต่อร้านค้า',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address'
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
                <ProjectOutlined onClick={() => onPreview(record.id)}/>
              </Tooltip>
            </Text>
          </Col>
          <Col>
            <Text size={20}>
              <Tooltip title="แก้ไข">
                <EditOutlined onClick={() => onUpdate(record.id)}/>
              </Tooltip>
            </Text>
          </Col>
          <Col>
            <Text size={20}>
              <Popconfirm
                onConfirm={() => onConfirm((record.id))}
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
    await setShopId(id)
    await setAction(ACTION.UPDATE)
    await setVisible(true)
  }

  const onConfirm = async (id) => {
    await dispatch(deleteShop(id))
    await dispatch(fetchShopList())
  }

  const onPreview = async (id) => {
    await setShopId(id)
    await setAction(ACTION.PREVIEW)
    await setVisible(true)
  }

  const onClickVisible = (e) => {
    e.preventDefault()
    setVisible(true)
    setAction(ACTION.CREATE)
  }

  const onOk = async (data) => {
    if(action === ACTION.CREATE){
      await dispatch(createShop(data))
    } else {
      await dispatch(updateShop(data))
    }

    await dispatch(fetchShopList())
    await setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <div style={{ width: '100%' }}>
      <Row>
        <Divider>ร้านค้า</Divider>
      </Row>
      <Row justify="end" style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={(e) => onClickVisible(e)}>
          สร้างร้านค้า
        </Button>
      </Row>
      <Row>
        <Table
          bordered
          dataSource={shopList}
          columns={columns}
          loading={isLoading}
          rowKey={(record) => {
            return record.id
          }}
          style={{ width: '100%' }}
        />
      </Row>
      {visible && (
        <ManageShop
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          action={action}
          shopId={shopId}
        />
      )}
    </div>
  )
}

export default Shop
