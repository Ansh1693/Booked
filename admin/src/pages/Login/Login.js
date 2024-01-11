import React from 'react'
import {useForm } from 'react-hook-form'
import UserLogin from '../../components/Login/UserLogin'
import VerifyLogin from '../../components/Login/VerifyLogin'
import Layout from '../../common/Layouts/NormalLayout/Layout'


const Login = () => {
  const [verify, setVerify] = React.useState(false)

  return(
    <Layout>

      {
        verify ? <VerifyLogin setVerify={setVerify}/> : <UserLogin setVerify={setVerify}/>      
      }
      {/* <UserLogin setVerify={setVerify}/> */}
      {/* <VerifyLogin setVerify={setVerify} /> */}
      </Layout>
  )
}

export default Login