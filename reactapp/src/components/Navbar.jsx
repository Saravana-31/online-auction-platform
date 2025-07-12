import React,{Component} from "react";
import { Link } from "react-router-dom";
import { FaUser,FaEnvelope } from "react-icons/fa";

class Navbar extends Component{
  constructor(){
    super();
    this.state={
      activeItem:'home'
    };
  }
  handleItemClick=(itemName)=>{
    this.setState({activeItem:itemName});
  }
  handleLogout = async() => {
    try{
      const response=await fetch('/logout',{
        method:'GET',
        credentials:'include',
      });

      const data=await response.json();

      if(data.success){
        this.props.setLoggedInUser(null)
      }
    }catch(err){
      console.log('error')
    }
  };

  render(){
    const { loggedInUser } = this.props;

    return(
      <div className="navbar_cont">
        <div className="logo_cont">
          <h2><span>Bid</span>Bank</h2>
        </div>
        <div className="nav_items">
          <ul>
            <li><Link className={this.state.activeItem==='home'?'active':''} onClick={()=>this.handleItemClick('home')} to="/">Home</Link></li>

            <li><Link className={this.state.activeItem==='about'?'active':''} onClick={()=>this.handleItemClick('about')} to="/about">About</Link></li>

            <li><Link className={this.state.activeItem==='bid'?'active':''} onClick={()=>this.handleItemClick('bid')} to="/bid">Bid</Link></li>
            
            <li>
              {
              loggedInUser ? 
              (<>
              <span className="user-ka-name"><FaUser/> {loggedInUser.name}</span> 
              <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
              <Link className="messageiconlink" to="/messages"><FaEnvelope className="messagekaicon"/></Link>
              </>) 
              : (<Link className={this.state.activeItem==='login'?'active':''} onClick={()=>this.handleItemClick('login')} to="/login">Login</Link>) 
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Navbar;