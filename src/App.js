import './App.css'
import Login from './components/Login/Login'

import JoinedClasses from './components/JoinedClasses/JoinedClasses'

import { IsUserRedirect, ProtectedRoute } from './routes/AllRoutes'

import { BrowserRouter as Router,Switch } from 'react-router-dom'
import { useContextAPI } from './context/Context'
import { useEffect, useState } from 'react'
import db from './library/firebase'
import { Route } from 'react-router-dom'
import Wrapper from './components/Wrapper/Wrapper'
import ClassDetails from './components/ClassDetails/ClassDetails'
import Topics from './components/ClassDetails/Topics'

const App = () => {

  const { loginMail } = useContextAPI();

  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  console.log(joinedClasses)

  useEffect(() => {
    if (loginMail) {
      let unsubscribe = db
        .collection("createdClasses")
        .doc(loginMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loginMail]);

  useEffect(() => {
    if (loginMail) {
      let unsubscribe = db
        .collection("JoinedClasses")
        .doc(loginMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setJoinedClasses(snapshot.docs.map((doc) => doc.data()));
        });

      return () => unsubscribe();
    }
  }, [loginMail]);

  // console.log(createdClasses)
  // console.log(joinedClasses)

  return (
    <div className="App">
      <Router>
        <Switch>

        {createdClasses.map((item, index) => (
          <Route key={index} path={`/${item.id}`}>
            <Wrapper detailData={item} />
            <ClassDetails detailData={item} />
          </Route>
        ))}

        {joinedClasses.map((item, index) => (
          <Route key={index} path={`/${item.id}`}>
            <Wrapper detailData={item} />
            <ClassDetails detailData={item.joinedData} />
          </Route>
        ))} 

        <IsUserRedirect
          user={loginMail}
          loggedInPath='/'
          path='/signin'
          exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute
          user={loginMail}
          path='/'
          exact
        >
          <Wrapper />

          <div className="class-wrapper">
            <div 
               className='created-classes-container'
            >
              {createdClasses.map((item) => (
                 <JoinedClasses classData={item} />
              ))}
            </div>

            <div 
               className='joined-classes-container'
            >
              {joinedClasses.map((item) => (
                 <JoinedClasses classData={item.joinedData} />
              ))}
            </div>
          </div>
        </ProtectedRoute>

        </Switch>
      </Router>
    </div>
  )
}

export default App
