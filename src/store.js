import { configureStore, createSlice } from "@reduxjs/toolkit";

const oj=[
    {id : 1, title : 'html', body:'html is ...'},
    {id : 2, title : 'css', body:'css is ...'},
    {id : 3, title : 'js', body:'js is ...'},
    {id : 4, title : 'react', body:'react is ...'},
  ];


const topicSlice = createSlice({
    name : 'topicSlice',
    initialState : {topics : oj, nextId : oj.length+1},
    reducers :{
        'create' : (state,action)=>{
            state.nextId += 1;
            state.topics.push(action.topic);
        },
        'update' : (state,action)=>{
            for(let i = 0 ; i < state.topics.length; i++){
                if(state.topics[i].id === action.topic.id){
                    
                    state.topics[i] = action.topic;
                }
            }
        },
        'delete' : (state,action)=>{
            state.topics = state.topics.filter((topic)=>{
                return topic.id !== action.topicId;
            })
        },
    }
});

const store = configureStore({
    reducer : {
        topiStore : topicSlice.reducer,
    }
});

export default store;