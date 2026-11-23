"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText?: string;
}
//implemented this with AddProductform.tsx for my learning purpose
//useformstatus can be used only within a form, and it reads the status of the parent form.
// It returns an object with a pending property that is true when the form is being submitted, and false otherwise.
// This allows us to disable the button and show a loading state while the form is being submitted.
export default function SubmitButton({
  children,
  pendingText = "Saving...",
}: SubmitButtonProps) {
  //reads the status of the parent <form> - only works when rendered INSIDE a form
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? pendingText : children}
    </button>
  );
}
