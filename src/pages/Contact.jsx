function Contact() {
  return (
    <div className="inner-page">

      <section className="page-hero">

        <p className="section-label">
          CONTACT
        </p>

        <h1>
          Get In Touch
        </h1>

        <p>
          Have a question? We'd love to hear
          from you.
        </p>

      </section>


      <section className="section">

        <div className="section-inner">

          <div className="contact-grid">

            {/* Contact Information */}

            <div className="contact-info">

              <p className="section-label">
                CONTACT US
              </p>

              <h2>
                We're here to help.
              </h2>

              <p>
                Whether you have a question
                about a product, order or
                anything else, our team is
                ready to help.
              </p>


              <div className="contact-item">

                <span>
                  📧
                </span>

                <div>
                  <strong>
                    Email
                  </strong>

                  <p>
                    support@shopease.com
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <span>
                  📞
                </span>

                <div>
                  <strong>
                    Phone
                  </strong>

                  <p>
                    +91 98765 43210
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <span>
                  📍
                </span>

                <div>
                  <strong>
                    Location
                  </strong>

                  <p>
                    New Delhi, India
                  </p>
                </div>

              </div>

            </div>


            {/* Contact Form */}

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message submitted!");
              }}
            >

              <div className="form-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  required
                />

              </div>


              <button
                type="submit"
                className="primary-btn"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;