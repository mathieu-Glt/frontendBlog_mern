import { useEffect, useState } from 'react';
import './App.css';
import Routes from './components/Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { getUser } from './actions/user/user.actions';
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';


function App() {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  console.log("🚀 ~ file: App.js:15 ~ App ~ uid:", uid)
  const currentUrl = window.location.pathname;
  console.log("🚀 ~ file: App.js:19 ~ App ~ location:", currentUrl)

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => { console.log(res); setUid(res.data)})
        .catch((err) => console.log("No token"))
    }
    fetchToken();
  }, [currentUrl]);
  
  if(uid) {dispatch(getUser(uid.user._id))} 

  return (
    <div className="App">
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover 
          />
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
}

export default App;
