import React, { Component } from 'react'
import ContentItem from './ContentItem'

export default class Content extends Component {
render(){
  const{files,token} = this.props;
  console.log("files in content:",files.files);
  let path = files.absolute_path;
  console.log("props in content:",files);
  console.log("path in content:",path);
  console.log("token in content:",token);
  return(
  	<div>
    {
      files.files.map((contentItem)=>{
        return(
          <div>
          {
            <ContentItem name={contentItem} path={path} token={token}/>
          }
          </div>
          );
      }
    )}
  	</div>
  	);	
}
}