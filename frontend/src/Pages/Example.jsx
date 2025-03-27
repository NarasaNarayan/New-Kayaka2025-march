import React, { useState } from "react";

const Example = () => {

    const [name, setname] = useState('narasa');
    const [number,setNumber] = useState(0);

    
   
 const  getcart=()=> {
    setname('shivkumar')
 }

 const dic=()=>{
    setNumber(number-1)
 }
 const inc=()=>{
    setNumber(number+1)
 }
 

  return (
    <div style={{zIndex:'100000' ,marginTop:'200px'}}>
 <p> {name}</p>
 <button onClick={dic}>-</button>
 <p>{number}</p>
 <button onClick={inc}>+</button>
 <button onClick={getcart}>click me</button>

    </div>
  )
};

export default Example;
