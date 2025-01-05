import { assets } from '@/assets/assets';
import React, { useState } from 'react';
import Image from 'next/image';

const Contact = () => {
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState(""); // success or error

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Se trimite....");
    setResultType(""); // Reset the result type before starting

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Formularul a fost trimis cu succes!");
      setResultType("success");
      event.target.reset();
    } else {
      setResult(data.message);
      setResultType("error");
      console.log("Error", data);
    }

    // Hide the message after 5 seconds
    setTimeout(() => {
      setResult("");
      setResultType("");
    }, 4000);
  };

  return (
    <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/footer-bg-color.png')] bg-no-repeat bg-center bg-[length:90%_auto]">
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Ia legătura cu mine
      </h4>
      <h2 className="text-center text-5xl font-Ovo">
        Contactează-mă
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Dacă ai întrebări, comentarii sau feedback despre munca mea, te rog să folosești formularul de mai jos.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <input
            type="text"
            placeholder="Numele tău"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="name"
          />

          <input
            type="email"
            placeholder="Emailul tău"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="email"
          />
        </div>
        <textarea
          rows="6"
          placeholder="Scrie aici"
          required
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"
          name="message"
        ></textarea>

        <button type="submit" className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500">
          Trimite <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </button>

        <p
          className={`mt-4 text-center p-3 rounded-md ${
            resultType === "success" ? "bg-green-500 text-white" : resultType === "error" ? "bg-red-500 text-white" : ""
          }`}
        >
          {result}
        </p>
      </form>
    </div>
  );
};

export default Contact;
