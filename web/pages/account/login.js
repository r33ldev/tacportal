import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Formik, Form } from "formik";
import { useLoginMutation } from '../../generated/graphql.js'
// layout for page

import Auth from "layouts/Auth.js";
import { InputField } from 'components/Utils/InputField.js';
import { toErrorMap } from 'components/Utils/ToErrorMap.js';

export default function Login() {
  const router = useRouter()
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [login] = useLoginMutation()
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/fb.png" />
                    Facebook
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <Formik
                  initialValues={{ usernameOrEmail, password }}
                  enableReinitialize
                  onSubmit={async (values, { setErrors }) => {
                    setPwdError(false)
                    setUsernameError(false)
                    const response = await login({
                      variables: { options: values }
                    })
                    let errors
                    if (response?.data?.login.errors) {
                      errors = toErrorMap(response.data.login.errors)
                      if ('usernameOrEmail' in errors) {
                        setUsernameError(true)
                      } else if ('password' in errors) {
                        setPwdError(true)
                      }
                    } else if (response?.data?.login.student) {
                      if (typeof router.query.next === "string") {
                        router.push(router.query.next);
                      } else {
                        // worked
                        router.push("/");
                      }
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form  >

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email or Username
                        </label>
                        <InputField
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Username"
                          required
                          name='usernameOrEmail'
                          onChange={e => setUsernameOrEmail(e.target.value)}
                        />
                        {usernameError && <p className='text-red-500 text-sm mt-2'>
                          This username or email cannot be found {'  '}
                          <i className='text-red-500  fas fa-exclamation ' />
                        </p>}
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <InputField
                          type="password" required
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          name='password'
                          onChange={e => setPassword(e.target.value)}
                        />
                        {pwdError && <p className='text-red-500 text-sm mt-2'>
                          Check your password and try again {'  '}
                          <i className='text-red-500  fas fa-exclamation ' />
                        </p>}
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">

                <a
                  href='/account/forget-password'
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>

              </div>
              <div className="w-1/2 text-right">

                <a href='/account/enrol' className="text-blueGray-200">
                  <small>New here? click to enrol</small>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
