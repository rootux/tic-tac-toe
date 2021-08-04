import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { login } from '../../shared/auth'
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

interface FormInputs {
  email: string
}

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  })
  const history = useHistory();
  const onSubmit = async (data: FormInputs) => {
    const result = await login(data.email)
    if(result.success) {
      history.push("/game");
    }
    console.log(result)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="submit" />
    </form>
  )
}

export default Signup
