import { ErrorMessage } from '@hookform/error-message'
import { Input, Button } from 'antd'
import Inko from 'inko'
import { useCallback, useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AuthenticationContext } from 'src/components/contexts/AuthenticationProvider'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import { LoginMutationVariables, useLoginMutation } from 'src/graphql/generated/types-and-hooks'
import useRedirectTo from 'src/hooks/useRedirectTo'
import { showSuccessMessage, showWarningMessage } from 'src/utils/antDesign'
import { handleApolloError } from 'src/utils/apollo'
import { GridContainer, RedText, validateEmail, validatePassword } from '../register'

function LoginPage() {
  const { user, refetch } = useContext(AuthenticationContext)

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

  useRedirectTo('/', Boolean(user))

  return (
    <PageTitle title="Movie App - Login">
      <PageLayout>
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
                as={<Input />}
                control={control}
                disabled={loading}
                name="password"
                rules={validatePassword}
                placeholder="비밀번호를 5글자 이상 입력해주세요"
                type="password"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <RedText>{message}</RedText>}
              />
            </label>

            <Button disabled={loading} htmlType="submit" type="primary">
              로그인
            </Button>
          </GridContainer>
        </form>
      </PageLayout>
    </PageTitle>
  )
}

export default LoginPage
