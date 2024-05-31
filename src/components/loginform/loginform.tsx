"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../../lib/features/todos/loginslicer';
import { RootState, AppDispatch } from '../../lib/store';
import { login } from '../../lib/features/todos/loginslicer';

type LoginSignFormProps = {
    foo: string;
  };


const LoginSignForm: React.FC<LoginSignFormProps> = ({ foo }) => {
    //setar e declarar valors do form
    const dispatch: AppDispatch = useDispatch();
    const username = useSelector((state: RootState) => state.login.username);
    const password = useSelector((state: RootState) => state.login.password);
    const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
    const router = useRouter();


    //se o usuario ja estiver logado redireciona para a pagina privada
    useEffect(() => {
        if (isAuthenticated) {
          router.push('/privaterouter');
        }
      }, [isAuthenticated]);

      //pega valores do form
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername(event.target.value));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login({ username, password }));
      };
      
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-white tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-white text-sm font-medium leading-6 text-gray-900">
                Username address
              </label>
              <div className="mt-2">
                <input
                value={username} onChange={handleUsernameChange}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-white text-sm font-medium leading-6 text-gray-900" >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                value={password} onChange={handlePasswordChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

        </div>
      </div>
    );
};

export default LoginSignForm;