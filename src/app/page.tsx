import NavLinks  from '@/app/shared/nav-link' ;
import './globals.css'

export default function Page() {
  return <div>
  
      <div className="background-image w-full">
        <div className="bg-black w-full p-10" style={{ backgroundColor: '#000 ' }}>
          <NavLinks></NavLinks>
        </div>
      </div>
  </div>
}