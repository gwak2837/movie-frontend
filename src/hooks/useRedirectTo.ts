import { useRouter } from 'next/router'
import { useEffect } from 'react'

function useRedirectTo(url: string, condition: boolean) {
  const router = useRouter()

  useEffect(() => {
    if (condition) {
      router.replace(url)
    }
  }, [router, condition, url])
}

export default useRedirectTo
