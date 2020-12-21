import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons'
import { ErrorMessage } from '@hookform/error-message'
import { Input, Button } from 'antd'
import Inko from 'inko'
import React, { useCallback, useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AuthenticationContext } from 'src/components/contexts/AuthenticationProvider'
import { LoginMutationVariables, useLoginMutation } from 'src/graphql/generated/types-and-hooks'
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

const PASSWORD_INPUT_ICONS = [
  <UnlockTwoTone key={1} style={{ fontSize: '1.2rem' }} twoToneColor="#c4801a" />,
  <LockTwoTone key={2} style={{ fontSize: '1.2rem' }} twoToneColor="#52c41a" />,
]

export function renderPasswordInputIcon(visible: boolean) {
  return visible ? PASSWORD_INPUT_ICONS[0] : PASSWORD_INPUT_ICONS[1]
}

function LoginForm() {
  const { refetch } = useContext(AuthenticationContext)

  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login) {
        refetch()
        localStorage.setItem('token', data.login.token)
        showSuccessMessage('로그인에 성공했습니다.')
      } else {
        showWarningMessage('아이디 또는 비밀번호를 잘못 입력했습니다.')
      }
    },
    onError: handleApolloError,
  })

  const { control, errors, handleSubmit } = useForm<LoginMutationVariables>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = useCallback<SubmitHandler<LoginMutationVariables>>(
    ({ email, password }) => {
      login({
        variables: { email, password: new Inko().ko2en(password) },
      })
    },
    [login]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridContainer>
        <label htmlFor="email">
          이메일
          <Controller
            as={<Input />}
            control={control}
            disabled={loading}
            name="email"
            rules={validateEmail}
            placeholder="이메일을 입력해주세요"
            size="large"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <RedText>{message}</RedText>}
          />
        </label>

        <label htmlFor="password">
          비밀번호
          <Controller
            as={<Input.Password />}
            control={control}
            disabled={loading}
            iconRender={renderPasswordInputIcon}
            name="password"
            rules={validatePassword}
            placeholder="비밀번호를 5글자 이상 입력해주세요"
            size="large"
            type="password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <RedText>{message}</RedText>}
          />
        </label>

        <Button disabled={loading} htmlType="submit" size="large" type="primary">
          로그인
        </Button>
      </GridContainer>
    </form>
  )
}

export default LoginForm
