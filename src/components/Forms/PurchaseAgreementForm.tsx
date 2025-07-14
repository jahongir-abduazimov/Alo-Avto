import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
export default function PurchaseAgreementForm() {
  const [form, setForm] = useState({
    docNumber: "",
    date: undefined as Date | undefined,
    clientFullName: "",
    passportData: "",
    registrationAddress: "",
    percentRate: "",
  });

  const handleChange = (field: keyof typeof form, value: string | Date) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const renderInput = (
    label: string,
    field: keyof typeof form,
    placeholder: string = "Введите текст"
  ) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        value={form[field] as string}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-6 mt-5 max-w-md mx-auto">
      {renderInput("Номер документа", "docNumber")}

      <div className="space-y-1">
        <Label>Выберите дату</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !form.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.date ? format(form.date, "dd.MM.yyyy") : "ДД.ММ.ГГГГ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.date}
              onSelect={(d) => handleChange("date", d!)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {renderInput("ФИО клиента", "clientFullName")}
      {renderInput(
        "Паспортные данные",
        "passportData",
        "серия, номер, кем выдан..."
      )}
      {renderInput("Адрес регистрации", "registrationAddress", "Введите адрес")}
      {renderInput("Процентная ставка", "percentRate")}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Отменить</Button>
        <Button disabled>Сохранить</Button> {/* API handle yuq */}
      </div>
    </div>
  );
}
