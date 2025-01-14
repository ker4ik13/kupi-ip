import Link from 'next/link'
import React from 'react'
import NotFound404 from '@/assets/404.svg'
import { Button } from '@/components/Button'

const NotFoundPage = () => {
  return (
    <div className="container mt-header min-h-page py-20 lg:py-[12.3125rem] content-center text-center flex flex-col justify-center gap-12 sm:gap-[3.375rem] lg:gap-[3.75rem]">
      <div className="flex justify-center items-center">
        <NotFound404 className="w-[16.25rem] sm:w-[24rem] lg:w-[37.5rem]" />
      </div>
      <div className="prose leading-[1.7] font-normal">
        <p className="">
          Такой страницы не существует.
          <br />
          Возможно, она была удалена, либо в ссылке допущена ошибка.
        </p>
      </div>

      <Button variant="link" asChild>
        <Link href="/">Перейти на главную страницу</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
