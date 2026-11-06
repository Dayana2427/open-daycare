"use client";

import { useRef, useState, type FormEvent, type MouseEvent } from "react";

type ParentRelation = "mother" | "father" | "guardian";

interface LinkParentFormState {
  name: string;
  email: string;
  relation: ParentRelation;
}

const initialFormState: LinkParentFormState = {
  name: "",
  email: "",
  relation: "mother",
};

const relationOptions: { value: ParentRelation; label: string }[] = [
  { value: "mother", label: "Mamá" },
  { value: "father", label: "Papá" },
  { value: "guardian", label: "Tutor/a" },
];

const INVITATION_CODE = "7K4P9";
const INVITATION_EXPIRY_LABEL = "Vence en 7 días";

interface LinkParentModalProps {
  childName: string;
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[1px] flex-none"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function SendIcon() {
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
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function LinkParentModal({ childName }: LinkParentModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formState, setFormState] = useState<LinkParentFormState>(initialFormState);
  const childFirstName = childName.trim().split(/\s+/)[0];

  function openModal() {
    setFormState(initialFormState);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    closeModal();
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
        className="flex items-center gap-3 pt-2"
        onClick={openModal}
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-photo-ink">
          <PlusIcon />
        </span>
        <span className="text-[14.5px] font-extrabold text-coral-dark">
          Vincular otro padre
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="link-parent-modal-title"
        className="m-auto w-full max-w-[480px] overflow-hidden rounded-[24px] border border-border bg-card p-0 text-ink shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] backdrop:bg-[rgba(63,54,46,.45)]"
        onClick={handleDialogClick}
        onClose={handleClose}
      >
        <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
          <div>
            <div
              id="link-parent-modal-title"
              className="font-display text-[18px] font-semibold text-ink"
            >
              Vincular padre
            </div>
            <div className="text-[13px] text-muted">a {childName}</div>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-border-soft text-muted-dark"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </div>

        <form className="px-[26px] py-[22px]" onSubmit={handleSubmit}>
          <div className="mb-5 flex gap-[11px] rounded-[14px] bg-info-bg px-4 py-[13px]">
            <span className="text-info-accent">
              <InfoIcon />
            </span>
            <span className="text-[13.5px] leading-[1.45] text-info-ink">
              Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {childFirstName}.
            </span>
          </div>

          <label
            htmlFor="link-parent-name"
            className="mb-2 block text-[12px] font-extrabold tracking-[.7px] text-muted-dark"
          >
            NOMBRE DEL PADRE/MADRE
          </label>
          <input
            id="link-parent-name"
            name="parentName"
            type="text"
            required
            autoComplete="name"
            placeholder="Ej. Diego Fernández"
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-placeholder"
          />

          <label
            htmlFor="link-parent-email"
            className="mb-2 block text-[12px] font-extrabold tracking-[.7px] text-muted-dark"
          >
            EMAIL
          </label>
          <input
            id="link-parent-email"
            name="parentEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({ ...current, email: event.target.value }))
            }
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-placeholder"
          />

          <div
            role="group"
            aria-labelledby="link-parent-relation-label"
            className="mb-5"
          >
            <div
              id="link-parent-relation-label"
              className="mb-[10px] text-[12px] font-extrabold tracking-[.7px] text-muted-dark"
            >
              PARENTESCO
            </div>
            <div className="flex gap-[9px]">
              {relationOptions.map((relation) => {
                const isSelected = formState.relation === relation.value;

                return (
                  <button
                    key={relation.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setFormState((current) => ({
                        ...current,
                        relation: relation.value,
                      }))
                    }
                    className={`flex-1 rounded-full border-[1.5px] p-[11px] text-[14px] font-extrabold ${
                      isSelected
                        ? "border-relation-active-border bg-relation-active-bg text-info-accent"
                        : "border-border bg-surface text-nav"
                    }`}
                  >
                    {relation.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-invite-border bg-consent-bg p-[18px] text-center">
            <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-invite-label">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-display text-[34px] font-semibold tracking-[7px] text-consent-ink">
              {INVITATION_CODE}
            </div>
            <div className="mt-[6px] text-[13px] text-invite-label">
              {INVITATION_EXPIRY_LABEL}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-[linear-gradient(180deg,var(--color-coral-light),var(--color-coral))] p-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
          >
            <SendIcon />
            Enviar invitación
          </button>
        </form>
      </dialog>
    </>
  );
}
