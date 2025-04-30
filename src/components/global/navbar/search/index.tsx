import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="flex overflow-hidden gap-x-2 border-[1px] focus:bg-none border-[#383D45] rounded-full px-4 py-1 items-center flex-1">
      <SearchIcon color="#229987" />
      <Input
        placeholder="سرچ با نام، ایمیل یا حالت"
        className="border-none outline-none ring-0 focus:ring-0 flex-1"
      />
    </div>
  )
}

export default Search