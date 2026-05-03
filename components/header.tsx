import { headerLinks } from '@/lib/links'
import { Button } from './ui/button'
import Link from 'next/link'
import BookNowButton from './book-now-button'
import CallButton from './call-button'
import MenuDrawer from './menu-drawer'

export function Header() {
  return (
    <div className="bg-gray-100 sticky top-0 z-20">
      <div className="page-container py-4 flex items-center justify-between">
        <div className="bg-gray-500 h-12 w-24">Logo</div>
        <div className="gap-4 items-center flex">
          <div className="md:flex items-center gap-2 hidden">
            {headerLinks.map((link) => (
              <Button key={link.href} asChild variant="link">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
          <div className="gap-2 items-center sm:flex hidden">
            <BookNowButton />
            <CallButton />
          </div>
          <MenuDrawer className="md:hidden" />
        </div>
      </div>
    </div>
  )
}
