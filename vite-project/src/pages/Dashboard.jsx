import React, { useEffect, useState, useCallback } from "react";
import { User, MessageSquare, PlusCircle, LogOut, Bell, Search, Heart, MessageCircle, Share } from "lucide-react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router'

const UserDashboard = () => {

  let Navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessages] = useState("")
  const [Chats, setChats] = useState("");

  var user = JSON.parse(localStorage.getItem("user"));

  var SecretCode = user.data.orgCode;
  var userName = user.data.userName;
  var companyName = user.data.companyName;

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
    { id: "add", label: "Add Message", icon: <PlusCircle size={18} /> },
  ];

  function logOut() {
    Navigate("/");

    localStorage.setItem("user", "");
  }





  const submitForm = useCallback(async () => {
    try {
      let response = await axios.post("https://whistlespace-backend.vercel.app/api/user/addmessage", {
        secretKey: SecretCode,
        content: message,
        randomUsername: userName
      });

      console.log(response);
      toast(response.data.messages);
      setMessages("");
    } catch (error) {
      console.log(error);
      toast(error.response.data.messages);
    }
  }, [SecretCode, message, userName]);


  const handlesubmit = (e) => {
    e.preventDefault();
    submitForm();
  };


  const fetchMessages = useCallback(async () => {
    try {
      let response = await axios.post("https://whistlespace-backend.vercel.app/api/user/getmessages", {
        secretKey: SecretCode
      });

      console.log(response.data.data.messages);
      setChats(response.data.data.messages);
    } catch (error) {
      console.log(error.message);
    }
  }, [SecretCode]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, submitForm]);


  useEffect((e) => {

    let fetchMessages = async () => {
      try {
        let response = await axios.post("https://whistlespace-backend.vercel.app/api/user/getmessages", {
          secretKey: SecretCode
        })

        console.log(response.data.data.messages)
        setChats(response.data.data.messages)

      } catch (error) {
        console.log(error.message)
      }
    }

    fetchMessages()
  }, [submitForm])



  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "y ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "mo ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "m ago";

    return "Just now";
  };






  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex-shrink-0 flex flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative z-10 p-6 md:p-8">
            {/* Logo/Header */}
            <div className="mb-12 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-sm text-slate-500 mt-1">Welcome back, {userName}</p>
            </div>

            {/* Navigation */}
            <nav className="flex md:flex-col justify-center md:justify-start gap-2 md:space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25"
                    : "hover:bg-white/60 text-slate-700 hover:shadow-lg backdrop-blur-sm"
                    }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className={`p-2 rounded-lg transition-all ${activeTab === item.id
                    ? "bg-white/20"
                    : "bg-slate-100 group-hover:bg-white/80"
                    }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="relative z-10 p-6 md:p-8">
            <button
              onClick={() => logOut()}
              className="group flex items-center gap-4 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-xl shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut size={18} />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 transition-all duration-300">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                {activeTab === "profile" && "Your Profile"}
                {activeTab === "messages" && "Team Messages"}
                {activeTab === "add" && "Share Your Thoughts"}
              </h1>
              <p className="text-slate-600">
                {activeTab === "profile" && "Manage your account settings"}
                {activeTab === "messages" && "Stay connected with your colleagues"}
                {activeTab === "add" && "Express yourself anonymously"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Bell size={20} className="text-slate-600" />
              </button>
              <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Search size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  Profile Information
                </h2>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="relative">
                    <img
                      src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754995784~exp=1754999384~hmac=54b715e4ca614e52464724ca92873e2c65cbc685f1aeb058d0c4283ed1fb5df7&w=1480"
                      alt="Profile"
                      className="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{userName}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center lg:justify-start gap-3 p-4 bg-slate-50/80 rounded-2xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">XYZ</span>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Company</p>
                          <p className="font-semibold text-slate-800">{companyName}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  Messages by Employees
                </h2>

                <div className="space-y-6">
                  {Chats.map((msg, i) => (
                    <div
                      key={i}
                      className="group flex gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 hover:shadow-xl hover:border-white/50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="relative">
                        <img
                          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754995784~exp=1754999384~hmac=54b715e4ca614e52464724ca92873e2c65cbc685f1aeb058d0c4283ed1fb5df7&w=1480"
                          alt="Anonymous"
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                        />
                        {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div> */}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-bold text-slate-800">{msg.randomUsername}</span>
                          <span className="text-slate-500 text-sm font-medium">{msg.handle}</span>
                          <span className="text-slate-400 text-xs bg-slate-100 px-2 py-1 rounded-full"> {timeAgo(msg.createdAt)}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">{msg.content}</p>

                        {/* <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                            <Heart size={16} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Like</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
                            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Reply</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors group">
                            <Share size={16} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add Message */}
          {activeTab === "add" && (
            <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <PlusCircle size={16} className="text-white" />
                  </div>
                  Add New Message
                </h2>

                <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                  <div className="relative">
                    <img
                      src="https://randomuser.me/api/portraits/lego/1.jpg"
                      alt="Anonymous"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
                  </div>



                  <div className="flex-1 w-full">
                    <form onSubmit={handlesubmit} >
                      <textarea
                        value={message}
                        onChange={((e) => setMessages(e.target.value))}
                        placeholder="What's on your mind? Share your thoughts anonymously..."
                        className="w-full border-2 border-slate-200 rounded-2xl p-6 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm placeholder-slate-400 text-slate-700 transition-all duration-300"
                        rows="6"
                      ></textarea>


                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Anonymous Mode
                          </span>
                          <span>{message.length}/500 characters</span>
                        </div>

                        <div className="flex gap-3">

                          <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 transition-all duration-300 font-medium transform hover:scale-105">
                            Post Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          )
          }
        </main >
      </div >
    </>
  );

};

export default UserDashboard;