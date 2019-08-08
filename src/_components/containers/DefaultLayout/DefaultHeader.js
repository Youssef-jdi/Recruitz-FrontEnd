import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { AppNavbarBrand } from '@coreui/react';
import { Badge, DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu , Nav } from 'reactstrap';
import Auth from '../../../_utils/Auth';
import logo from '../../../_assets/_images/digitu.png'

const propTypes = {
	children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
	render() {
		// eslint-disable-next-line
		const { children, ...attributes } = this.props;

		return (
			<React.Fragment>
				<AppNavbarBrand
					full={{ src: logo, width: 89, height: 25, alt: 'Digit u' }}
					minimized={{ src: logo, width: 30, height: 30, alt: 'Digit u' }}
				/>
				<Nav className="ml-auto" navbar>
					<UncontrolledDropdown nav direction="down">
						<DropdownToggle nav>
							<p style={{marginRight : '15px' , paddingTop:'12px'}} >{Auth.getUser() ? Auth.getUser().name : 'dis'}</p>
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem divider />
							{/* <DropdownItem>
								<i className="fa fa-shield" /> Lock Account
							</DropdownItem> */}
							<DropdownItem onClick={(e) => this.props.onLogout(e)}>
								<i className="fa fa-lock" /> Logout
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
			</React.Fragment>
		);
	}
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
