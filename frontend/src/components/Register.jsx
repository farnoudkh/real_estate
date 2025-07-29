import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        AxiosInstance.post(`api/users/register/`, {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            password: data.password,
        })
        .then(() => {
            navigate(`/login`);
        })
        .catch((error) => {
            setErrorMessage(error.response.data.error);
        });
    };

    return (
        <div className="bg-[rgb(6,11,34)] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-lg mx-auto bg-[rgb(11,17,45)] rounded-2xl shadow-lg p-8 border border-[rgb(223,198,103)]">
                <h2 className="text-3xl font-bold text-[rgb(223,198,103)] text-center mb-8">Create an Account</h2>
                {errorMessage && <p className="text-red-500 bg-red-100 p-2 rounded mt-4">{errorMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-[rgb(223,198,103)]">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            required
                            {...register("last_name")}
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                            placeholder="Smith"
                        />
                    </div>

                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-[rgb(223,198,103)]">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            required
                            {...register("first_name")}
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                            placeholder="John"
                        />
                    </div>

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
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-[rgb(223,198,103)]">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            required
                            {...register("password")}
                            className="mt-1 w-full rounded-lg border border-gray-600 bg-[rgb(6,11,34)] px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                            placeholder="**********"
                        />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                aria-describedby="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(223,198,103)] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[rgb(223,198,103)] dark:ring-offset-gray-800"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                I agree to the{' '}
                                <a href="#" className="font-medium text-[rgb(223,198,103)] hover:underline dark:text-[rgb(223,198,103)]">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-transparent text-[rgb(223,198,103)] font-semibold rounded-lg px-5 py-3 transition-all duration-150 hover:bg-[rgb(223,198,103)] hover:text-[rgb(6,11,34)] border-2 border-[rgb(223,198,103)] focus:ring-2 focus:ring-[rgb(223,198,103)] focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-[rgb(223,198,103)] hover:underline">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
