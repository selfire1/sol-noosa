import Link from 'next/link'
import { headerLinks, socialLinks } from '@/lib/links'
import Icon from './icon'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-auto">
      <div className="page-container py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="bg-gray-500 h-12 w-24 flex items-center justify-center text-sm">
            Logo
          </div>
          <div className="font-semibold text-white">Sol Noosa Car Rentals</div>
          <p className="text-sm text-gray-400">
            ABN: 00 000 000 000
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold text-white">Contact</div>
          <p>123 Hastings Street</p>
          <p>Noosa Heads QLD 4567</p>
          <p>
            <Link href="tel:00000000" className="hover:text-white">
              00 0000 0000
            </Link>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold text-white">Site</div>
          <ul className="space-y-1">
            {headerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold text-white">Follow</div>
          <ul className="flex gap-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="hover:text-white"
                >
                  <Icon icon={link.icon} size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="page-container py-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Sol Noosa Car Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
