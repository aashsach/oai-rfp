"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";
import { supabase } from "@/lib/supabase/client";
import { getCurrentBackendUser } from "@/lib/api/backend";

type AuthMode = "signin" | "signup";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState("Not connected");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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

  function openAuth(mode: AuthMode) {
    setAuthMode(mode);
    setError(null);
    setIsAuthOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (authMode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        setIsAuthOpen(false);
      }
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setIsAuthOpen(false);
      }
    }

    setIsSubmitting(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <main className="landing-page">
      <header className="topbar">
        <div className="brand-mark" aria-label="RFP Tool">
          <span className="brand-icon" aria-hidden="true">
            R
          </span>
          <span>RFP Tool</span>
        </div>

        <div className="auth-actions">
          {user ? (
            <>
              <span className="signed-in-chip">Signed in as {user.email}</span>
              <Button variant="secondary" onPress={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onPress={() => openAuth("signin")}>
                Sign in
              </Button>
              <Button onPress={() => openAuth("signup")}>Sign up</Button>
            </>
          )}
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Authenticated proposal workspace</p>
          <h1>Land every RFP draft in one organized workflow.</h1>
          <p>
            Upload source documents, draft response sections, and reuse approved answers from a
            secure workspace built for proposal teams.
          </p>
          <div className="hero-actions">
            <Button size="lg" onPress={() => openAuth(user ? "signin" : "signup")}>
              {user ? "Open workspace" : "Start a workspace"}
            </Button>
            {!user ? (
              <Button size="lg" variant="secondary" onPress={() => openAuth("signin")}>
                Sign in
              </Button>
            ) : null}
          </div>
          <p className="hero-status">{backendStatus}</p>
        </div>

        <aside className="preview-panel" aria-label="Workspace preview">
          <div className="preview-header">
            <div className="preview-title">
              <strong>Proposal command center</strong>
              <span>Current workspace</span>
            </div>
            <Button size="sm" variant="secondary" onPress={() => openAuth(user ? "signin" : "signup")}>
              New RFP
            </Button>
          </div>

          <div className="preview-grid">
            <div className="metric">
              <span className="metric-value">12</span>
              <span className="metric-label">Open sections</span>
            </div>
            <div className="metric">
              <span className="metric-value">84%</span>
              <span className="metric-label">Draft coverage</span>
            </div>
            <div className="metric">
              <span className="metric-value">31</span>
              <span className="metric-label">Library matches</span>
            </div>
          </div>

          <div className="document-list">
            <article className="document-row">
              <div>
                <strong>RFP intake</strong>
                <p>Document upload and answer generation will start here.</p>
              </div>
              <Button size="sm" onPress={() => openAuth(user ? "signin" : "signup")}>
                New
              </Button>
            </article>
            <article className="document-row">
              <div>
                <strong>Response library</strong>
                <p>Reusable approved answers will be backed by Supabase.</p>
              </div>
              <Button size="sm" variant="secondary" onPress={() => openAuth(user ? "signin" : "signup")}>
                View
              </Button>
            </article>
          </div>
        </aside>
      </section>

      <section className="feature-grid" aria-label="RFP workflow features">
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Secure intake</Card.Title>
            <Card.Description>
              Keep uploads and proposal drafts tied to authenticated user sessions.
            </Card.Description>
          </Card.Header>
        </Card>
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Draft workspace</Card.Title>
            <Card.Description>
              Track sections, ownership, and backend session status from a single view.
            </Card.Description>
          </Card.Header>
        </Card>
        <Card className="feature-card">
          <Card.Header>
            <Card.Title>Reusable answers</Card.Title>
            <Card.Description>
              Prepare the response library that future CRUD endpoints will power.
            </Card.Description>
          </Card.Header>
        </Card>
      </section>

      <Modal>
        <Modal.Backdrop
          isOpen={isAuthOpen}
          onOpenChange={(open) => {
            setIsAuthOpen(open);
            if (!open) {
              setError(null);
            }
          }}
          variant="blur"
        >
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>{authMode === "signin" ? "Sign in" : "Create account"}</Modal.Heading>
                <p className="modal-subtitle">
                  {authMode === "signin"
                    ? "Use your workspace credentials to continue."
                    : "Create a workspace account with email and password."}
                </p>
              </Modal.Header>
              <Modal.Body>
                <form className="auth-form" id="auth-form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    isRequired
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  >
                    <Label>Email</Label>
                    <Input autoComplete="email" placeholder="name@company.com" />
                  </TextField>
                  <TextField
                    fullWidth
                    isRequired
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                  >
                    <Label>Password</Label>
                    <Input
                      autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                      minLength={6}
                      placeholder="At least 6 characters"
                    />
                  </TextField>
                  {error ? (
                    <TextField isInvalid>
                      <FieldError>{error}</FieldError>
                    </TextField>
                  ) : null}
                </form>
              </Modal.Body>
              <Modal.Footer className="modal-footer-stack">
                <Button
                  variant="secondary"
                  onPress={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                >
                  {authMode === "signin" ? "Create account" : "Use sign in"}
                </Button>
                <Button form="auth-form" isPending={isSubmitting} type="submit">
                  {authMode === "signin" ? "Sign in" : "Sign up"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </main>
  );
}
