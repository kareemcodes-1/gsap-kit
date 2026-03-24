
import './App.css'
import { SplitLines } from './animations/SplitLines'
import { SplitText } from './animations/SplitText'

function App() {

  return (
    <div className='flex items-center justify-center'>
      <SplitLines
              tag="p"
              text="We design and offer fashion pieces that are as stylish as they are functional, while fostering a conversation around self-expression, body confidence, and empowerment."
              className="w-full lg:w-[600px] text-[1rem] lg:text-[1.2rem] uppercase font-light leading-[1.8]"
              duration={1.2}
              stagger={0.1}
            />
    </div>
  )
}

export default App
