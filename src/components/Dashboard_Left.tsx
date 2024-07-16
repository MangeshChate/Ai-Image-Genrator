import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card } from './ui/card'

const Dashboard_Left = () => {
  return (
    <div className='lg:p-3 pt-3 pb-3 lg:pt-auto lg:pb-auto p-suto'>
      <div className='flex gap-3 p-3 border rounded-xl'>
        <Input type='text' placeholder='Describe your image, get playfull ' className='border-0 lg:text-lg text-sm'/>
        <Button>Genrate</Button>
      </div>
      <Card className='p-3 flex  justify-center items-center mt-5'>
          <div className='bg-[#1E1C28] lg:w-[900px] lg:h-[650px] w-[300px] h-[200px] rounded-xl ' >

          </div>
      </Card>
    </div>
  )
}

export default Dashboard_Left
