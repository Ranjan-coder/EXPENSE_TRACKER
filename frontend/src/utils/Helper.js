export const validateEmail = (email) =>{
    const regex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    
}