import Image from 'next/image'
import Link from 'next/link'
import { headerLinks } from '@/lib/links'
import BookNowButton from './book-now-button'
import CallButton from './call-button'
import MenuDrawer from './menu-drawer'
import LogoImage from '@/public/logo.png'

export function Header() {
  return (
    <div className="bg-sol-cream border-b border-sol-beige-deep sticky top-0 z-20">
      <div className="page-container py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4" aria-label="Sol Noosa Car Rentals home">
          <Image
            src={LogoImage}
            alt="Sol Noosa Car Rentals"
            height={64}
            className="h-14 w-auto rounded-lg"
          />
          <span className="inline-flex text-lg flex-col font-display font-bold leading-[0.98] tracking-[-0.01em]">
            <span>Sol Noosa</span>
            <span className="text-sol-brown">Car Rentals</span>
          </span>
        </Link>
        <div className="gap-4 items-center flex">
          <nav className="md:flex items-center gap-1 hidden">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-sol-brown-deep hover:bg-sol-brown/6 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
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
