import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function Header(props){
  return(
    <header>
      <h1><a id='main' href='/' onClick={(ev)=>{
        ev.preventDefault();
        props.onChangeMode();
      }} >{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const lis = props.topics.map((topic)=>{return <li key={topic.id}><a id={topic.id} href={'/read/'+topic.id} onClick={(ev)=>{
  ev.preventDefault();
  props.onChangeMode(Number(ev.target.id));
  }}>{topic.title}</a></li>});
  return(
    <ol>
      {lis}
    </ol>
  )
}

function Article(props){
  return(
    <article>
      <div className='div-border'>
        <h2>{props.title}</h2>
        {props.body}
      </div>
    </article>
  )
}

function Create(props){
  return(
    <article>
      <div className='forms'>
      <form onSubmit={(ev)=>{
        ev.preventDefault();
        let title = ev.target.title.value;
        let body = ev.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name = 'title' placeholder='title'></input></p>
        <p><input type='text' name = 'body'  placeholder='body'></input></p>
        <p><input type='submit' value='CREATE'></input></p>
      </form>
      </div>
    </article>
  )
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return(
    <article>
    <div className='updatef forms'>
    <form onSubmit={(ev)=>{
      ev.preventDefault();
      let title = ev.target.title.value;
      let body = ev.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name = 'title' placeholder='title' value={title} onChange={(ev)=>{setTitle(ev.target.value);}}></input></p>
      <p><input type='text' name = 'body'  placeholder='body' value={body} onChange={(ev)=>{setBody(ev.target.value);}}></input></p>
      <p><input type='submit' value='UPDATE'></input></p>
    </form>
    </div>
  </article>

  )
}

function App() {

  const [mode,setMode] = useState('welcom');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(Number(4));

  const oj=[
    {id : 1, title : 'html', body:'html is ...'},
    {id : 2, title : 'css', body:'css is ...'},
    {id : 3, title : 'js', body:'js is ...'},
  ];

  const [topics,setTopics] = useState(oj);

  let content = null;
  let contextControl = null;

  if(mode === 'welcom'){
    content = <Article title={'WelCom'} body={'hello, web'}></Article>;
  }else if(mode ==='read'){
    let topicObj =topics.find((tp)=>{return tp.id === id});
    content = <Article title={topicObj.title} body={topicObj.body}></Article>;
    contextControl = <>
      <a className='update' href={'/update/'+ id} onClick={(ev)=>{
        ev.preventDefault();
        setMode('update');
      }}>update</a>
      <a className='delete' href={'/delete/'+ id} onClick={(ev)=>{
        ev.preventDefault();
        let updateTopics = [...topics];
        updateTopics = updateTopics.filter((el)=>{return el.id !== id});

        setTopics(updateTopics);
        setMode('welcom');
      }}>delete</a>
    </>
  }else if(mode==='create'){
    content = <Create onCreate={(_title, _body)=>{
        let newTopic = {id : nextId, title : _title, body : _body};
        let newTopics = [...topics];
        newTopics.push(newTopic);

        setMode('read');
        setId(nextId);
        setTopics(newTopics);
        setNextId(Number(id+1));

    }}></Create>
  }else if(mode === 'update'){
    let topicObj =topics.find((tp)=>{return tp.id === id});
    content = <Update title ={topicObj.title} body = {topicObj.body} onUpdate={(_title, _body)=>{
      let updateTopic = {id : id, title : _title, body : _body};
      let updateTopics = [...topics];

      for(let i = 0 ; i < updateTopics.length ; i++){
        if(updateTopics[i].id === id){
          updateTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(updateTopics);
      setMode('read');
    }}></Update>;
  }

  return (
    <div className="App">

      <Header title="Hello React Router Dom" onChangeMode={()=>{
          setMode('welcom');
      }}></Header>


      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('read');
        setId(_id);
      }}></Nav>
      {content}
      <a className='create' href='/create' onClick={(ev)=>{
        ev.preventDefault();
        setMode('create');
      }}>Create</a>
      {contextControl}
    </div>
  );
}

export default App;
