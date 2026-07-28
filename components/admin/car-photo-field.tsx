'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { generateReactHelpers } from '@uploadthing/react'

import { Button } from '@/components/ui/button'
import type { UploadRouter } from '@/app/api/uploadthing/core'
import { setCarPhoto } from '@/lib/fleet-actions'

const { useUploadThing } = generateReactHelpers<UploadRouter>()

const MAX_EDGE_PX = 1600
const JPEG_QUALITY = 0.82
const SKIP_COMPRESSION_UNDER_BYTES = 500 * 1024

const compressImage = async (file: File): Promise<File> => {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height))
    if (scale === 1 && file.size < SKIP_COMPRESSION_UNDER_BYTES) {
      return file
    }
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const context = canvas.getContext('2d')
    if (!context) {
      return file
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
    })
    if (!blob || blob.size >= file.size) {
      return file
    }
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' })
  } catch {
    return file
  }
}

type CarPhotoFieldProps = {
  carId: string
  carName: string
  imageUrl: string | null
}

export default function CarPhotoField({ carId, carName, imageUrl }: CarPhotoFieldProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { startUpload } = useUploadThing('carImage', {
    onUploadError: (uploadError) => {
      setBusy(false)
      setError(uploadError.message || 'Upload failed. Please try again.')
    },
    onClientUploadComplete: async (files) => {
      const uploaded = files[0]
      if (!uploaded) {
        setBusy(false)
        return
      }
      await setCarPhoto(carId, uploaded.ufsUrl, uploaded.key)
      setBusy(false)
      router.refresh()
    },
  })

  const handleFile = async (file: File | undefined) => {
    if (!file) {
      return
    }
    setError(null)
    setBusy(true)
    const compressed = await compressImage(file)
    await startUpload([compressed])
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-sol-brown-deep">Photo</div>
      <div className="relative aspect-[4/3] w-full max-w-60 overflow-hidden rounded-md bg-sol-beige flex items-center justify-center text-sol-brown-soft text-sm italic">
        {imageUrl ? (
          <Image src={imageUrl} alt={carName} fill sizes="240px" className="object-cover" />
        ) : (
          'no photo yet'
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-12 w-full max-w-60"
        disabled={busy}
        onClick={() => {
          inputRef.current?.click()
        }}
      >
        {busy ? 'Uploading…' : imageUrl ? 'Replace photo' : 'Add photo'}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
