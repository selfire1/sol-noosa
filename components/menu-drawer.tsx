'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import { Menu01Icon, Close } from '@hugeicons/core-free-icons'
import Icon from './icon'
import Link from 'next/link'
import { headerLinks } from '@/lib/links'
import BookNowButton from './book-now-button'
import CallButton from './call-button'

export default function MenuDrawer({ className }: { className?: string }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild className={className}>
        <Button size="icon-lg" aria-label="Open menu" variant="ghost">
          <Icon icon={Menu01Icon} size={48} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row items-start justify-between">
          <div>
            <DrawerTitle>Sol Noosa Car Rentals</DrawerTitle>
          </div>
          <DrawerClose asChild>
            <Button size="icon-lg" aria-label="Close" variant={'secondary'}>
              <Icon icon={Close} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-2 *:py-2 *:first:pt-0 *:last:pb-0 overflow-y-auto">
          {headerLinks.map((link) => (
            <Button asChild variant="link" key={link.href} className="justify-start">
              <Link key={link.href} href={link.href} className="font-semibold text-xl w-full">
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-auto pb-2">
          <BookNowButton />
          <CallButton />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
