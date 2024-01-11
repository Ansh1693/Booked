const sendOtp = (email, otp) => {
  const mailjet = require("node-mailjet").connect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
  );

  const emailData = {
    Messages: [
      {
        From: {
          Email: "ansh.2016401521@ipu.ac.in",
          Name: "Ansh",
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: "OTP : Booked",
        TextPart: "Here is your OTP : " + otp,
        HTMLPart: `<p>Here is your otp : ${otp}</p>`,
      },
    ],
  };

  const request = mailjet.post("send", { version: "v3.1" }).request(emailData);
  request
    .then((result) => {
      return result.body;
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = sendOtp;
