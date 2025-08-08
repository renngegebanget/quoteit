// @ts-nocheck
import Navbar from './components/Navbar'
import DailyQuotes from './components/DailyQuotes'
import Progress from './components/Progress'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='container mx-auto items-start flex flex-wrap md:flex-nowrap mt-32 gap-8'>
        <DailyQuotes />
        <Progress />
      </div>
    </>
  )
}

//<img src'/image/paper.jpg' />
