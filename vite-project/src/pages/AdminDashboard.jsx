import React, { useEffect, useState } from "react";
import { MessageSquare, Key, LogOut, Trash2, Users, Activity, UserPlus, Shield, Bell, Search, BarChart3, TrendingUp, Eye, AlertTriangle, Copy, Check } from "lucide-react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("messages");
    const [copied, setCopied] = useState(false);
    const [secretCode, setCode] = useState(null);
    const [messages, setMessages] = useState([])

    let admin = localStorage.getItem("admin");

    let navigate = useNavigate()

    // console.log(admin)

    if (admin) {
        admin = JSON.parse(admin);
        var id = admin.id
        var orgCode = admin.orgCode
    }


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


    let handleDelete = (id) => {
        if (confirm("Are You Really Want To Delete Thsese Message?")) {
            console.log("delete messages", id)

            handleDelete = async () => {
                try {
                    let response = await axios.post("https://whistlespace-backend.vercel.app/api/admin/deletemessage", {
                        id: id
                    });

                    toast(response.data.messages)

                    console.log(response.data)
                } catch (error) {
                    console.log(error.message)
                }
            }

            handleDelete()
        }
    }


    useEffect(() => {
        let getMessages = async () => {
            try {
                let response = await axios.post("https://whistlespace-backend.vercel.app/api/user/getmessages", {
                    secretKey: orgCode
                })

                // console.log(response.data.data.messages)
                setMessages(response.data.data.messages)


            } catch (error) {
                console.log(error.message)
            }
        }

        getMessages()

    }, [handleDelete])




    let generateCode = async () => {
        try {
            let response = await axios.post("https://whistlespace-backend.vercel.app/api/admin/generatecode", {
                id: id
            })

            console.log(response)


            let generatedcode = response.data.data.code

            setCode(generatedcode)

        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {

        let getSecretCode = async () => {
            try {
                let response = await axios.post("https://whistlespace-backend.vercel.app/api/admin/getcode", {
                    id: id
                })

                let Code = response.data.data.code

                setCode(Code)

            } catch (error) {
                console.log(error.message)
            }
        }

        getSecretCode()




    }, [generateCode])



    const handleLogout = () => {
        navigate("/login")
        localStorage.setItem("admin","")
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(secretCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = secretCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const dummyMessages = [
        {
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "John Doe",
            handle: "@john_doe",
            time: "· 2h",
            text: "Loving the new project management tool! Makes our workflow much smoother.",
        },
        {
            img: "https://randomuser.me/api/portraits/women/65.jpg",
            name: "Emily Smith",
            handle: "@emily_smith",
            time: "· 4h",
            text: "We need to improve cross-department communication for better results.",
        },
        {
            img: "https://randomuser.me/api/portraits/men/18.jpg",
            name: "Michael Brown",
            handle: "@mike_brown",
            time: "· 1d",
            text: "Remote work policy is working great for the whole team!",
        },
        {
            img: "https://randomuser.me/api/portraits/women/42.jpg",
            name: "Sophia Taylor",
            handle: "@sophia_taylor",
            time: "· 2d",
            text: "Can we get more training sessions on the new CRM system?",
        },
    ];

    // Dummy stats
    const stats = {
        totalUsers: 120,
        totalMessages: messages.length,
        activeUsers: 85,
        newUsersToday: 5,
    };

    const menuItems = [
        { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
        { id: "secret", label: "Secret Code", icon: <Key size={18} /> },
        { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    ];

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
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Admin Panel
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">Manage your organization</p>
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
                            onClick={handleLogout}
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
                                {activeTab === "messages" && "All Messages"}
                                {activeTab === "secret" && "Secret Code Management"}
                                {activeTab === "analytics" && "Analytics Overview"}
                            </h1>
                            <p className="text-slate-600">
                                {activeTab === "messages" && "Monitor and moderate platform messages"}
                                {activeTab === "secret" && "Generate and manage access codes"}
                                {activeTab === "analytics" && "Platform insights and statistics"}
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

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <Users size={24} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Total Users</p>
                                    <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
                                </div>
                            </div>
                        </div> */}

                        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                    <MessageSquare size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Total Messages</p>
                                    <p className="text-2xl font-bold text-slate-800">{stats.totalMessages}</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                                    <Activity size={24} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Active Users</p>
                                    <p className="text-2xl font-bold text-slate-800">{stats.activeUsers}</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                                    <UserPlus size={24} className="text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">New Users Today</p>
                                    <p className="text-2xl font-bold text-slate-800">{stats.newUsersToday}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Messages Tab */}
                    {activeTab === "messages" && (
                        <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <MessageSquare size={16} className="text-white" />
                                    </div>
                                    Company Messages
                                </h2>

                                <div className="space-y-6">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className="group flex gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 hover:shadow-xl hover:border-white/50 transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            <div className="relative">
                                                <img
                                                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754995784~exp=1754999384~hmac=54b715e4ca614e52464724ca92873e2c65cbc685f1aeb058d0c4283ed1fb5df7&w=1480"
                                                    alt={msg.name}
                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                                                />

                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span className="font-bold text-slate-800">{msg.randomUsername}</span>
                                                    <span className="text-slate-500 text-sm font-medium">{msg.handle}</span>
                                                    <span className="text-slate-400 text-xs bg-slate-100 px-2 py-1 rounded-full">{timeAgo(msg.createdAt)}</span>
                                                </div>
                                                <p className="text-slate-700 leading-relaxed mb-4">{msg.content}</p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6">


                                                    </div>

                                                    <button onClick={() => { handleDelete(msg._id) }} className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                                                        <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Secret Code Tab */}
                    {activeTab === "secret" && (
                        <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-yellow-100/50 to-transparent rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-100/50 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                        <Key size={16} className="text-white" />
                                    </div>
                                    Secret Code Management
                                </h2>

                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="relative group">
                                        <div className="text-4xl font-mono bg-slate-100/80 backdrop-blur-sm px-8 py-6 rounded-2xl border-2 border-slate-200 shadow-inner flex items-center justify-between">
                                            <span>{secretCode}</span>
                                            <button
                                                onClick={handleCopyCode}
                                                className="ml-4 p-2 hover:bg-slate-200/60 rounded-lg transition-all duration-200 opacity-60 group-hover:opacity-100"
                                                title="Copy code"
                                            >
                                                {copied ? (
                                                    <Check size={20} className="text-green-600" />
                                                ) : (
                                                    <Copy size={20} className="text-slate-600" />
                                                )}
                                            </button>
                                        </div>
                                        {copied && (
                                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
                                                Copied!
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "⚠️ Warning: If you generate a new code, all users related to the old code will become inactive. Do you want to continue?"
                                                )
                                            ) {
                                                generateCode()
                                            }
                                        }}
                                        className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-2xl hover:from-yellow-700 hover:to-orange-700 shadow-xl shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 font-medium"
                                    >
                                        Generate New Code
                                    </button>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Share this code with users to allow them access to the platform.
                                        Generate a new code to revoke access for all current users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && (
                        <div className="space-y-8">
                            {/* Chart Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                                <TrendingUp size={14} className="text-white" />
                                            </div>
                                            User Growth
                                        </h3>
                                        <div className="h-48 bg-slate-50/50 rounded-2xl flex items-center justify-center">
                                            <p className="text-slate-400">Chart visualization would go here</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/30 to-transparent rounded-full blur-2xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                                <BarChart3 size={14} className="text-white" />
                                            </div>
                                            Message Activity
                                        </h3>
                                        <div className="h-48 bg-slate-50/50 rounded-2xl flex items-center justify-center">
                                            <p className="text-slate-400">Chart visualization would go here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {[
                                            { action: "New user registered", time: "2 minutes ago", type: "success" },
                                            { action: "Message reported", time: "15 minutes ago", type: "warning" },
                                            { action: "Code regenerated", time: "1 hour ago", type: "info" },
                                            { action: "User blocked", time: "2 hours ago", type: "error" },
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl">
                                                <div className={`w-3 h-3 rounded-full ${activity.type === "success" ? "bg-green-400" :
                                                    activity.type === "warning" ? "bg-yellow-400" :
                                                        activity.type === "error" ? "bg-red-400" : "bg-blue-400"
                                                    }`}></div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-800">{activity.action}</p>
                                                    <p className="text-sm text-slate-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );

};

export default AdminDashboard;