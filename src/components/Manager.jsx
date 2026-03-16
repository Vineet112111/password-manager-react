import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const saveref = useRef();

    const [form, setform] = useState({
        website: "",
        username: "",
        password: ""
    });

    const [passwords, setpasswords] = useState([]);
    const [editId, seteditId] = useState()
    const [search, setsearch] = useState("");

    useEffect(() => {
        let temppasswords = localStorage.getItem("passwords");
        if (temppasswords) {
            try {
                const parsed = JSON.parse(temppasswords);
                if (Array.isArray(parsed)) {
                    setpasswords(parsed);
                } else {
                    setpasswords([]); // fallback if not array
                }
            } catch (e) {
                console.error("Error parsing passwords:", e);
                setpasswords([]); // fallback if corrupted
            }
        }
    }, []);



    const handleInput = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = () => {
        if (editId) {
            const updatedPasswords = passwords.map(item =>
                item.id === editId ? { ...form, id: editId } : item
            );
            setpasswords(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setform({ website: "", username: "", password: "" });
            seteditId(null);

            toast("✏️ Password updated successfully!", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });
        } else {
            const newEntry = { ...form, id: uuidv4() };
            const newPasswords = [...passwords, newEntry];
            setpasswords(newPasswords);
            localStorage.setItem("passwords", JSON.stringify(newPasswords));
            setform({ website: "", username: "", password: "" });

            toast("🔐 Your secrets are safe with us!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
            });
        }
    };

    const deletePassword = (id) => {
        let conf = confirm("😬 Once gone, it's gone. Really delete this password?");
        if (conf) {
            const newPasswords = passwords.filter((item) => item.id !== id);
            setpasswords(newPasswords);
            localStorage.setItem("passwords", JSON.stringify(newPasswords));

            toast("🗑️ Password deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    };

    const editPassword = (id) => {
        const selected = passwords.find((item) => item.id === id);
        if (selected) {
            setform({
                website: selected.website,
                username: selected.username,
                password: selected.password
            });
            seteditId(id);
        }
    };

    const showPassword = () => {

        if (ref.current.src.includes('icons/hidden.png')) {
            ref.current.src = 'icons/eye.png';
            passwordref.current.type = "password";

        } else {

            ref.current.src = 'icons/hidden.png';
            passwordref.current.type = "text";

        }
    };

    const copyText = (data) => {
        navigator.clipboard.writeText(data)
            .then(() => {
                toast("Copied faster than your WiFi ⚡", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    const filteredPasswords = passwords.filter((item) =>
        item.website.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <div className="-z-10 fixed inset-0 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className='md:mycontainer text-center py-24 px-15 min-h-screen'>
                <h1 className='text-2xl md:text-4xl text-white font-bold'>
                    <span className='text-green-600'>&lt;</span>
                    <span className='hover:text-green-600'>Password</span>
                    <span className='text-green-600 hover:text-white'>Manager/&gt;</span>
                </h1>

                <p className='text-green-600 text-center text-lg mb-10'>
                    Your own password manager
                </p>

                <div className='text-white flex gap-8   flex-col items-center p-4'>
                    <input
                        className='rounded-full border border-green-500 w-full text-black px-4 py-1'
                        value={form.website}
                        onChange={handleInput}
                        name='website'
                        type="text"
                        placeholder='Enter Website URL'
                    />

                    <div className='flex w-full flex-col sm:flex-row gap-5 justify-between'>
                        <input
                            type="text"
                            className='rounded-full border border-green-500 w-full text-black px-4 py-1'
                            placeholder='Enter Username'
                            onChange={handleInput}
                            name='username'
                            value={form.username}
                        />

                        <div className="relative w-full">
                            <input
                                ref={passwordref}
                                type="password"
                                className='rounded-full border border-green-500 w-full text-black px-4 py-1'
                                placeholder='Enter Password'
                                name='password'
                                onChange={handleInput}
                                value={form.password}
                            />
                            <span className='absolute right-0 top-0' onClick={showPassword}>
                                <img
                                    ref={ref}
                                    className='p-2 cursor-pointer'
                                    src="icons/eye.png"
                                    alt="eye"
                                    width={35}
                                />
                            </span>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            if (form.website && form.username && form.password) {
                                savePassword();
                            } else {
                                toast.error("⚠️ Please fill in all fields before saving!");
                            }
                        }}
                        className={`flex justify-center items-center gap-3 rounded-full w-fit text-white px-3 border-2 border-green-800
    ${form.website && form.username && form.password
                                ? "bg-green-600 hover:bg-green-500 cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"}`}
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="boomerang"
                            stroke="bold"
                            colors="primary:#e4e4e4,secondary:#ffffff"
                        />
                        {editId ? "Update Password" : "Save Password"}
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Search website or username..."
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className="mb-5 px-4 py-2 rounded-full border border-green-500 text-black w-full"
                />

                <div className="overflow-x-auto mt-10">
                    {passwords.length === 0 && (
                        <div className="text-center mt-10 animate-pulse">
                            <h2 className="text-white text-2xl font-bold font-serif tracking-wider bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                                No password saved yet... 💡
                            </h2>
                            <p className="text-sm text-gray-300 italic mt-2">
                                Start securing your data by adding your first password above!
                            </p>
                        </div>
                    )}

                    {filteredPasswords.length !== 0 &&
                        <table className="table-auto w-full  border border-green-600 text-white">
                            <thead className="bg-green-800">
                                <tr>
                                    <th className="border border-green-500 px-4 py-2">Website </th>
                                    <th className="border border-green-500 px-4 py-2">Username</th>
                                    <th className="border border-green-500 px-4 py-2">Password</th>
                                    <th className="border border-green-500 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPasswords.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border border-green-500 px-4 py-2">
                                            <div className="copy flex flex-row gap-5 justify-center items-center">
                                                <a href={item.website} target='_blank'>{item.website} </a>
                                                <span className="">
                                                    <img onClick={() => copyText(item.website)} className='w-5 invert cursor-pointer hover:invert-0' src="/icons/copy.png" alt="" />
                                                </span>
                                            </div>

                                        </td>
                                        <td className="border border-green-500 px-4 py-2">
                                            <div className="copy flex flex-row gap-5 justify-center">
                                                <a href={item.website} target='_blank'>{item.username} </a>
                                                <span className="">
                                                    <img onClick={() => copyText(item.username)} className='w-5 invert cursor-pointer hover:invert-0' src="/icons/copy.png" alt="" /></span>
                                            </div></td>
                                        <td className="border border-green-500 px-4 py-2">
                                            <div className="copy flex flex-row gap-5 justify-center">
                                                <a href={item.website} target='_blank'>{item.password} </a>
                                                <span className="">
                                                    <img onClick={() => copyText(item.password)} className='w-5 invert cursor-pointer hover:invert-0' src="/icons/copy.png" alt="copy" /></span>
                                            </div></td>
                                        <td className="border border-green-500 px-4 py-2">
                                            <div className="actions flex gap-3 justify-center items-center">
                                                <span className="">
                                                    <img onClick={() => editPassword(item.id)} className='w-5 invert cursor-pointer hover:invert-0' src="/icons/edit-text.png" alt="delete" /></span>
                                                <span className="">
                                                    <img onClick={() => deletePassword(item.id)} className='w-5 invert cursor-pointer hover:invert-0' src="/icons/bin.png" alt="delete" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div >
        </>
    );
};

export default Manager;
