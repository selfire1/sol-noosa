import AboutImage from '@/public/about-image.jpg'
import Image from 'next/image'

export default function SectionAbout() {
  return (
    <div className="page-container py-24 grid sm:grid-cols-2 gap-16">
      <div className="space-y-6 max-w-prose ">
        <p className="text-sm uppercase">About us</p>
        <h2 className="font-bold text-3xl">Car Rentals Value Add</h2>
        <div className="space-y-4">
          <p>
            Reprehenderit ea proident laborum qui culpa veniam. Non exercitation excepteur Lorem
            eiusmod reprehenderit nulla labore consequat id ipsum ea aliqua. Quis reprehenderit
            mollit dolor ex tempor laborum eu velit laboris laborum veniam. Nostrud consectetur
            laborum incididunt ut anim non irure officia.
          </p>
          <p>
            Reprehenderit ea proident laborum qui culpa veniam. Non exercitation excepteur Lorem
            eiusmod reprehenderit nulla labore consequat id ipsum ea aliqua. Quis reprehenderit
            mollit dolor ex tempor laborum eu velit laboris laborum veniam. Nostrud consectetur
            laborum incididunt ut anim non irure officia.
          </p>
          <p>
            Culpa pariatur anim ea id commodo officia reprehenderit mollit cupidatat. Pariatur aute
            dolor dolor non velit nisi veniam consectetur. Minim exercitation laboris labore fugiat.
            Excepteur in est in consectetur sint qui commodo aliqua magna est Lorem dolore laboris
            anim cillum. Labore nostrud enim cupidatat in elit eiusmod nulla tempor mollit quis. Ad
            esse reprehenderit sit voluptate sunt id velit dolore tempor nostrud consequat labore
            fugiat dolor. Cupidatat velit in ullamco fugiat adipisicing.
          </p>
        </div>
      </div>
      <div className="aspect-square">
        {
          // TODO: reasonbale `sizes`
        }
        <Image src={AboutImage} alt="TODO" className="h-full w-full overflow-hidden object-cover" />
      </div>
    </div>
  )
}
