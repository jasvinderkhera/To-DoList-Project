import React, { useState, useEffect,useContext } from "react";
import "./home.css";
import { auth } from "../../firebase/firebase";
import { images } from "../../constants/ImagePath";
import Task from "../task/task";
import Setting from "../settings/settings";
import NewTask from "../newTask/newTask";
import Favourites from "../favourites/favourites";
import { UsernameContext } from "../../context/context";
import TaskCalendar from "../calendar/calendar";
import Search from "../search/search";

function Home() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [user,setUser] = useState('')
  const [main, setMain] = useState('splash')
  const {username} = useContext(UsernameContext)


  let changeScreen = () =>{
    setTimeout(()=>{
      setMain('main')
    },1500)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      changeScreen()
    });
    return unsubscribe;
  }, []);
  return (
    <div className="background">
      {main === 'splash' ? <>
      <div className="h-screen flex justify-center items-center gap-2">
        <img src={images.splashLogo} alt="" />
        <p className="text-5xl font-semibold splashText">TaskHive</p>
      </div>
      </> :
      <div className="mainScreen flex-1 flex min-h-screen p-10">
      <div className=" outerScreen flex flex-row w-full gap-12">
        <div className="menu basis-1/6 w-74 bg-white border p-4 rounded-3xl relative">
          <div className="outerProfile h-48 w-48 rounded-full flex justify-center items-center">
            <div className="innerProfile h-36 w-36 rounded-full bg-black ">
              <img src={images.user} alt="" />
            </div>
          </div>
          <div className="userDetails pt-40 pb-3 text-center">
            <div className="userName">
              <div className="text-2xl flex justify-center wrap userName_text">Welcome, {username}</div>
              <div className="">{user.email}</div>
            </div>
          </div>
          <div className="menuItems flex flex-col justify-center items-center gap-4 ">
            <div
              className={
                activeMenu === "home"
                  ? "activeMenu h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('home')}
            >
              <img
                src={activeMenu === "home" ? images.homeActive : images.home}
                alt=""
                className="menuImages"
              />
            </div>
            <div className={
                activeMenu === "calendar"
                  ? "activeMenu h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('calendar')}>
                 <img
                src={activeMenu === "calendar" ? images.calendarActive : images.calendar}
                alt=""
                className="menuImages"
              />
              </div>
            <div  className={
                activeMenu === "search"
                  ? "activeMenu h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('search')}>
                <img
                src={activeMenu === "search" ? images.searchActive : images.search}
                alt=""
                className="menuImages"
              />
              </div>
            <div
              className={
                activeMenu === "setting"
                  ? "activeMenu h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-20 w-20 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('setting')}
            >
              
              <img
                src={
                  activeMenu === "setting"
                    ? images.settingActive
                    : images.setting
                }
                alt=""
                className="menuImages"
              />
            </div>
          </div>
        </div>
        <div className="mob_menu border-b-2 border-blue-500">
          <div className="mob_img h-14 w-14 bg-white rounded-full">
            <img src={images.user} alt="" />
          </div>
          <div className="mobUserDetails">
            <div className="mobUsername">
              <h3 className="font-bold">{username}</h3>
              <h5 className="">{user.email}</h5>
            </div>
          </div>
          <div className="mob_menu_icon h-10 w-10">
            <img src={images.logo} alt="" className="object-cover"/>
          </div>
          <div className="mobile_menu">
            <div className="mobileMenuItems">
              <div className="mobileMenuItem">
              <div
              className={
                activeMenu === "home"
                  ? "activeMenu h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('home')}
            >
              <img
                src={activeMenu === "home" ? images.homeActive : images.home}
                alt=""
                className="menuImages"
              />
            </div>
            <div className={
                activeMenu === "calendar"
                  ? "activeMenu h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('calendar')}>
                 <img
                src={activeMenu === "calendar" ? images.calendarActive : images.calendar}
                alt=""
                className="menuImages"
              />
              </div>
              <div  className={
                activeMenu === "search"
                  ? "activeMenu h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('search')}>
                <img
                src={activeMenu === "search" ? images.searchActive : images.search}
                alt=""
                className="menuImages"
              />
              </div>
            <div
              className={
                activeMenu === "setting"
                  ? "activeMenu h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
                  : "menuItem h-14 w-14 rounded-full flex flex-col justify-center items-center gap-1"
              }
              onClick={()=>setActiveMenu('setting')}
            >
              
              <img
                src={
                  activeMenu === "setting"
                    ? images.settingActive
                    : images.setting
                }
                alt=""
                className="menuImages"
              />
            </div>
              </div>
            </div>
          </div>

        </div>
        <div className="taskContainer basis-5/6 p-4 rounded-3xl border relative">
        {activeMenu === 'home' ? <Task/> : ''}
        {activeMenu === 'setting' ? <Setting /> : ''}
        {activeMenu === 'newTask' ? <NewTask /> : ''}
        {activeMenu === 'favourites' ? <Favourites /> : ''}
        {activeMenu === 'calendar' ? <TaskCalendar /> : ''}
        {activeMenu === 'search' ? <Search /> : ''}
          <div className="logoContainer h-48 w-48 flex justify-center items-center">
            <div className="logo_box h-36 w-36 bg-white rounded-full flex justify-center items-center p-5">
              <img src={images.logo} alt="" className="logoImage" />
            </div>
          </div>
          <div className="actions h-52 w-48 py-4 px-12 flex flex-col gap-4">
            <div className="wishlist tooltip h-20 w-20 rounded-full bg-white justify-center items-center" onClick={()=>setActiveMenu('favourites')}>
              <img src={images.heart} alt="" />
              <span class="tooltiptext">Favourites</span>
            </div>
            <div className="addTask tooltip h-20 w-20 rounded-full bg-white justify-center items-center p-6" onClick={()=>setActiveMenu('newTask')}>
              <img src={images.add} alt="" className="animate" />
              <span class="tooltiptext"> Add new Task</span>
            </div>
          </div>

          <div className="mobileActions">
          <div className="wishlist tooltip h-14 w-14 rounded-full bg-white justify-center items-center mb-4" onClick={()=>setActiveMenu('favourites')}>
              <img src={images.heart} alt="" />
              <span class="tooltiptext">Favourites</span>
            </div>
            <div className="addTask tooltip h-14 w-14 rounded-full bg-white justify-center items-center p-4" onClick={()=>setActiveMenu('newTask')}>
              <img src={images.add} alt="" />
              <span class="tooltiptext"> Add new Task</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      }
    </div>
  );
}

export default Home;
