import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./css/Posts.css";




const CreatePost = () => {

  


  
    return (
      <div>
        
        <div className="post-style container App">
        <Card className="card-style">
          <CardHeader>Create Post</CardHeader>
          <CardBody>
          <form >
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Enter title"  />
           
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input type="textarea" cols="30" rows="6" name="content" id="" placeholder="Enter a short description"  />
           
            </FormGroup>
            <Button
                color="primary"
                type="submit"
                block
              >
              Create Post
            </Button>

            
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default CreatePost