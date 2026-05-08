import { WhatsappIcon } from '@hugeicons/core-free-icons'
import { Button } from './ui/button'
import Icon from './icon'
import { whatsappLink } from '@/lib/links'
import { cn } from '@/lib/utils'

type WhatsappButtonProps = React.ComponentProps<typeof Button> & {
  label?: string
}

export default function WhatsappButton({
  className,
  variant = 'secondary',
  label = 'Text on WhatsApp',
  ...props
}: WhatsappButtonProps) {
  return (
    <Button asChild className={cn('sm:min-w-32', className)} variant={variant} {...props}>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Text Sol Noosa on WhatsApp"
      >
        <Icon icon={WhatsappIcon} data-icon="inline-start" />
        {label}
      </a>
    </Button>
  )
}
