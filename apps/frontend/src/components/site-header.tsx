"use client";

import NextLink from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Button, FieldError, Input, Label, Modal, TextField } from "@heroui/react";
import { supabase } from "@/lib/supabase/client";

type AuthMode = "signin" | "signup";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    <>
      <header className="topbar">
        <NextLink className="brand-mark" href="/" aria-label="RFP Tool home">
          <span className="brand-icon" aria-hidden="true">
            R
          </span>
          <span>RFP Tool</span>
        </NextLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NextLink className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </NextLink>
          ))}
        </nav>

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
    </>
  );
}
