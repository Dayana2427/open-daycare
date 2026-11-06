"use client";

import { useId, useRef, useState, type MouseEvent } from "react";
import { currentUser } from "@/lib/data/feed";

type CreatePostTrigger = "sidebar" | "composer";

interface CreatePostModalProps {
  trigger: CreatePostTrigger;
}

interface CreatePostFormState {
  selectedKidIds: string[];
  allRoom: boolean;
  description: string;
}

const initialFormState: CreatePostFormState = {
  selectedKidIds: [],
  allRoom: false,
  description: "",
};

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function CreatePostModal({ trigger }: CreatePostModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [, setFormState] = useState<CreatePostFormState>(initialFormState);

  function openModal() {
    setFormState(initialFormState);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setFormState(initialFormState);
    triggerRef.current?.focus();
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={
          trigger === "sidebar"
            ? "mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-coral-light),var(--color-coral))] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
            : "mb-6 flex w-full items-center gap-[14px] rounded-[18px] border border-border bg-surface px-[18px] py-[14px] text-left shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
        }
        onClick={openModal}
      >
        {trigger === "sidebar" ? (
          <>
            <PlusIcon />
            Nueva publicación
          </>
        ) : (
          <>
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-coral-soft font-display text-[16px] font-semibold text-white">
              {currentUser.initial}
            </span>
            <span className="flex-1 text-[15px] text-muted">
              Compartí un momento…
            </span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-coral-wash text-coral-bright">
              <CameraIcon />
            </span>
          </>
        )}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-full max-w-[580px] overflow-hidden rounded-[24px] border border-border bg-card p-0 text-ink shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] backdrop:bg-[rgba(63,54,46,.45)]"
        onClick={handleDialogClick}
        onClose={handleClose}
      >
        <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
          <button
            type="button"
            className="text-[15px] font-bold text-muted-dark"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <span id={titleId} className="font-display text-[18px] font-semibold text-ink">
            Nueva publicación
          </span>
          <button type="button" className="text-[15px] font-extrabold text-coral-strong">
            Publicar
          </button>
        </div>
      </dialog>
    </>
  );
}
