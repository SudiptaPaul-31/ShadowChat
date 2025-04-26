import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { House } from 'lucide-react'
import logo from './../../logos/logo.png'
import Link from 'next/link'

export default function Custom404() {
  /*For the second background option, just remove -2 from bg-[url(/images/bg-404-2.jpg)] leaving the code like this: <section className="bg-[url(/images/bg-404.jpg)] ... ">...</section> */
  return (
    <section className="bg-[url(/images/bg-404-2.jpg)] relative flex flex-col justify-center min-h-screen  bg-center bg-no-repeat bg-cover">
      <div className="absolute z-0 inset-0 bg-black/65"></div>

      <div className="z-10">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h2 className="sm:text-[210px] text-9xl font-bold text-white flex items-center">
            4
            <Image
              src={logo}
              className="sm:max-h-[180px] max-h-24 w-auto rounded-full mx-1.5"
              alt="Zero"
            />
            4
          </h2>

          <div className="space-y-5">
            <h3 className="text-[46px] font-bold">
              <span className="gradient-text">Opps.. </span>
              <span className="text-[#CBCBCB]">Page Not Found!!</span>
            </h3>

            <p className="text-[#CBCBCB] text-xl max-w-[400px] mx-auto">
              It seems the page you are looking for doesn&apos;t exist.
              Don&apos;t worry, let&apos;s get you back on track!
            </p>

            <Link href="/" className={buttonVariants({ variant: 'gradient' })}>
              Back To Homepage <House />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
