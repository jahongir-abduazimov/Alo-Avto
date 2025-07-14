"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role == "manager") {
      router.push("/admin");
    } else if (user.role == "user") {
      router.push("/customer");
    } else {
      router.push("/");
    }
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(username, password);
      console.log(res);
      // Tokenlarni localStorage ga yozish
      localStorage.setItem("access_token", res.tokens.access);
      localStorage.setItem("refresh_token", res.tokens.refresh);
      localStorage.setItem("user", JSON.stringify(res.user));

      document.cookie = `access_token=${res.tokens.access}; path=/`;
      document.cookie = `user_role=${res.user.role}; path=/`;

      if (res.user.role === "user") {
        router.push("/customer");
      } else {
        router.push("/admin");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Login xatolik");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3563E9]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-bold text-xl text-[#3563E9]">АЛО АВТО</span>
        </div>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          Добро пожаловать{" "}
          <span className="capitalize">{username || "Гость"}</span>
          <span>👋</span>
        </h2>
        <p className="text-gray-400 mb-4">Пожалуйста, войдите в систему</p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label>Логин</Label>
            <Input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div>
            <Label>Пароль</Label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                className="accent-[#3563E9]"
              />
              Запомнить меня
            </label>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-[#3563E9] text-white rounded-full py-2 mt-2"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
