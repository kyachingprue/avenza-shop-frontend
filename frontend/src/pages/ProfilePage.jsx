import { useRef, useState } from 'react'
import { FaCamera, FaCircleCheck, FaEnvelope, FaIdBadge, FaUser } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useOutletContext } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

const MAX_IMAGE_SIZE = 32 * 1024 * 1024

async function uploadProfileImage(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY
  if (!apiKey) {
    throw new Error('Image uploads are not configured. Set VITE_IMGBB_API_KEY and restart the frontend.')
  }

  const formData = new FormData()
  formData.append('image', file)
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    body: formData,
  })
  const result = await response.json()
  if (!response.ok || !result.success || !result.data?.url) {
    throw new Error(result.error?.message || 'Image upload failed. Please try again.')
  }
  return result.data.url
}

const ProfilePage = () => {
  const { user } = useOutletContext()
  const { updateProfilePhoto } = useAuth()
  const fileInput = useRef(null)
  const [uploading, setUploading] = useState(false)
  const details = [
    { label: 'Full name', value: user.name, icon: FaUser },
    { label: 'Email address', value: user.email, icon: FaEnvelope },
    { label: 'Account role', value: user.role, icon: FaIdBadge },
    { label: 'Account status', value: 'Verified', icon: FaCircleCheck },
  ]

  const handleImageChange = async event => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Please select an image smaller than 32 MB.')
      return
    }

    setUploading(true)
    try {
      const photoURL = await uploadProfileImage(file)
      await updateProfilePhoto(photoURL)
      toast.success('Profile image updated successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to update your profile image.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Account settings</p>
      <h1 className="mt-2 text-3xl font-black text-gray-950">Profile</h1>
      <p className="mt-2 text-sm text-gray-500">Your verified Avenza account details.</p>
      <div className="mt-7 flex flex-wrap items-center gap-5 rounded-2xl border border-gray-100 p-5">
        {user.photoURL
          ? <img src={user.photoURL} alt={`${user.name}'s profile`} className="h-20 w-20 rounded-full object-cover" />
          : <div className="grid h-20 w-20 place-items-center rounded-full bg-linear-to-br from-cyan-600 to-blue-700 text-2xl font-black text-white">{user.name?.trim().charAt(0).toUpperCase() || <FaUser />}</div>}
        <div>
          <p className="font-bold text-gray-900">Profile image</p>
          <p className="mt-1 text-sm text-gray-500">Choose an image to upload and use across your account.</p>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
            className="sr-only"
            aria-label="Choose a profile image"
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-wait disabled:opacity-60"
          >
            <FaCamera />
            {uploading ? 'Uploading...' : user.photoURL ? 'Change image' : 'Add image'}
          </button>
        </div>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start gap-4 rounded-2xl border border-gray-100 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Icon /></span>
            <div><p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p><p className="mt-1 break-all font-bold text-gray-900">{value}</p></div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProfilePage
