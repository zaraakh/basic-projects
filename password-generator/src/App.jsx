
import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
const [password, setPassword] = useState("")
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [length,setLength] = useState(8)
const passwordRef = useRef(null)

const passwordGenerator = useCallback (() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if (charAllowed) str += "~!@#$%^&*"

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)

}, [length,numberAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback (() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectedRange(0,999);
  window.navigator.clipboard.writeText(password)
}, [password]
)
useEffect (() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-white'>
      <h1 className='text-white text-center text-3xl'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value = {password}
        className='outline-none w-full py-1 px-3 text-orange-500'
        placeholder= 'Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard} 
        className='white px-3 bg-blue-600'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div>
            <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberAllowed'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}/>
            <label> Numbers</label>
          </div>
          <div>
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='charAllowed'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}/>
            <label> Characters</label>
          </div>
      </div>
    </div>
  )
}

export default App
