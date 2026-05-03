import { CallingIcon } from '@hugeicons/core-free-icons'
import { Button } from './ui/button'
import Icon from './icon'
import { cn } from '@/lib/utils'

export default function CallButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button className={cn('sm:min-w-32', className)} {...props}>
      {
        // TODO: add link to call phone number
        // TODO: add real phone number
      }
      00000000
      <Icon icon={CallingIcon} />
    </Button>
  )
}
