import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LockIcon from '@mui/icons-material/Lock'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='flex h-full flex-col rounded-md bg-white '>
      <div className='flex items-center'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={
              profile?.avatar?.url ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
            }
            // src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
            alt='ok'
            className='h-full w-full object-cover'
          ></img>
        </Link>
        <div className='flex-grow pl-4 text-xl font-medium'>{profile?.name}</div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            isActive
              ? 'mt-2 flex items-center rounded-lg py-2 font-bold capitalize text-blue-500'
              : 'mt-2 flex items-center rounded-lg py-2 capitalize hover:bg-slate-200'
          }
        >
          <AccountCircleIcon className='mr-3' />
          <div>General</div>
        </NavLink>

        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            isActive
              ? 'mt-2 flex items-center rounded-lg py-2 font-bold capitalize text-blue-500'
              : 'mt-2 flex items-center rounded-lg py-2 capitalize hover:bg-slate-200'
          }
        >
          <LockIcon className='mr-3' />
          {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-3 h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg> */}
          Change Password
        </NavLink>

        <NavLink
          to={path.order}
          className={({ isActive }) =>
            isActive
              ? 'mt-2 flex items-center rounded-lg py-2 font-bold capitalize text-blue-500'
              : 'mt-2 flex items-center rounded-lg py-2 capitalize hover:bg-slate-200'
          }
        >
          <ShoppingCartIcon className='mr-3' />
          Order
        </NavLink>

        <NavLink
          to={path.history}
          className={({ isActive }) =>
            isActive
              ? 'mt-2 flex items-center rounded-lg py-2 font-bold capitalize text-blue-500'
              : 'mt-2 flex items-center rounded-lg py-2 capitalize hover:bg-slate-200'
          }
        >
          <ShoppingCartIcon className='mr-3' />
          History
        </NavLink>

        <NavLink
          to={path.favorite}
          className={({ isActive }) =>
            isActive
              ? 'mt-2 flex items-center rounded-lg py-2 font-bold capitalize text-blue-500'
              : 'mt-2 flex items-center rounded-lg py-2 capitalize hover:bg-slate-200'
          }
        >
          <ShoppingCartIcon className='mr-3' />
          Favorite
        </NavLink>
        {/* <Link to={path.profile} className='flex items-center capitalize'></Link> */}
        {/* <Link to={path.changePassword} className='flex items-center capitalize transition-colors'></Link> */}
        {/* <Link to={path.order} className='flex items-center capitalize transition-colors'></Link> */}
      </div>
    </div>
  )
}
