import React from 'react'
import { Auth } from 'aws-amplify';

const Home = (props) => {

  const handleLogout = async () => {
    try {
      await Auth.signOut()
      .then((res)=>{
        props.history.push('/login')
      })
    } catch (error){
      console.log(error);
    }
  }

  return (
    <div>
      Welcome home
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home
