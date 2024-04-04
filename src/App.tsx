import { memo, useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./Dialog/Dialog";
import styles from "./home.module.css";

const App = () => {
  return (
    <>
      <main>
        <header>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              position: "relative",
              width: "max-content",
              marginBottom: "3rem",
            }}
          >
            DIALOG{" "}
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: "0",
                fontSize: "8rem",
                zIndex: -1,
                color: "var(--blue9)",
                transform: "translateY(-50%) translateX(25%)",
              }}
            >
              5
            </span>
          </h1>
          <p>A fully native HTML5 Dialog component compatible with React</p>

          <div className={styles.buttons}>
            <Unstyled />
            <Basic />
            <Animated />
            <Drawer />
          </div>

          <h2>Usage</h2>

          <pre></pre>
        </header>
      </main>
    </>
  );
};

export default App;

const Unstyled = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Unstyled</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <header>
            <h3>Using dialog element</h3>
          </header>
          <article>
            <p>This is a basic modal using the dialog element.</p>
          </article>
          <footer>
            <DialogRoot>
              <DialogTrigger asChild>
                <button>Open Inner</button>
              </DialogTrigger>
              <DialogContent>Inner</DialogContent>
            </DialogRoot>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </footer>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

const basicCss = `
.basic {
  position: fixed;
  background-color: var(--gray5);
  padding: 1rem;
  margin: auto;
  border: none;
  border-radius: 1rem;
  transition: all 0.3s ease;
  transition-property: opacity, visibility;

  &::backdrop {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }

  opacity: 0;

  &:not([open]) {
    opacity: 0;
  }

  &[open] {
    opacity: 1;
  }
}
`;

const Basic = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Basic</Button>
      </DialogTrigger>
      <DialogContent className={styles.basic}>
        <div>
          <header>
            <h3>Basic dialog</h3>
          </header>
          <article>
            <p>This is a basic modal using the dialog element.</p>
          </article>
          <footer className={styles.buttons}>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <CSSDrawer code={basicCss} title="Basic dialog CSS" />
          </footer>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

const animatedCss = `
.animated {
  background-color: var(--gray5);
  padding: 1rem;
  margin: auto;
  border: none;
  border-radius: 1rem;

  transition: all 0.3s ease;
  transition-property: opacity, visibility; /* visibility is needed for the backdrop */

  &::backdrop {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }

  will-change: transform, opacity, visibility;
  opacity: 0;

  animation: slideDownScale 0.3s ease forwards;

  &:not([open]) {
    opacity: 0;
  }

  &[open] {
    opacity: 1;
    animation: slideUpScale 0.3s ease forwards;
  }
}

@keyframes slideUpScale {
  0% {
    transform: translateY(20px) scale(0.5);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes slideDownScale {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-40px) scale(0.5);
  }
}
`;

const Animated = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Animated</Button>
      </DialogTrigger>
      <DialogContent className={styles.animated}>
        <div>
          <header>
            <h3>Animated dialog</h3>
          </header>
          <article>
            <p>This is a dialog animated using keyframes</p>
          </article>
          <footer className={styles.buttons}>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <CSSDrawer code={animatedCss} title="Animated Dialog" />
          </footer>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

const drawerCode = `
.drawer {
  position: fixed;
  background-color: var(--gray3);
  height: 100%;
  padding: 1rem;
  max-width: 100vw;
  max-height: 100%;
  width: 77ch;
  right: 0;
  top: 0;
  left: unset;
  border: none;

  transform: translateX(100%);

  transition: transform 0.3s ease;
  transition-property: visibility, transform;

  &::backdrop {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }

  &[open] {
    transform: translateX(0);
  }
}
`;

const DrawerClose = () => {
  return (
    <DialogClose asChild>
      <button className={cx(styles.drawerClose, styles.iconButton)}>
        <CloseIcon />
      </button>
    </DialogClose>
  );
};

const Drawer = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Drawer</Button>
      </DialogTrigger>
      <DialogContent className={styles.drawer}>
        <DrawerClose />
        <div>
          <header>
            <h3>Drawer dialog</h3>
          </header>
          <article>
            <p>This is a basic modal using the dialog element.</p>
          </article>
          <footer>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <CSSDrawer code={drawerCode} title="Drawer" />
          </footer>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

import { codeToHtml } from "https://esm.sh/shiki@1.0.0";
import { Button } from "./components/Button";
import { CopyIcon } from "./components/CopyIcon";
import { cx } from "@tw-classed/react";
import { CloseIcon } from "./components/CloseIcon";
import { toast } from "sonner";

const CSSDrawer = memo(({ title, code }: { title: string; code: string }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!code) return;
    codeToHtml(code.trim(), { lang: "css", theme: "dark-plus" }).then(
      (html: string) => setHtml(html)
    );
  }, [code]);

  const copy = async (text: string) => {
    const promise = navigator.clipboard.writeText(text);
    toast.promise(promise, {
      success: "Copied!",
      error: "Failed to copy",
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Show CSS</Button>
      </DialogTrigger>
      <DialogContent style={{ width: "65ch" }} className={styles.drawer}>
        <DrawerClose />
        <div>
          <header>
            <h3>CSS for {title}</h3>
          </header>
          <article>
            <p>Yes this is also using the same dialog ;)</p>

            <div className={styles.codeContainer}>
              <button
                onClick={() => copy(code?.trim())}
                className={cx(styles.copy, styles.iconButton)}
              >
                <CopyIcon />
              </button>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </article>
          <footer>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </footer>
        </div>
      </DialogContent>
    </DialogRoot>
  );
});
