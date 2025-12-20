'use client'
import InputField from '@/components/Forms/InputField';
import SelectField from '@/components/Forms/SelectField';
import { Button } from '@/components/ui/button';
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants';
import { useForm, SubmitHandler } from "react-hook-form"
import CountrySelectField from '@/components/Forms/CountrySelectField';
import FooterLink from '@/components/Forms/FooterLink';
import {signUpWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

function SignUp() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: 'Growth',
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },

    mode: 'onBlur'
  });


  const onSubmit = async (data: SignUpFormData) => {
    try{
      const result = await signUpWithEmail(data);
      if(result.success) router.push('/');
    }catch(e){
      console.error(e);
      toast.error('Sign up failed', {
        description: e instanceof Error ? e.message : 'Failed to create an account.'
      })
    }
  }
  
  return (
    <>
      <h1 className = "form-title">
        Sign Up and Personalize
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField 
        name = 'fullName'
        label = "Full Name"
        placeholder = "John Doe"
        register = {register}
        error = {errors.fullName}
        validation = {{required:'Full name is required',minLenth : 2}}
        />
        <InputField 
        name = 'email'
        label = "Email"
        placeholder = "mail@mail.com"
        register = {register}
        error = {errors.email}
        validation = {{
          required: 'Email required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address'
          }
        }}
        />
        <InputField 
        name = 'password'
        label = "Password"
        placeholder = "Enter A Strong Password"
        type = 'password'
        register = {register}
        error = {errors.password}
        validation = {{required:'Password is required',minLenth : 8}}
        />

        <CountrySelectField
        name="country"
        label="Country"
        control={control}
        error={errors.country}
        required={true}
        />

        <SelectField
        name = 'investmentGoals'
        label = "Investment Goals"
        placeholder = "Select your investment goal"
        options = {INVESTMENT_GOALS}
        control = {control}
        error = {errors.investmentGoals}
        required 
        />
        <SelectField
        name = 'riskTolerance'
        label = "Risk Tolerance"
        placeholder = "Select your Risk Level"
        options = {RISK_TOLERANCE_OPTIONS}
        control = {control}
        error = {errors.riskTolerance}
        required 
        />
        <SelectField
        name = 'preferredIndustry'
        label = "Preferred Industry"
        placeholder = "Select your preferred Industry"
        options = {PREFERRED_INDUSTRIES}
        control = {control}
        error = {errors.preferredIndustry}
        required 
        />
        <Button type = 'submit' disabled={isSubmitting} className = "yellow-btn w-full mt-5">
          {isSubmitting ? 'CreatingAccount': 'Start Your investing Journey'}
        </Button>
        <FooterLink
        text = "Already Have an Account ?"
        linkText='Sign In Here'
        href = "/sign-in"
        />
      </form>
    </>
  )
}

export default SignUp
