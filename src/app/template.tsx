import Navbar from './navbar'

export default function Template({ children }: { children: React.ReactNode }) {
  return(
    <div>
      <Navbar/>
      <div>
        {children}
      </div>
    </div>
  )
}