import React from 'react'
import Dashboard from '../../components/HomeScreen/Dashboard'
import Layout from '../../common/Layouts/NormalLayout/Layout'
import { UserContext } from '../../Context/AllContexts';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { userData , setUserData , accessToken , setAccessToken } = React.useContext(UserContext);
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  React.useEffect(() => {
    if((!token && !accessToken) || !role){
      navigate("/login");
    }
    if(!accessToken){
      setAccessToken(token);
    }
    if(!userData){
      const getUserData = async () => {
        const response = await fetch(`http://localhost:5001/api/v1/${role.toLowerCase()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
          },
        });
  
        const data = await response.json();
        console.log(data);
        if (data.success === true && data.data) {
          setUserData(data.data);
        }
      };
      getUserData();
    }} , [])
  return (
      <Layout>
        <Dashboard />
      </Layout>
    
  )
}

export default HomeScreen