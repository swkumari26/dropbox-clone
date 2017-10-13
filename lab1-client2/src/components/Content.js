import React, { Component } from 'react'
import ContentItem from './ContentItem'
import {Table} from 'reactstrap';

export default class Content extends Component {
render(){
  const{files,token,contentSelected,selectedName} = this.props;
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
            <ContentItem name={contentItem} selectedName={selectedName} path={path} token={token} contentSelected={contentSelected}/>
          }
          </div>
          );
      }
    )
    }
    </div>
  	);	
}
}