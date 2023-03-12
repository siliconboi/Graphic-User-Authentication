import bcrypt from 'bcrypt'


const generateHash = async(stringToHash)=>{
    const rounds = 10
    const hashedString = await bcrypt.hash(stringToHash, rounds)
    console.log(hashedString)
    return hashedString;
}

async function authenticate(username, password){
    const dbResponse = await db.users.find({"username":username})
    dbResponse = dbResponse[0]
    const userName = dbResponse["username"]
    const userpassword = dbResponse["password"]
    const counter = dbResponse["counter"]
    const isBlocked = dbResponse["isBlocked"]
    hashedPassword = bcrypt.hash(password, 10)
    if(isBlocked){
        return {"isBlocked":true}
    }
    if(hashedPassword==userpassword){
        await db.collectionName.findOneAndUpdate(
            {"username":userName},
            {$set:{"counter":0,
            "isBlocked":false}},
            {returnOriginal:false}
        )
        return {"isBlocked":false, 
                "isAuthenticated":true,
                "userName": userName,
                "hashedPassword": hashedPassword}
    }
    else{
        if(counter==2){
            await db.collectionName.findOneAndUpdate(
                {"username":userName},
                {$set:{"counter":0,
            "isBlocked":true}},
            {returnOriginal:false}
            )
            return {"isBlocked":true}
        }
        counter+=1
        await db.collectionName.findOneAndUpdate(
            {"username":userName},
            {$set:{"counter":counter}},
            {returnOriginal:false}
        )

        return {"isBlocked":false, 
        "isAuthenticated":false,
        "userName": userName,
        "hashedPassword": hashedPassword}
    }   
}
async function userNameChecker(username){
    const dbResponse = await db.collectionName.find({"username":username})
    if(dbResponse==null){
        return true
    }
    return false
}
async function register(username, emailID){
    const flag = userNameChecker(username)
    if(flag ==false){
        return {"status":"Need to change UserName"}
    }
    else{
        const randomNumber = Math.random(0, 9999)
        const generatedPassword = hashedPassword(randomNumber.toString())
        const dbResponse = await db.collectionName.insertOne({
            "username":username,
            "password":generatedPassword,
            "counter":0,
            "isBlocked":false,
            "emailID":emailID
        })
        return {"status":"User Registered Successfully", "generatedPassword":generatedPassword}
    }
}
const authRouter = {
    "generateHash" : generateHash,
    "authenticate":authenticate,
    "register":register,
    "userNameChecker":userNameChecker

}
export {authRouter}