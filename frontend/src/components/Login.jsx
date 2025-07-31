import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const onSubmit = (data) => {
        AxiosInstance.post('users/login/', {
            email: data.email,
            password: data.password,
        })
        .then((response) => {
            const { user, token } = response.data;
            authLogin({...user, token});
            navigate('/home');
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                if (typeof error.response.data.error === 'string') {
                    setErrorMessage(error.response.data.error);
                } else if (typeof error.response.data.error === 'object') {
                    const errorMessages = Object.values(error.response.data.error).flat();
                    setErrorMessage(errorMessages.join(' '));
                } else {
                    setErrorMessage("An unexpected error occurred during login.");
                }
            } else if (error.message) {
                setErrorMessage(`Network or server error: ${error.message}`);
            } else {
                setErrorMessage("An unknown error occurred. Please try again.");
            }
        });
    };

    return (
        <div className="bg-[rgb(6,11,34)] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-lg mx-auto bg-[rgb(11,17,45)] rounded-2xl shadow-lg p-8 border border-[rgb(223,198,103)]">
                <h2 className="text-3xl font-bold text-[rgb(223,198,103)] text-center mb-8">Login</h2>
                <p className="text-center text-lg text-gray-300 mb-6">
                    Welcome back to Lumina Reality! Dive into thousands of property listings tailored to your needs, 
                    whether you're looking to buy or rent.
                </p>
                {errorMessage && <p className="text-red-500 bg-red-100 p-2 rounded mt-4 mb-4">{errorMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[rgb(223,198,103)]">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            {...register("email")}
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[rgb(223,198,103)]">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            {...register("password")}
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                            placeholder="**********"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-transparent text-[rgb(223,198,103)] font-semibold rounded-lg px-5 py-3 transition-all duration-150 hover:bg-[rgb(223,198,103)] hover:text-[rgb(6,11,34)] border-2 border-[rgb(223,198,103)] focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/register" href="/register" className="font-semibold text-[rgb(223,198,103)] hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
