import './App.css'
import { FlipText } from './animations/FlipText'
import { TextOpacity } from './animations/TextOpacity'

function App() {
  return (
    <div>
      {/* Spacer to push TextOpacity below the fold */}
      <div className='h-screen flex items-center justify-center'>
        <h1 className='text-white text-4xl'>Scroll down ↓</h1>
      </div>

      {/* Now it will trigger on scroll */}
      <div className='min-h-screen flex items-center justify-center'>
        <FlipText
  text="Hover Over Me"
  className="text-4xl font-bold uppercase"
  duration={0.25}
  stagger={0.025}
  ease="easeInOut"
/>
      </div>
    </div>
  )
}

export default App