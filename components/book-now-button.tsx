import BookModal from './book-modal'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function BookNowButton({
  className,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <BookModal>
      <Button className={cn('sm:min-w-32', className)} variant={variant} {...props}>
        Book Now
      </Button>
    </BookModal>
  )
}
