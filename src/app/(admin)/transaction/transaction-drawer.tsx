"use client";

import * as React from "react";

import { Button } from "@/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/layout/container";

export function TransactionDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Детали транзакции</DrawerTitle>
          </DrawerHeader>
          <Container minHeight={false}>
            <div className="text-center">
              <h1 className="font-bold text-5xl">19 000$</h1>
              <Badge variant={"secondary"}>Наличные</Badge>

              <div className="w-full h-40  border-2 border-dashed flex justify-center items-center rounded-2xl mt-12 border-primary-500">
                изображение
              </div>

              <div className="bg-light-50 px-3 rounded-2xl mt-4 py-2 text-left">
                <p className="">
                  Оплата аренды авто. Клиент: Азизов А.А., Период: 01.06.2025 —
                  30.06.2025. Метод: Карта.
                </p>
              </div>
            </div>
          </Container>
          <DrawerFooter>
            <div className="flex gap-4 justify-end">
              <DrawerClose asChild>
                <Button variant="outline">Не принят</Button>
              </DrawerClose>
              <Button>Принят</Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
