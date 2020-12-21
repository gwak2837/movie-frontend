import { ErrorMessage } from '@hookform/error-message'
import { Button, Input } from 'antd'
import Inko from 'inko'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  GridContainer,
  RedText,
  renderPasswordInputIcon,
  validateEmail,
  validatePassword,
} from 'src/components/LoginForm'
import {
  RegisterMutationVariables,
  useRegisterMutation,
} from 'src/graphql/generated/types-and-hooks'
import { showSuccessMessage, showWarningMessage } from 'src/utils/antDesign'
import { handleApolloError } from 'src/utils/apollo'
import styled from 'styled-components'

const RedSpan = styled.span`
  color: #ff3838;
`

const validateName = {
  required: '필수 항목입니다',
}

function RegisterForm() {
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
            size="large"
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

        <label htmlFor="name">
          이름 <RedSpan>*</RedSpan>
          <Controller
            as={<Input />}
            control={control}
            disabled={loading}
            name="name"
            rules={validateName}
            placeholder="이름을 입력해주세요"
            size="large"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <RedText>{message}</RedText>}
          />
        </label>

        <Button disabled={loading} htmlType="submit" size="large" type="primary">
          회원가입
        </Button>
      </GridContainer>
    </form>
  )
}

export default RegisterForm
