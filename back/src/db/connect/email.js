emailjs.init("r08E-8r5oxz_mMPqR");

var templateParams = {
  name: "James",
  password: "Check this out!",
  email: "stw8194@gmail.com",
};

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams).then(
  function (response) {
    console.log("SUCCESS!", response.status, response.text);
  },
  function (error) {
    console.log("FAILED...", error);
  },
);
