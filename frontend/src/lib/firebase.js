import { getApp, getApps, initializeApp } from '@firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

function getFirebaseClientAuth() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length) {
    throw new Error(
      `Google sign-in needs Firebase web app settings. Copy frontend/.env.example to frontend/.env, fill in ${missing.join(', ')} from your Firebase web app config, then restart Vite.`,
    )
  }

  const firebaseApp = getApps().length ? getApp() : initializeApp(config)
  return getAuth(firebaseApp)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  const result = await signInWithPopup(getFirebaseClientAuth(), provider)
  return result.user.getIdToken()
}
