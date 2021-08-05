import React from 'react'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { login } from '../../shared/auth'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

interface FormInputs {
  email: string
}

const Wrapper = styled.div`
  margin: 2em;
`

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  })
  const history = useHistory()
  const onSubmit = async (data: FormInputs) => {
    const result = await login(data.email)
    if(result.success) {
      history.push("/")
    }
  }
  return (
    <Wrapper>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        Email: <input {...register("email")} />
        <p>{errors.email?.message}</p>
        <input type="submit" />
      </form>
    </Wrapper>
  )
}

export default Signup
