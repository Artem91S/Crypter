import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from '../Icons';

function MenuLink(props) {
	const { classItem, classHover, page, isActive, classActive, closeBurgerMenu, text, isDesktop, icon } = props;

	return (
		<li className={`${classItem} ${classHover}`}>
			<NavLink to={page} className={isActive ? classActive : ''} onClick={!isDesktop ? closeBurgerMenu : null}>
				{icon && isDesktop ?
					(isActive ? (icon(35, 35, '#202025', '2.2')) : (icon(35, 35, '#202025', '1.5')))
					:
					<>
						<span>{text}</span>
						{!isDesktop ? <ArrowRight /> : null}
					</>
				}
			</NavLink>
		</li>
	);
}

MenuLink.propTypes = {
	classItem: PropTypes.string,
	page: PropTypes.string,
	isActive: PropTypes.bool,
	classActive: PropTypes.string,
	closeBurgerMenu: PropTypes.func,
	text: PropTypes.string,
	isDesktop: PropTypes.bool,
	icon: PropTypes.func,
};

MenuLink.defaultProps = {
	classItem: '',
	page: '',
	isActive: false,
	classActive: '',
	closeBurgerMenu: null,
	text: '',
	isDesktop: false,
	icon: null
};

export default MenuLink;