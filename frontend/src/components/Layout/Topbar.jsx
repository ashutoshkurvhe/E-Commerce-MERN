import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io"
import {RiTwitterLine} from "react-icons/ri"
const Topbar = () => {
  return (
      <div className='bg-[#ea2e0e] text-white'>
          <div className="container mx-auto">
              <div className="flex items-center space-x-4">
                  <a href="#" className="hover:text-gray-300">
                      <TbBrandMeta className="h-5 w-5"/>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                      <IoLogoInstagram className="h-5 w-5"/>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                      <RiTwitterLine className="h-5 w-5"/>
                  </a>
              </div>
              <div className="text-sm text-center">
                  <span>We ship worldwide - Fast and relible shipping!</span>
              </div>
              <div className="text-sm">
                  <a href="tel:+1234567890" className="hover:text-gray-300">
                      +1
                  </a>
              </div>
          </div>
      </div>
  )
}

export default Topbar
