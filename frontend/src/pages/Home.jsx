import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AioutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdoutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import Spinner from '../components/Spinner'
const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/books')
            .then(response => {
                setBooks(response.data.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }, [])
    return (<>
        <div className='p-4 '><div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdoutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>
        <Spinner />
            {loading ? (<Spinner />) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            )}
        </div></>)
}
export default Home