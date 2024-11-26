import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate  } from 'react-router-dom';
import StyledButton from './StyledButton';
import store from './store.js';
import { Provider, useDispatch, useSelector } from 'react-redux';

function Home(){
  return(
    <div>
      <h2>HOME4444</h2>
      HOME is...
    </div>
  )
}

function Update(props){

  let topicId = props.topic_id;
  let topics = useSelector((state)=>{return state.topiStore.topics});
  let selectTopic = topics.find((v)=>{return v.id === topicId});

  let [title,setTitle] = useState(selectTopic.title);
  let [body,setBody] = useState(selectTopic.body);

  let dispatch = useDispatch();

  return(
    <article>
      <div className='forms updatef' onSubmit={(ev)=>{
        ev.preventDefault();
        let title = ev.target.title.value;
        let body = ev.target.body.value;
        dispatch({type : 'topicSlice/update', topic : {id : topicId , title : title, body: body},});
        props.onUpdate(topicId);
      }}>
        <form>
            <p><input type='text' name='title' placeholder='title' value = {title} onChange={(ev)=>{setTitle(ev.target.value)}}></input></p>
            <p><input type='text' name='body' placeholder='body' value={body} onChange={(ev)=>{setBody(ev.target.value)}}></input></p>
            <p><input type='submit' value='UPDATE'></input></p>
        </form>
      </div>
    </article>
  )
}

function Create(props){

  let nextId = useSelector((state)=>{return state.topiStore.nextId});
  let dispatch = useDispatch();

  return(
    <article>
      <div className='forms' onSubmit={(ev)=>{
        ev.preventDefault();
        let title = ev.target.title.value;
        let body = ev.target.body.value;
        dispatch({type : 'topicSlice/create', topic : {id : nextId , title : title, body: body},});
        props.onCreate(nextId);
      }}>
        <form>
            <p><input type='text' name='title' placeholder='title'></input></p>
            <p><input type='text' name='body' placeholder='body'></input></p>
            <p><input type='submit' value='CREATE'></input></p>
        </form>
      </div>
    </article>
  )
}

function Topics(){

  const [id,setId]= useState(1);
  const topics = useSelector((state)=>{ return state.topiStore.topics});
  const navigate = useNavigate();

  const lis = topics.map((topic)=>{return <li key={topic.id}><NavLink id={topic.id} to={'/topics/'+topic.id} onClick={()=>{
    setId(topic.id)
  }}>{topic.title}</NavLink></li>});

  const navigateId = (_id)=>{
      setId(_id);
       navigate(`/topics/${_id}`);
  }

  return(
    <div>
      <ul>
        {lis}
      </ul>
      <Routes>
        <Route path='/:topic_id' element={<Topic topic_id = {id}></Topic>}></Route>
        <Route path='/create' element={<Create onCreate={navigateId} />} />
        <Route path='/update' element={<Update topic_id = {id} onUpdate={navigateId} />} />
      </Routes>
      <StyledButton type='create' to={'/topics/create'} >Create</StyledButton>
  </div>
  )
}

function Topic(props){
  // let params = useParams();
  let topic_id = Number(props.topic_id);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  let sel_tp = {title : 'sorry', body :'not found'};
  const topics = useSelector((state)=>{ return state.topiStore.topics});

  for(let i = 0 ; i< topics.length ; i++){
    if(topics[i].id*1 === topic_id){
      sel_tp = topics[i];
    }
  }

  return(<>
    <div className='div-border'>
      <h2>{sel_tp.title}</h2>
      {sel_tp.body}
      <StyledButton type='update' to={'/topics/update'}>업뎃</StyledButton>
      <StyledButton type='delete' to={'/topics/delete'} onClick={(ev)=>{
        ev.preventDefault();
        dispatch({type : 'topicSlice/delete', topicId : topic_id});
        navigate('/topics');
      }}>삭제</StyledButton>
    </div>
  </>)
}

function App() {

  return (
    <Provider store={store}>
    <div className="App">

      <h1>hello React Router DOM</h1>


      <ul className='mainList'>
        <li><NavLink to='/'>home</NavLink></li>
        <li><NavLink to='/topics'>Topics</NavLink></li>
      </ul>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/topics/*' element={<Topics/>}></Route>
        <Route path='/*' element={'noooooooo'}></Route>
      </Routes>

    </div>
    </Provider>
  );
}

export default App;
