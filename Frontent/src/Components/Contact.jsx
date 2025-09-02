import { useEffect, useState } from "react";
// import Header from "./Header";

function Contact() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    Phonenumber: "",
    textarea: ""
  });

  const [save, setSavedData] = useState([]);

  function handel(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSavedData([...save, formdata]);

    setformdata({
      name: "",
      email: "",
      Phonenumber: "",
      textarea: ""
    });
  }

  useEffect(() => {
    if (save.length > 0) {
      localStorage.setItem("save", JSON.stringify(save));
    }
  }, [save]);

  return (
    <>
      {/* <Header /> */}
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Google Map */}
          <div className="rounded-lg overflow-hidden border-2 border-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.241553841478!2d75.78974481125746!3d26.864065576578838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3f27d3dad07%3A0xb2641415d32e0c18!2sFull%20Stack%20Learning!5e0!3m2!1sen!2sin!4v1748846291965!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                  value={formdata.name}
                  onChange={handel}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={formdata.email}
                  onChange={handel}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="phonenumber" className="block text-gray-600 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="Phonenumber"
                  id="phonenumber"
                  placeholder="Enter Your Number"
                  value={formdata.Phonenumber}
                  onChange={handel}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">
                  Message
                </label>
                <textarea
                  name="textarea"
                  value={formdata.textarea}
                  onChange={handel}
                  placeholder="Enter Your Text Message"
                  rows={5}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
