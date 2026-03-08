import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface ScreenshotLightboxProps {
  imageUrl: string | null
  onClose: () => void
}

export function ScreenshotLightbox({ imageUrl, onClose }: ScreenshotLightboxProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent
        className="sm:max-w-3xl p-2 bg-black/90"
        showCloseButton
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Screenshot full view"
            className="max-h-[80vh] w-full object-contain rounded"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
