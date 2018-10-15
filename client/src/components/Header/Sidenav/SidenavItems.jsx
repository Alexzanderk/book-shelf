import React from 'react'
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = (props) => {
    const items = [
		{
			type: 'navItem',
			icon: 'home',
			text: 'Home',
			link: '/',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'My Profile',
			link: '/user',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'Add Admins',
			link: '/user/register',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'sign-in',
			text: 'Login',
			link: '/login',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'My Reviews',
			link: '/user/reviews',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'file-text-o',
			text: 'Add Reviews',
			link: '/user/add',
			stricted: false
		},
		{
			type: 'navItem',
			icon: 'sign-out',
			text: 'Logout',
			link: '/user/logout',
			stricted: false
		}
    ];

    const element = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )
    
    const showItems = () => (
        items.map((item, i) => {
            return element(item, i)
        })
    )

  return (
    <div>
      {showItems()}
    </div>
  )
}

export default SidenavItems
