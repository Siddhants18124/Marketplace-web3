import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log("Form Data:", {
            email,
            password,
        });

        if (!email || !password) {
            console.error("Email and password are required");
            return;
        }

        const loginData = {
            email,
            password,
        };

        // Replace the URL with your actual login API endpoint
        fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Failed to login');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                navigate('/home');
                // Handle successful login, such as redirecting to another page
            })
            .catch(error => {
                console.error(error);
                // Handle login error
            });
    };

    return (
        <section className="bg-custom1 text-custom4 dark:bg-[#222831]">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1448152453/vector/big-data-technology-and-data-science-illustration-data-flow-concept-querying-analysing.jpg?s=612x612&w=0&k=20&c=To0lhCrVmDYdSkOUOGxGsjlYe0buj_wwGCDqYhF9p2o=')` }}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-custom3 capitalize dark:text-white">
                            Welcome back!
                        </h1>

                        <p className="mt-4  text-custom4 dark:text-gray-400">
                            Log in to your account to continue.
                        </p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-custom4 dark:text-gray-200">Email Id</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" className="block w-full px-5 py-3 mt-2 text-custom4 placeholder-gray-400 bg-custom2 border border-custom3 rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-custom4 dark:text-gray-200">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-custom4 placeholder-gray-400 bg-custom2 border border-custom3 rounded-lg dark:placeholder-gray-600 dark:bg-transparent dark:text-gray-300 dark:border-white focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <button type="submit" className="w-[10rem] px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00ADB5]  rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" onClick={navigate('/home')}>
                                Login
                            </button>

                            <br />
                            <p className="mt-4 text-sm text-custom4 dark:text-gray-300">
                                Do not have an account? <a href="#" className="text-[#00ADB5] focus:outline-none focus:underline hover:underline">Sign Up</a>.
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
