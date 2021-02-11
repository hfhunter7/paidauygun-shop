import Product from 'components/Product';
import Shop from 'components/Shop'
import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Content } from 'styled/home.styled'

export default function Home() {
  const [key, setKey] = useState('1')

  const onClick = (e) => {
    setKey(e.key)
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          onClick={onClick}>
          <Menu.Item key="1">ร้านค้า</Menu.Item>
          <Menu.Item key="2">สินค้า</Menu.Item>
        </Menu>
      </Layout.Header>
      <Content style={{ padding: '0 50px' }}>
        {key === '1' && <Shop />}
        {key === '2' && <Product />}
      </Content>
    </Layout>
  )
}
