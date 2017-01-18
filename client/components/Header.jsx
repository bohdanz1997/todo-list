import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">TO-DO List</a>
					</div>
				</div>
			</nav>
    );
  }
}

export default Header;
