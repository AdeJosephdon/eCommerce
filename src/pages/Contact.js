import { useState } from "react";
import { Icon } from "@iconify/react";
import PageStructure from "../components/PageStructure";



function Contact() {

  // const josephEmail = "jorliejat@gmail.com"
  const [recipientEmail, setRecipientEmail] = useState('');
  const subject = "Possible Consideration through WebApp";
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState('');


  const handleSubmit = (event) => {
    console.log(emailBody)

    event.preventDefault(); 

    const emailBody = `Subject: ${subject}\n\nMy Name: ${name}\n\nMy Email: ${recipientEmail}\n\n${body}`;

    console.log(emailBody)

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  };


  return (

    <PageStructure>
      <main className="contact-container">
        <div className="route"><span>Home / </span>Contact</div>


        <div className="contact-original-container">  
          <div className="contact-left-side">
        <div>
          <p className="contact-icon-container"><span><Icon icon="ion:call-outline" width="24" height="24" className="contact-icon"/></span> <span>Call To Us</span></p>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone <span>+234-903-631-8666</span></p>
        </div>

        <hr/>

        <div>
          <p className="contact-icon-container"><span><Icon icon="bytesize:mail" width="24" height="24" className="contact-icon"/></span> <span>Write To Us</span></p>
          <p>Fill out our form and we will contact you within 24 hours..</p>
          <p>Email: <a href="mailto:adegboyegajosephdon@gmail.com">adegboyegajosephdon@gmail.com</a></p>
          <p>Email: <a href="mailto:jorliejat@gmail.com">jorliejat@gmail.com</a></p>
        </div>

        </div>

        <div className="contact-right-side">

          <div >
            <form className="contact-form">

            <input
              type="name"
              id="name"
              placeholder="Your Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="contact-input contact-name-input"
            />

            <input
              type="email"
              id="recipientEmail"
              placeholder="Your Email*"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="contact-input contact-email-input"
            />

            <input
              type="text"
              id="phone"
              placeholder="Your Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="contact-input contact-text-input"
            />

            
            <textarea
              type="text"
              id="body"
              placeholder="Your Message*"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="contact-textarea contact-textarea-input"
              required
            />
          </form>
                      
          <br/>


          <div className="contact-button-container">
            <button  onClick={handleSubmit} className="contact-button">Send Message</button>
          </div>
          
          </div>

        </div>
        

            

        </div>


      </main>
    </PageStructure>




  );
}

export default Contact;