import AxiosInstance from "./AxiosInstance";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register } = useForm();
 
  const navigate = useNavigate();

  const onSubmit = (data) => {
    AxiosInstance.post(`api/users/login/`, {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem('Token', response.data.token)
      navigate(`/home`);
    })
    .catch((error) => {
        setErrorMessage(error.response.data.error);
    });
  };
  return (
    <div class="font-[sans-serif] text-[#333]">
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div class="max-md:text-center">
            <h2 class="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
              Rejoingez EasyHome
            </h2>
            <p class="text-sm mt-6">Plongez-vous dans plusieurs annonces de maison, d'appartement et celà, en fonction de votre projet !</p>
            <p class="text-sm mt-10">Vous n'avez pas de compte ? <a href="/register" class="text-blue-600 font-semibold hover:underline ml-1">S'inscrire</a></p>
          </div>
          <form class="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && <p className="text-red-500 bg-red-100 p-2 rounded">{errorMessage}</p>}
            <h3 class="text-3xl font-extrabold mb-8 max-md:text-center">
              Connexion
            </h3>
            <div>
              <input name="email" type="email" autocomplete="email" required {...register("email")} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Adresse mail" />
            </div>
            <div>
              <input name="password" type="password" autocomplete="current-password" required {...register("password")} className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Mot de passe" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" className="ml-3 block text-sm">
                  Se souvenir de moi
                </label>
              </div>
              <div class="text-sm">
                <a href="jajvascript:void(0);" className="text-blue-600 hover:text-blue-500">
                  Mot de passe oublé ?
                </a>
              </div>
            </div>
            <div class="!mt-10">
              <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }

export default Login
