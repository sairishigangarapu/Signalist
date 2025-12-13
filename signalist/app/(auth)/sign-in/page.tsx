'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import InputField from '@/components/Forms/InputField';
import FooterLink from '@/components/Forms/FooterLink';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="form-title">
        Sign In
      </h1>
      <InputField
        name='email'
        label="Email"
        placeholder="mail@mail.com"
        register={register}
        error={errors.email}
        validation={{
          required: 'Email required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address'
          }
        }}
      />
      <InputField
        name='password'
        label="Password"
        placeholder="Enter Your Password"
        type='password'
        register={register}
        error={errors.password}
        validation={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
      />
      <button type="submit" className="yellow-btn w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
      <FooterLink text="Don't have an account?" linkText="Sign Up" href="/sign-up" />
    </form>
  )
}

export default SignIn
