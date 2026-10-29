import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AuthContext, authApi } from './AuthContext'

const USER_KEY = 'avenza-auth-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const profileRequest = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    profileRequest.current = controller
    localStorage.removeItem('avenza-auth-token')
    authApi.getProfile({ signal: controller.signal })
      .then(({ user: currentUser }) => {
        setUser(currentUser)
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
      })
      .catch(error => {
        if (error.code === 'AUTHENTICATION_REQUIRED' || error.code === 'INVALID_TOKEN' || error.code === 'INVALID_ACCOUNT') {
          localStorage.removeItem(USER_KEY)
          setUser(null)
        } else if (error.name !== 'AbortError') {
          console.error('Unable to refresh the signed-in profile:', error)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setReady(true)
      })

    return () => controller.abort()
  }, [])

  const setSession = useCallback(session => {
    profileRequest.current?.abort()
    localStorage.setItem(USER_KEY, JSON.stringify(session.user))
    setUser(session.user)
    setReady(true)
  }, [])
  const updateProfilePhoto = useCallback(async photoURL => {
    const { user: updatedUser } = await authApi.updateProfile(photoURL)
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    setUser(updatedUser)
    return updatedUser
  }, [])
  const logout = useCallback(async () => {
    await authApi.logout()
    profileRequest.current?.abort()
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setReady(true)
  }, [])
  const value = useMemo(() => ({
    user,
    ready,
    isAuthenticated: Boolean(user && ready),
    setSession,
    updateProfilePhoto,
    logout,
  }), [user, ready, setSession, updateProfilePhoto, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
