let users = [];

const checkExistedUser = (username)=>{
    const user = users.find(user=>user.username == username);
    //console.log(user)
    if(user){
        return true;
    }
    return false;
}
const addUser = (username,room,id)=>{

    let existedUser = users.find(user=>user.username==username);
    if(existedUser){
        return{
            error:'User Already existed !'
        }
    }
    users.push({id,username,room});
    return{
        id,
        username,
        room
    }
}

const removeUser = (username)=>{
    users = users.filter(user=>user.username !== username);
    return users;
}

const getUser = (id)=>{
    const user =users.find(user=>user.id==id); 
    return user;
}

const getUsers = ()=>{
    return users;
}

module.exports = {addUser,removeUser,getUser,getUsers,checkExistedUser};
