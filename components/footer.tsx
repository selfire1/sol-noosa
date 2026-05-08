import Image from 'next/image'
import Link from 'next/link'
import { headerLinks, socialLinks } from '@/lib/links'
import Icon from './icon'
import LogoImage from '@/public/logo.png'

export function Footer() {
  return (
    <footer className="bg-sol-ink text-sol-cream/85 mt-auto">
      <div className="page-container py-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-1 w-24 h-24 flex items-center justify-center">
            <Image
              src={LogoImage}
              alt="Sol Noosa Car Rentals"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="font-bold text-sol-cream">Sol Noosa Car Rentals</div>
          <p className="text-sm text-sol-cream/55">ABN: 00 000 000 000</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-bold text-sol-cream">Contact</div>
          <p>123 Hastings Street</p>
          <p>Noosa Heads QLD 4567</p>
          <p>
            <Link href="tel:00000000" className="hover:text-sol-yellow transition-colors">
              00 0000 0000
            </Link>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-bold text-sol-cream">Site</div>
          <ul className="space-y-1">
            {headerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sol-yellow transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-bold text-sol-cream">Follow</div>
          <ul className="flex gap-3.5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="hover:text-sol-yellow transition-colors"
                >
                  <Icon icon={link.icon} size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sol-cream/[0.12]">
        <div className="page-container py-4 text-xs text-sol-cream/50">
          © {new Date().getFullYear()} Sol Noosa Car Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
