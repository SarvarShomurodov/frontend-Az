import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState('');

  const editingInfo = Boolean(id);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        text
      };
      const { data } = editingInfo ? await axios.patch(`/posts/${id}`, fields) : await axios.post("/posts", fields);
      const _id = editingInfo ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Error while creating article.")
    }
  }

  React.useEffect(() => {
    if(id){
      axios.get(`/posts/${id}`).then(({data}) => {
        setTitle(data.title);
        setText(data.text);
      })
    }
  }, []);

  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to="/" />
  };

  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField value={text}
          placeholder="Enter your text"
          multiline
          fullWidth
          rows={6}
          onChange={(e) => setText(e.target.value)}
          style={{margin: "20px 0 40px 0"}}
        />
      
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {editingInfo ? "Save" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
