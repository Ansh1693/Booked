const sendPaymentMail = (email, name, amount)=>{
    const mailjet = require ('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
    
}