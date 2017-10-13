import React, { Component } from 'react';
import FolderIcon from 'react-icons/lib/md/folder';
import FileIcon from 'react-icons/lib/go/file-text';
import PdfIcon from 'react-icons/lib/fa/file-pdf-o';
import StarIcon from 'react-icons/lib/fa/star';
import {Link}  from 'react-router-dom'
import history from '../history';
import { bindActionCreators } from 'redux';
import {createFolder,deleteContent,starContent,shareContent} from '../actions/index';
import { connect } from 'react-redux'
import {Table} from 'reactstrap';

class ContentItem extends Component { 
   handleKeyPress = (event) => {
        if(event.key === "Enter")
        { console.log("enter pressed");
          var folderPath = this.props.path+event.target.value ;
          this.props.createFolder(folderPath,this.props.token);
        }
        }               
render(){  
  const{name,path,token,modifiedOn,members,star,deleteContent,shareContent,starContent} = this.props;
  console.log("name in sub:",name);
  console.log("path in contentitem:",path);
  console.log("token in contentitem:",token);
  let displayIcon,buttonOptions
  let link = '/home/'+name;
  let pathWithName = path+name;
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
          <Link to=""><PdfIcon size={50}/><span>{name}     </span><StarIcon size={20}/></Link>
          )
        }
        else
        {
        displayIcon = (
          <Link to=""><FileIcon size={50}/><span>{name}     </span><StarIcon size={20}/></Link>
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
          <button className="btn btn-default btn-sm">Share</button>
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
          <button className="btn btn-default btn-sm">Share</button>
          <button className="btn btn-default btn-sm">Delete</button>
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
  <Table>
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
    </Table>
  	);	
}
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({createFolder,deleteContent,starContent,shareContent},dispatch)
    };
}
export default connect(null,mapDispatchToProps)(ContentItem);