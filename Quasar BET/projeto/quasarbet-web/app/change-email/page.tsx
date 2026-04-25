import Link from "next/link";

export default function ChangeEmail() {
  return (
    <div>
      <p>ChangeEmail</p>

        <br/>

      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/forgot-password">Forgot Password</Link></li>
        <li><Link href="/reset-password">Reset Password</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/confirm-email-change">Confirm Email Change</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
}