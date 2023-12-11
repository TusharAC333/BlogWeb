import React, { useState,useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'


const  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
const CreatePost = () => {

  const navigate = useNavigate();
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false)
    
    useEffect(() => {
      if (redirect) {
        // Redirect logic here
        navigate('/')
      }
    }, [redirect,navigate]);
  
    async function createNewpost(ev) {
      ev.preventDefault();
  
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('file', files[0]);
  
      try {
        const response = await fetch('http://localhost:4000/post', {
          method: 'post',
          body: data,
          credentials: 'include',
        });
  
        if (response.ok) {
          setRedirect(true);
        } else {
          console.error('Failed to create post:', response.statusText);
          // Handle the error, e.g., show an alert or update state
        }
      } catch (error) {
        console.error('Error creating post:', error);
        // Handle the error, e.g., show an alert or update state
      }
    }
   
  
  return (
    <div>
      <form onSubmit={createNewpost}>
        <input type="title" placeholder='Title' value={title} onChange={ev=>setTitle(ev.target.value)} />
        <input type="summary" placeholder='Summary' value={summary} onChange={ev=>setSummary(ev.target.value)} />
        <input type="file" onChange={ev=>{setFiles(ev.target.files)}}/>
        <ReactQuill value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats}/>
        <button style={{marginTop:'5px'}}>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost;