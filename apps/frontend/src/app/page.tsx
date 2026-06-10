"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { getCurrentBackendUser } from "@/lib/api/backend";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState("Not connected");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadBackendUser() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setBackendStatus("Sign in to call the backend");
        return;
      }

      try {
        const currentUser = await getCurrentBackendUser(token);
        setBackendStatus(`Backend session: ${currentUser.email ?? currentUser.id}`);
      } catch {
        setBackendStatus("Backend session unavailable");
      }
    }

    loadBackendUser();
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      }
    }

    setIsSubmitting(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <main>
      <div className="shell">
        <section className="auth-panel">
          <div className="brand">
            <h1>RFP Tool</h1>
            <p>Upload, draft, and manage proposal responses from one authenticated workspace.</p>
          </div>

          {user ? (
            <div className="form">
              <p className="status">Signed in as {user.email}</p>
              <button className="secondary" type="button" onClick={signOut}>
                Sign out
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error ? <p className="error">{error}</p> : null}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Working..." : "Sign in or create account"}
              </button>
            </form>
          )}
        </section>

        <section className="workspace">
          <div>
            <h2>Documents</h2>
            <p className="status">{backendStatus}</p>
          </div>
          <div className="document-list">
            <article className="document-row">
              <div>
                <strong>RFP intake</strong>
                <p>Document upload and answer generation will start here.</p>
              </div>
              <button type="button">New</button>
            </article>
            <article className="document-row">
              <div>
                <strong>Response library</strong>
                <p>Reusable approved answers will be backed by Supabase.</p>
              </div>
              <button className="secondary" type="button">
                View
              </button>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
