export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <h1 id="login-title">Developers Room<span>.</span></h1>
          <p>Welcome back! Please enter your details.</p>
        </header>

        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="name@example.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="********" />

          <button type="submit">Sign In</button>
        </form>
      </section>
    </main>
  );
}