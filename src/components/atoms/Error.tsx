import { Result } from 'antd'
import { memo } from 'react'

function Error() {
  return <Result status="warning" title="There are some problems." />
}

export default memo(Error)
