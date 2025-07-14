// app/clients/[id]/page.tsx (for edit) or app/clients/add/page.tsx (for create)
"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "../layout/container";
import {
  getUserDetailById,
  updateUserDetail,
  registerClient,
  getUsers,
  getClientById,
  updateClient,
  updateClientWithNewAPI,
} from "@/lib/api";
import type { UserDetail, User, Client } from "@/types/user";

interface ClientFormProps {
  id?: string;
}

export default function ClientForm({ id }: ClientFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    telegram_username: "",
    username: "",
    role: "user",
    password: "",
    passport_image: null as File | null,
    drivers_license_image: null as File | null,
    contract_document_image: null as File | null,
  });

  const [clientData, setClientData] = useState<Client | null>(null);

  // Fetch existing users when creating a new client
  useEffect(() => {
    if (!id) {
      const fetchUsers = async () => {
        try {
          const usersData = await getUsers();
          setUsers(usersData);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };
      fetchUsers();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getClientById(id)
        .then((data: Client) => {
          setClientData(data);
          setForm({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            phone_number: data.phone_number || "",
            email: data.email || "",
            address: data.address || "",
            telegram_username: data.telegram_username || "",
            username: data.username || "",
            role: data.role || "user",
            password: "",
            passport_image: null,
            drivers_license_image: null,
            contract_document_image: null,
          });
        })
        .catch(() => setError("Не удалось загрузить данные клиента"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (key: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0] || null;
    handleChange(field, file);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    if (userId && userId !== "new") {
      const selectedUser = users.find((user) => user.id.toString() === userId);
      if (selectedUser) {
        setForm({
          first_name: selectedUser.first_name || "",
          last_name: selectedUser.last_name || "",
          phone_number: selectedUser.phone_number || "",
          email: "",
          address: "",
          telegram_username: selectedUser.telegram_username || "",
          username: selectedUser.username || "",
          role: selectedUser.role || "user",
          password: "",
          passport_image: null,
          drivers_license_image: null,
          contract_document_image: null,
        });
      }
    } else {
      // Reset form when no user is selected or "new" is selected
      setForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: "",
        telegram_username: "",
        username: "",
        role: "user",
        password: "",
        passport_image: null,
        drivers_license_image: null,
        contract_document_image: null,
      });
    }
  };

  const handleSubmit = async () => {
    if (!form.first_name || !form.last_name) {
      setError("Имя и фамилия обязательны");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (id) {
        // Use the new API endpoint for updating clients
        const updateData: {
          first_name: string;
          last_name: string;
          username: string;
          phone_number: string;
          email: string;
          address: string;
          telegram_username?: string;
          password?: string;
          drivers_license_image?: File;
          passport_image?: File;
          contract_document_image?: File;
        } = {
          first_name: form.first_name,
          last_name: form.last_name,
          username: form.username,
          phone_number: form.phone_number,
          email: form.email,
          address: form.address,
          telegram_username: form.telegram_username,
        };

        // Only include password if it's not empty
        if (form.password) {
          updateData.password = form.password;
        }

        // Add file fields if they exist
        if (form.drivers_license_image) {
          updateData.drivers_license_image = form.drivers_license_image;
        }
        if (form.passport_image) {
          updateData.passport_image = form.passport_image;
        }
        if (form.contract_document_image) {
          updateData.contract_document_image = form.contract_document_image;
        }

        await updateClientWithNewAPI(parseInt(id), updateData);
      } else {
        await registerClient({
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone_number,
          email: form.email,
          address: form.address,
          telegram_username: form.telegram_username,
          passport_image: form.passport_image || undefined,
          drivers_license_image: form.drivers_license_image || undefined,
          contract_document_image: form.contract_document_image || undefined,
        });
      }
      router.push("/admin/clients");
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = "text-[#A1A1A1] mb-1 block text-sm";
  const inputStyle = "w-full text-[#04070D]";

  return (
    <Container>
      <div className="space-y-5 py-5 max-w-md">
        <h1 className="text-2xl font-bold">
          {id ? "Редактировать клиента" : "Добавить нового клиента"}
        </h1>

        {!id && (
          <div>
            <Label className={labelStyle}>
              Выберите существующего пользователя
            </Label>
            <Select value={selectedUserId} onValueChange={handleUserSelect}>
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Выберите пользователя для конвертации в клиента" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Новый клиент</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.first_name} {user.last_name} ({user.username})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className={labelStyle}>Имя</Label>
          <Input
            className={inputStyle}
            value={form.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Фамилия</Label>
          <Input
            className={inputStyle}
            value={form.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Мобильный номер</Label>
          <Input
            className={inputStyle}
            value={form.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Электронная почта</Label>
          <Input
            className={inputStyle}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Адрес</Label>
          <Input
            className={inputStyle}
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Telegram-ник</Label>
          <Input
            className={inputStyle}
            value={form.telegram_username}
            onChange={(e) => handleChange("telegram_username", e.target.value)}
          />
        </div>
        <div>
          <Label className={labelStyle}>Username</Label>
          <Input
            className={inputStyle}
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Роль</Label>
          <Input
            className={inputStyle}
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
          />
        </div>

        <div>
          <Label className={labelStyle}>Пароль</Label>
          <Input
            type="password"
            className={inputStyle}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Введите новый пароль (оставьте пустым, чтобы не изменять)"
          />
        </div>

        {/* Display client's car and rental information when editing */}
        {id && clientData && (
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-lg">Информация о клиенте</h3>

            {clientData.car && (
              <div className="space-y-2">
                <h4 className="font-medium">Автомобиль:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Название:</span>{" "}
                    {clientData.car.name}
                  </div>
                  <div>
                    <span className="text-gray-600">Номер:</span>{" "}
                    {clientData.car.registration_number}
                  </div>
                  <div>
                    <span className="text-gray-600">Статус:</span>{" "}
                    {clientData.car.status}
                  </div>
                </div>
              </div>
            )}

            {clientData.rental && (
              <div className="space-y-2">
                <h4 className="font-medium">Аренда:</h4>
                <div className="text-sm">
                  <span className="text-gray-600">Дата возврата:</span>{" "}
                  {clientData.rental.rent_due_date}
                </div>
              </div>
            )}

            {clientData.car_location && (
              <div className="space-y-2">
                <h4 className="font-medium">Местоположение:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Широта:</span>{" "}
                    {clientData.car_location.latitude}
                  </div>
                  <div>
                    <span className="text-gray-600">Долгота:</span>{" "}
                    {clientData.car_location.longitude}
                  </div>
                  {clientData.car_location.address && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Адрес:</span>{" "}
                      {clientData.car_location.address}
                    </div>
                  )}
                  {clientData.car_location.timestamp && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Время:</span>{" "}
                      {clientData.car_location.timestamp}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {[
          {
            label: "Данные паспорта",
            name: "passport_image",
          },
          {
            label: "Водительские права",
            name: "drivers_license_image",
          },
          {
            label: "Документ договора",
            name: "contract_document_image",
          },
        ].map(({ label, name }) => (
          <div key={name}>
            <Label className={labelStyle}>{label}</Label>
            <div className="border border-dashed rounded-lg p-6 text-center space-y-1">
              {form[name as keyof typeof form] ? (
                <div className="space-y-2">
                  <img
                    src={URL.createObjectURL(
                      form[name as keyof typeof form] as File
                    )}
                    alt={label}
                    className="w-full h-32 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-sm text-green-600">
                    Файл загружен:{" "}
                    {(form[name as keyof typeof form] as File)?.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleChange(name, null)}
                    className="text-red-500 underline text-sm"
                  >
                    Удалить файл
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 mx-auto text-primary-500" />
                  <p>Загрузите изображение</p>
                  <p className="text-xs text-[#A1A1A1]">
                    Поддерживаемые форматы: JPEG, PNG
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, name)}
                    className="hidden"
                    id={`file-${name}`}
                  />
                  <label
                    htmlFor={`file-${name}`}
                    className="cursor-pointer text-blue-500 underline text-sm"
                  >
                    Выбрать файл
                  </label>
                </>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <div className="text-end pt-4">
          <Button
            className="bg-primary-500 rounded-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
