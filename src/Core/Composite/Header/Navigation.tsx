import React from 'react'
import Link from 'next/link';
const Navigation = () => {
    return (
        <>
            <div className='ml-6 mt-2'>
                <ul className='flex gap-x-3'>
                    <Link href="/">
                        Ana Sayfa
                    </Link>
                    <Link href="/">Hakkımızda</Link>
                    <Link href="/">Hizmetler</Link>
                    <Link href="/">Yardım</Link>
                </ul>
            </div>
        </>
    )
}

export default Navigation