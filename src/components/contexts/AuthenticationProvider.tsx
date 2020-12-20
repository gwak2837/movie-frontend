import { ApolloQueryResult } from '@apollo/client'
import { createContext, ReactNode, useMemo } from 'react'
import { MeQuery, MeQueryVariables, useMeQuery } from 'src/graphql/generated/types-and-hooks'

export enum LOGIN_STATUS {}

type Values = {
  user: MeQuery['me'] | undefined
  refetch: (variables?: Partial<MeQueryVariables>) => Promise<ApolloQueryResult<MeQuery>>
}

/**
 * user - undefined면 로딩 중, 객체면 로그인 상태, null이면 비로그인 상태
 *
 * refetch - 서버로 Query 재요청 후 캐시 갱신
 */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthenticationContext = createContext<Values>(undefined!)

type Props = {
  children: ReactNode
}

function AuthenticationProvider({ children }: Props) {
  const { data, error, networkStatus, refetch } = useMeQuery({ errorPolicy: 'all' })

  const loading = networkStatus < 7

  const value = useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: loading ? undefined : error ? null : data!.me,
      refetch,
    }),
    [data, error, loading, refetch]
  )

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationProvider
