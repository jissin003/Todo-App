import React, { useState,useEffect} from 'react'
import { MdAutoDelete } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import './App.css';
function App() {
  const [clicked,setClicked]=useState(false);
  const [allTodo,setallTodo]=useState([]);//ellatinum vendi aayond an array
  const [newHeading,setNewHeading]=useState("");//headingin vendi aayond an oru empty string
  const [newDescription,setNewDescription]=useState("");
  const [complete,setComplete]=useState([]);


 const Addtodo=()=>{
      if( newHeading.trim()!== '' && newDescription!== ''){
            let Newtodolist={
              title:newHeading,
              description:newDescription
            };

            let copyupdatedtodolist=[...allTodo];
            copyupdatedtodolist.push(Newtodolist);
            setallTodo(copyupdatedtodolist);
            localStorage.setItem('todolist',JSON.stringify(copyupdatedtodolist));
    
    
            setNewHeading('');
            setNewDescription('');//these two for refershing this to or removing the alreadu entered text
            setClicked(false);//this makes the todo section seen after entering a task
    }
    else{
      alert('Please Enter the TaskName and the Description');
    }

   }




const deleteTodo=(index)=>{
  let reducedTodo=[...allTodo];
  reducedTodo.splice(index,1);
  localStorage.setItem('todolist',JSON.stringify(reducedTodo));
  setallTodo(reducedTodo);
}

const deleteCompleted=(index)=>{
 let deletecompletedTodo=[...complete];
 deletecompletedTodo.splice(index,1);
 localStorage.setItem('completed',JSON.stringify(deletecompletedTodo));
 setComplete(deletecompletedTodo);
}

const completeTodo=(index)=>{
      let now= new Date();
      let dd=now.getDate();
      let mm=now.getMonth()+1;
      let yyyy=now.getFullYear();
      let h=now.getHours();
      let min=now.getMinutes();
      let sec=now.getSeconds();
      let completedOn=dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + min+ ':' + sec;

      let completed={
      ...allTodo[index],
      completedOn:completedOn
      }

      let filteredcompleted=[...complete];
      filteredcompleted.push(completed);
      setComplete(filteredcompleted);
      deleteTodo(index);//just for deleting the ticked or completed f
      localStorage.setItem('completed',JSON.stringify(filteredcompleted));

}



useEffect(()=>{
  let savedTodo=JSON.parse(localStorage.getItem('todolist'));
  let completedTodo=JSON.parse(localStorage.getItem('completed'));
  if(savedTodo){
    setallTodo(savedTodo);
  }
  if(completedTodo){
    setComplete(completedTodo);
  }
},[]);

  return (
    <div className="App">
      <h1 className='head1'>My Todos</h1>
      <div className='Todo-Wrapper'>
      <div className='Todo-input'>

       <div  className='Todo-inputitems'>
          <label>Title</label>
          <input type="text" value={newHeading} onChange={(e)=>setNewHeading(e.target.value)} placeholder='what is the task' />
       </div>

       <div  className='Todo-inputitems'>
          <label>Description</label>
         <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='write the description' />
       </div>

       <div className='Todo-inputitems'>
       <button class="button-57" type="button" onClick={Addtodo}><span class="text">Add the Task</span><span>CareFully Enter</span></button>
       </div>

      </div>
      <div className='Buttonarea'>
        <button className={`second ${clicked===false ?'active':''}` }onClick={()=>{setClicked(false)}}>Todo</button>
        <button className={`second ${clicked===true && 'active'}` }onClick={()=>{setClicked(true)}}>Completed</button>
      </div>

        <div className='Todo-list'>
 {clicked===false && allTodo.map((item,index)=>{
        return(
          <div className='Todo-listitems'key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
      
                  <div className='importedicons'>
                    <MdAutoDelete  className='icon1' onClick={()=>{
                      deleteTodo(index)
                    }} />
                    <TiTickOutline className='icon2' onClick={()=>{
                      completeTodo(index)
                    }} />
                  </div>
            </div>
        )
      })}

{clicked===true && complete.map((item,index)=>{
        return(
          <div className='Todo-listitems'key={index}>
                  <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Completed On: {item.completedOn}</p>
                </div>
      
                  <div className='importedicons'>
                    <MdAutoDelete  className='icon1' onClick={()=>{
                      deleteCompleted(index)
                    }} />

                  </div>
            </div>
        )
      })}



      

       </div>

      </div>

      </div>
  )
}

export default App