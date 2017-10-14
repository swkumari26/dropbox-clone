import React, { Component } from 'react';
import FolderIcon from 'react-icons/lib/md/folder';
import FileIcon from 'react-icons/lib/go/file-text';
import PdfIcon from 'react-icons/lib/fa/file-pdf-o';
import StarIcon from 'react-icons/lib/fa/star';
import {Link}  from 'react-router-dom'
import history from '../history';
import { bindActionCreators } from 'redux';
import {createFolder,deleteContent,starContent,shareContent,getAccounts} from '../actions/index';
import { connect } from 'react-redux'
import Modal from 'react-modal'


class ContentItem extends Component { 
state = {modalIsOpen:false}
   handleKeyPress = (event) => {
        if(event.key === "Enter")
        { console.log("enter pressed");
          var folderPath = this.props.user.id[0]+'/'+this.props.path+event.target.value ;
          this.props.createFolder(folderPath,this.props.token);
        }
      }               
render(){  
  const{user,name,path,token,modifiedOn,members,star,deleteContent,shareContent,starContent,accounts,getAccounts} = this.props;
  const{modalIsOpen} = this.state;
  console.log("name in sub:",name);
  console.log("path in contentitem:",path);
  console.log("token in contentitem:",token);
  let displayIcon,buttonOptions
  let link = '/home/'+name;
  let pathWithName = user.id[0]+'/'+path+name;
  console.log("path with name in content item",pathWithName);
    if (name)
    {
  	if (name.indexOf('.') > -1)
  		{	

      if(star)
          {        
        if(name.indexOf('pdf') > -1)
        {
        displayIcon = (
          <Link to=""><PdfIcon size={50}/><span>{name}&nbsp;&nbsp;</span><StarIcon size={20}/></Link>
          )
        }
        else
        {
        displayIcon = (
          <Link to=""><FileIcon size={50}/><span>{name}&nbsp;&nbsp;</span><StarIcon size={20}/></Link>
          )  
        }
      }
      else
      {
        if(name.indexOf('pdf') > -1)
        {        
        displayIcon = (
          <Link to=""><PdfIcon size={50}/><span>{name}     </span></Link>
          )
        }
        else
        {
        displayIcon = (
          <Link to=""><FileIcon size={50}/><span>{name}     </span></Link>
          )  
        }
      }
        buttonOptions = (<div>
          <button className="btn btn-default btn-sm" onClick={(e) => {e.preventDefault();getAccounts({token});this.setState({modalIsOpen:true});}}>Share</button>
          <button className="btn btn-default btn-sm" onClick={(e) => {e.preventDefault(); deleteContent(pathWithName,token); }}>Delete</button>
          <a className="btn btn-default btn-sm" href={"http://localhost:3001/dropbox/"+40+"/"+path+"/"+name} download>Download</a>
          <button className="btn btn-default btn-sm">Star</button>
          </div>
          )               
    		}
    	else{
        if(star)
        {
  			displayIcon = (
        <Link to="" onClick={(e) => {e.preventDefault(); history.push(link); }}><FolderIcon size={50}/><span>{name}    </span><StarIcon size={20}/></Link>
        )
      }
      else{
        displayIcon = (
        <Link to="" onClick={(e) => {e.preventDefault(); history.push(link); }}><FolderIcon size={50}/><span>{name}    </span></Link>
        )        
      }
        buttonOptions = (<div>
          <button className="btn btn-default btn-sm" onClick={(e) => {e.preventDefault();getAccounts({token});this.setState({modalIsOpen:true});}}>Share</button>
          <button className="btn btn-default btn-sm" onClick={(e) => {e.preventDefault(); deleteContent(pathWithName,token); }}>Delete</button>
          <button className="btn btn-default btn-sm">Star</button>
          </div>
          )        
      }
    }
    else
    {
        displayIcon = (
        <a><FolderIcon size={50}/><input type="text" onKeyPress={this.handleKeyPress}/></a>
        )       
    }
  return(
  <div>
  <table className="table">
  <tr>
    <td className="col-lg-4 col-md-4 col-sm-4">
    {displayIcon}
  	</td>
    <td className="col-lg-2 col-md-2 col-sm-2">
    {modifiedOn}
    </td>
    <td className="col-lg-2 col-md-2 col-sm-2">
    {members}
    </td> 
    <td className="col-lg-4 col-md-4 col-sm-4">
      {buttonOptions}        
    </td>
    </tr> 
    </table> 
    <Modal 
      isOpen={modalIsOpen} 
      contentLabel='Modal'
      style={{overlay:{},content:{bottom:"50%",left:"30%",right:"30%",border:"2px solid #ccc"}}}       
      >
    <div className="modal-text">
    {displayIcon}<button className="close" onClick={(e) => {e.preventDefault();this.setState({modalIsOpen:false});}}><span aria-hidden={true}>&times;</span></button>
    <hr/>
    To: <input id="userID" list="accounts" placeholder="Email or name" className="inputmodal" ref={(input) => this.input = input}></input>
    <datalist id="accounts">
    {
      accounts.map((account)=>{
        return (<div><option data-id={account.id} value={account.email}></option>
                <option data-value={account.id} value={account.firstname+' '+account.lastname}></option></div>)
      })
    }
    </datalist>
    <hr/>
    <Link to="">Create link to share</Link>
    <hr/>
    <button className="btn btn-primary" onClick={(e) => {e.preventDefault();shareContent(this.input.value,accounts,name,path,token,user.id);}}>Share</button>
    </div>
    </Modal>
    </div>   
     );	
}
}

  function mapStateToProps(state) {
    return{
      accounts:state.login.accounts
    }
    }

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({createFolder,deleteContent,starContent,shareContent,getAccounts},dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ContentItem);