import './App.css';
import logo from './customLogo.png'
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import {auth, db} from './firebase-config'
import {signOut} from "firebase/auth"
import Signup from './pages/Signup';
import { addDoc, collection, getDocs, doc, deleteDoc} from "firebase/firestore"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const [username, setUsername] =  useState(localStorage.getItem("username"))
  const [toggleLoginButtonOff, setLoginToggleButtonOff] =  useState(false)
  const [toggleSignupButtonOff, setSignupButtonToggleOff] = useState(false)

  const [postLists, setPostList] = useState([])

  let titleRef = React.createRef();
  let textRef = React.createRef();

  useEffect(() => {
    const postCollectionRef = collection(db, "allblogposts")
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getPosts()
  }, [])

  const handleLogin = () => {
    window.location.pathname = '/login'
  }


  const handleCreatePost = async () => {
    const postCollectionRef = collection(db, "allblogposts")
    const title = titleRef.current.value
    const text = textRef.current.value
    await addDoc(postCollectionRef, {
        title,
        text,
        author: {name:(auth.currentUser.displayName), id: auth.currentUser.uid
        }
    }).then(() => {
        window.location.pathname = '/'
    })
  }

  const handleSignup = () => {
    window.location.pathname = '/signup'
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/"
    })
  }

const handleDeletePost = async (id) => {
  const postDoc = doc(db, "allblogposts", id)
  await deleteDoc(postDoc).then(() =>{
    window.location.pathname = '/'
  })
}

function ViewArticle(props){
  return (
    <div class="card text-center mt-3">
      <div class="card-header">
        By: {props.author.name}
      </div>
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>
        <p class="card-text">{props.text}</p>
      </div>
      <div class="card-footer text-muted">
        {isAuth && props.author.id === auth.currentUser.uid && (<button type="button" class="btn btn-outline-danger ms-2" onClick={() =>  {handleDeletePost(props.id)}}>Delete</button>)}
      </div>
    </div>
  )
}
  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a href='/' ><img src={logo} style={{height:"40px", width:"40px"}} alt="custom-logo"/></a>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              {!isAuth ? (
                  <>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    {!toggleLoginButtonOff && 
                      <button onClick={handleLogin} class="btn btn-outline-success me-2">Login</button>
                    }
                    {!toggleSignupButtonOff && 
                      <button onClick={handleSignup} class="btn btn-outline-success me-2">Sign up</button>
                    }
                  </>
                ) : (
                  <>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <div class="me-3">
                      Welcome back, {username} !
                    </div>
                    <button onClick={handleLogOut} class="btn btn-outline-danger me-2">Logout</button>
                  </>
                )}
            </div>
        </div>
      </nav>
      {isAuth ? (
        <div class="container col-8 justify-content-center">
            <div className='createBlog' class="row">
              <div class="mb-3">
                  <span class="input-group-text">New Blog</span>
              </div>
              <div class="input-group mb-3">
                  <span class="input-group-text">Title</span>
                  <input class="form-control" placeholder="Title..." ref={titleRef}></input>
              </div>
              <div class="input-group mb-3">
                  <span class="input-group-text">Post</span>
                  <textarea class="form-control" rows="4" col="80" placeholder="Post..." ref={textRef}></textarea>
              </div>
              <div class="mt-3 text-center">
                  <button class="btn btn-outline-success me-3" onClick={handleCreatePost}>Create Post</button>
              </div>
            </div>
            <div class="card-group row">
              {postLists.map((post, key) => {
                  return (<div key={key}><ViewArticle title={post.title} text={post.text} author={post.author} id={post.id}/></div>)
              })}
            </div>
            <div class="blogposts mt-5"></div>
        </div>) : (<>
            {!toggleLoginButtonOff && !toggleSignupButtonOff && 
              <div class="container text-center mt-5">
                <h1>Sign up and log in to view blog</h1>
              </div> 
          }
        </>)}
      <Routes>
            <Route path="/"/>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} setUsername={setUsername} setLoginToggleButtonOff={setLoginToggleButtonOff} setSignupButtonToggleOff={setSignupButtonToggleOff}/>}/>
            <Route path="/signup" element={<Signup setLoginToggleButtonOff={setLoginToggleButtonOff} setSignupButtonToggleOff={setSignupButtonToggleOff}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
