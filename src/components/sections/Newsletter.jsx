import { useState } from 'react';

function Newsletter() {
  const [state, setState] = useState('idle');
  const submit = (e) => { e.preventDefault(); setState('done'); /* TODO: POST to your API */ };
  return (
    <section id="contact" className="bg-[#0F2B52] py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <h2 className="max-w-md text-3xl font-light">Get admissions insights in your inbox.</h2>
        {state === 'done' ? <p className="font-semibold text-[#19C3C7]" role="status">Thanks. Check your email to confirm.</p> : (
          <form onSubmit={submit} className="flex w-full max-w-lg gap-3">
            <label className="sr-only" htmlFor="em">Email address</label>
            <input id="em" type="email" required placeholder="name@company.com" className="w-full bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500" />
            <button className="bg-[#2F6BFF] px-6 py-3 font-semibold hover:bg-[#4a7dff]">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
