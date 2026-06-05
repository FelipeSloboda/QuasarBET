import Link from "next/link";

interface RegisterTermsFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur: () => void;
  errorMessage?: string;
}

export default function RegisterTermsField({ checked, onChange, onBlur, errorMessage }: RegisterTermsFieldProps) {
  return (
    <div>
      <div className="flex items-start gap-3 mt-2 mb-1">
        <input
          type="checkbox"
          id="terms-checkbox"
          checked={checked}
          onChange={(event) => onChange(event.currentTarget.checked)}
          onBlur={onBlur}
          className="checkbox-base"
        />
        <label htmlFor="terms-checkbox" className="text-sm leading-relaxed cursor-pointer">
          Aceito com os{" "}
          <Link href="/terms" className="link-focus underline underline-offset-2" target="_blank">
            termos e regulamentos
          </Link>
        </label>
      </div>
      {errorMessage ? <p className="text-xs text-red-400">{errorMessage}</p> : null}
    </div>
  );
}