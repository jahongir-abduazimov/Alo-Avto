"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { registerUser } from "@/lib/api";
import type { RegisterUserPayload } from "@/types/registerUser";

export default function AddClientForm() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [form, setForm] = useState<RegisterUserPayload>({
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    telegram_username: "",
  });

  const handleChange = (field: keyof RegisterUserPayload, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const response = await registerUser(formData);
      console.log("API Response:", response);

      // Use the response data instead of form data
      setShowAlert({
        username: response.username || form.username,
        password: response.password || form.password,
      });
    } catch (err: unknown) {
      let message = "Ошибка при регистрации пользователя";
      if (err instanceof Error) message = err.message;
      console.error(message);
    }
  };

  const resetForm = () => {
    setForm({
      username: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      telegram_username: "",
    });
  };

  const inputBase =
    "bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400";
  const labelBase = "text-xs text-gray-500 font-medium";

  return (
    <div>
      <div className="py-4">
        <div className="flex items-center mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-3 h-9 w-9 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">
            Добавление пользователя
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-3.5 text-sm">
        {[
          { field: "username", label: "Логин", placeholder: "Введите логин" },
          { field: "first_name", label: "Имя", placeholder: "Введите имя" },
          {
            field: "last_name",
            label: "Фамилия",
            placeholder: "Введите фамилию",
          },
          {
            field: "phone_number",
            label: "Мобильный номер",
            placeholder: "Введите номер телефона",
          },
          { field: "email", label: "Email", placeholder: "Введите email" },
          {
            field: "telegram_username",
            label: "Telegram",
            placeholder: "Введите telegram username",
          },
          { field: "password", label: "Пароль", placeholder: "Введите пароль" },
          {
            field: "password2",
            label: "Подтвердите пароль",
            placeholder: "Введите пароль еще раз",
          },
        ].map(({ field, label, placeholder }) => (
          <div key={field} className="space-y-1.5">
            <Label className={labelBase}>{label}</Label>
            <Input
              value={form[field as keyof RegisterUserPayload]}
              onChange={(e) =>
                handleChange(field as keyof RegisterUserPayload, e.target.value)
              }
              className={cn(inputBase, "h-11")}
              type={
                field.toLowerCase().includes("password") ? "password" : "text"
              }
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 p-4 border-t border-gray-200 bg-white">
        <Button
          onClick={handleSubmit}
          className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-medium"
        >
          Сохранить
        </Button>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Пользователь успешно добавлен!
              </h3>
              <p className="text-sm text-gray-600">
                Сохраните эти данные для входа в систему
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Логин</p>
                  <p className="font-mono font-semibold text-gray-900">
                    {showAlert.username}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(showAlert.username);
                    // Show brief feedback
                    const btn = event?.target as HTMLElement;
                    if (btn) btn.textContent = "✓";
                    setTimeout(() => {
                      if (btn)
                        btn.innerHTML =
                          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
                    }, 1000);
                  }}
                  className="h-8 w-8"
                >
                  <Copy size={16} />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Пароль</p>
                  <p className="font-mono font-semibold text-gray-900">
                    {showAlert.password}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(showAlert.password);
                    // Show brief feedback
                    const btn = event?.target as HTMLElement;
                    if (btn) btn.textContent = "✓";
                    setTimeout(() => {
                      if (btn)
                        btn.innerHTML =
                          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
                    }, 1000);
                  }}
                  className="h-8 w-8"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Логин: ${showAlert.username}\nПароль: ${showAlert.password}`
                  );
                  setShowAlert(null);
                  resetForm();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Копировать все
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
