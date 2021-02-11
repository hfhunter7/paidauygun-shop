import React from 'react';
import 'antd/dist/antd.css'
import Head from 'next/head'
import { wrapper } from 'store'
import { createGlobalStyle } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  word-wrap: break-word;
  }
  
  body {
    font-family: 'Kanit', sans-serif;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: .03rem;
    margin: 0 auto;
    background-color: #ffffff;
  }
  
  .ant-table-tbody > tr {
    cursor: pointer;
  }
`

const WrappedApp = ({ Component, pageProps }) => {
  const store = useStore((state) => {
    return state
  })
  return (
    <>
      <Head>
        <title>Paidauygun Test</title>
      </Head>
      <GlobalStyle />
      <PersistGate persistor={store.__persistor} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
