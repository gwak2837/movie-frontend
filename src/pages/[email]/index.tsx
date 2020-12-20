import React from 'react'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import useAuthentication from 'src/hooks/useAuthentication'

function MyPage() {
  const { user } = useAuthentication()
  return (
    <PageTitle title="Movie App - My Page">
      <PageLayout>
        {user && (
          <>
            <div>{`id ${user.id}`}</div>
            <div>{`이메일 ${user.email}`}</div>
            <div>{`이름 ${user.name}`}</div>
            <div>{`역할 ${user.role}`}</div>
          </>
        )}
      </PageLayout>
    </PageTitle>
  )
}

export default MyPage
