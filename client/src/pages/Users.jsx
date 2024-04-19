import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Users = () =>{
    const [uid,setUid] = useState('');
    const [uidDetails,setUidDetails] = useState(null);
    const [balance,setBalance] = useState('');
    const [balanceDisplay,setBalanceDisplay] = useState(false);

    const handleInputChange = (event )=>{
        setUid(event.target.value);
    }

    const handleAmountChange = (event) =>{
        setBalance(event.target.value);
    } 

    const handleBalanceUpdate = async ()=>{
        
            try{
                //it copies the uiddetails ; which basically contains only one uid data to updated user object and  then in the updateduser object it  updates the uiddetails.balance ;that is being recieved from the input field enter the amount  

                if (!uidDetails) return ;
                const updatedUser = 
                {... uidDetails ,
                     balance: parseInt(balance)
                };
                await axios.put(`http://localhost:8801/users/${uidDetails.uid}`,updatedUser);
                setUidDetails(updatedUser);
                setBalanceDisplay(true);

            }catch(err){
                console.log("Error while updating the balance ", err)
            }
        
    }

    const [users,setUsers] = useState([])

    useEffect(()=>{
        const  fetchAllUsers =  async() =>{
            try{
                const res= await axios.get("http://localhost:8801/users")
                setUsers(res.data);

            }catch(err){
                console.log(err)     
            }
        }
        
        fetchAllUsers()

        setUidDetails(null);
        
    },[uid])

    useEffect(()=>{
        const user = users.find(user=>user.uid === parseInt(uid))
        setUidDetails(user)
    },[uid,users])


    return( // the lines below h1 users list is used to fetch the entire db details and show the entire users 
        <div>
            
            {/* <h1>USERS LIST</h1> */}
            {/* <div >
                {users.map(user => (
                    <div className='' key={user.uid}>
                        <h2>{user.account_holder}</h2>
                        <h2>{user.balance}</h2>
                    </div>
                ))}
            </div> */}


            <input type="number" placeholder='Enter the UID'  onChange={handleInputChange}/>
            {uidDetails ? (
                <div>
                    <h1>USER DETAILS</h1>
                    <p>UID: {uidDetails.uid}</p>
                    <p>Account Holder: {uidDetails.account_holder}</p>
                    <p>Balance: {uidDetails.balance}</p>
                </div>
            ) : (
                <p>No user found with UID{uid}</p>
            )}
            
            <input type="number" placeholder='Enter the Amount' onChange={handleAmountChange} /><br />

            <button className='text-red-600' onClick={handleBalanceUpdate}> 
                Update the Balance
            </button>

            {/* {if (balanceDisplay=== true){
                <h1>updated succesfully </h1> // in jsx we cant use this method we should use conditional rendering like below 
                if balanceDisplay is set to true then h1 displayed
            }} */} 
            

            {balanceDisplay && <h1>Updated successfully</h1>}

        </div>

    )

}



export default Users;