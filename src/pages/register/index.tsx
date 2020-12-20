import { ErrorMessage } from '@hookform/error-message'
import { Button, Input } from 'antd'
import Inko from 'inko'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import {
  RegisterMutationVariables,
  useRegisterMutation,
} from 'src/graphql/generated/types-and-hooks'
import { showSuccessMessage, showWarningMessage } from 'src/utils/antDesign'
import { handleApolloError } from 'src/utils/apollo'
import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 400px);
  justify-content: center;
  gap: 2rem;
`

export const RedText = styled.p`
  margin: 0.4rem 0;
  font-size: 0.8rem;
  color: #800000;
`

const RedSpan = styled.span`
  color: #ff3838;
`

export const validateEmail = {
  required: '필수 항목입니다',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일 형식에 맞게 입력해주세요',
  },
}

export const validatePassword = {
  required: '필수 항목입니다',
  minLength: {
    value: 5,
    message: '최소 5글자 이상 입력해주세요',
  },
}

const validateName = {
  required: '필수 항목입니다',
}

function RegisterPage() {
  const [register, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      if (data.register) {
        showSuccessMessage('회원가입에 성공했습니다.')
      } else {
        showWarningMessage('이미 존재하는 이메일입니다.')
      }
    },
    onError: handleApolloError,
  })

  const { control, errors, handleSubmit } = useForm({
    defaultValues: { email: '', password: '', name: '' },
  })

  const onSubmit = useCallback<SubmitHandler<RegisterMutationVariables>>(
    ({ email, password, name }) => {
      register({
        variables: { email, password: new Inko().ko2en(password), name },
      })
    },
    [register]
  )

  return (
    <PageTitle title="Movie App - Register">
      <PageLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridContainer>
            <label htmlFor="email">
              이메일 <RedSpan>*</RedSpan>
              <Controller
                as={<Input />}
                control={control}
                disabled={loading}
                name="email"
                rules={validateEmail}
                placeholder="이메일을 입력해주세요"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <RedText>{message}</RedText>}
              />
            </label>

            <label htmlFor="password">
              비밀번호 <RedSpan>*</RedSpan>
              <Controller
                as={<Input />}
                control={control}
                disabled={loading}
                name="password"
                rules={validatePassword}
                placeholder="비밀번호를 최소 5글자 이상 입력해주세요"
                type="password"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <RedText>{message}</RedText>}
              />
            </label>

            <label htmlFor="name">
              이름 <RedSpan>*</RedSpan>
              <Controller
                as={<Input />}
                control={control}
                disabled={loading}
                name="name"
                rules={validateName}
                placeholder="이름을 입력해주세요"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <RedText>{message}</RedText>}
              />
            </label>

            <Button disabled={loading} htmlType="submit" type="primary">
              회원가입
            </Button>
          </GridContainer>
        </form>
      </PageLayout>
    </PageTitle>
  )
}

export default RegisterPage
