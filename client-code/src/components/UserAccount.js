
import React, { Component } from 'react'
import UserAccountDropdown from './UserAccountDropdown'

export default class UserAccount extends Component {
render(){
	return(
  <div>
  	<h1>First</h1>
    <UserAccountDropdown>
      <li>Item 1 (in my case these are also React comps)</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </UserAccountDropdown>
    <hr/>
    <h1>Second</h1>
    <UserAccountDropdown>
      <li>Item 1 (in my case these are also React comps)</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </UserAccountDropdown>
  </div>,
  );
}
}