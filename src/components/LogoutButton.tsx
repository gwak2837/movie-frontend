import { Button } from 'antd'
import { useCallback } from 'react'
import { useLogoutMutation } from 'src/graphql/generated/types-and-hooks'
import { showSuccessMessage, showWarningMessage } from 'src/utils/antDesign'
import { handleApolloError } from 'src/utils/apollo'

// 로그아웃 버튼을 클릭하면 로그아웃 뮤테이션을 요청한다.
function LogoutButton() {
  const [logout] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout) {
        localStorage.removeItem('token')
        showSuccessMessage('로그아웃에 성공했습니다')
      } else {
        showWarningMessage('로그아웃에 실패했습니다')
      }
    },
    onError: handleApolloError,
  })

  // 로그아웃 버튼을 클릭하면 로그아웃 뮤테이션을 요청한다.
  const handleClick = useCallback(() => {
    logout()
  }, [logout])

  return <Button onClick={handleClick}>로그아웃</Button>
}

export default LogoutButton
