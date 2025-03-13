import Footer from './Footer';
import Property from './Property';

const Home = () => {
    return (
        <div>
            <div className="bg-slate-900">
                <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
                        <div className="max-w-3xl text-center mx-auto">
                            <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                Atteindre ses rêves en réalisant ses projets
                            </h1>
                        </div>
                        <div className="max-w-3xl text-center mx-auto">
                            <p className="text-lg text-gray-400">Trouvez-votre maison, appartement idéal</p>
                        </div>
                        <div className="pb-2 sm:pb-0 sm:flex-[1_0_0%]">
                        </div>
                        <div className="text-center">
                            <form className="max-w-md mx-auto">   
                                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" 
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500" placeholder="Entrer une ville, un code postale" required />
                                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rechercher</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-red-500">
                <Property />
            </div>
            <Footer />
        </div>

    )
}

export default Home