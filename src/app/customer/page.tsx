"use client";
import HeaderDashboard from "@/components/dashboard/header";
import { Icon } from "@/components/icon";
import { isTMA, init, viewport } from "@telegram-apps/sdk";
import Container from "@/components/layout/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import TypographyH1 from "@/components/ui/typography-h1";
import {
  AlertCircle,
  ArrowRight,
  CircleAlert,
  Files,
  RefreshCw,
  Route,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api";
import { UserProfileResponse } from "@/types/user";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AddToHomePrompt from "@/components/AddHomePrompt";

interface PaymentDisplay {
  number: string;
  date: string;
  name: string;
  car: string;
  amount: string;
  status: string;
}

export default function CustomerDashboard() {
  // Move all hooks to the top
  const [upcomingPayments, setUpcomingPayments] = useState<PaymentDisplay[]>(
    []
  );
  const [fines, setFines] = useState<PaymentDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCarImage, setUserCarImage] = useState<string>(
    "/images/car-tesla.png"
  ); // Default fallback
  const [userName, setUserName] = useState<string>("");
  const [geoDenied, setGeoDenied] = useState(false);
  const [geoLoading, setGeoLoading] = useState(true);
  const [geoCoords, setGeoCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Telegram initialization
  useEffect(() => {
    async function initTg() {
      if (await isTMA()) {
        init();
        const width = window.innerWidth;
        if (width <= 1024) {
          // Telefon va planshet
          if (viewport.mount.isAvailable()) {
            await viewport.mount();
            viewport.expand();
          }
          if (viewport.requestFullscreen.isAvailable()) {
            await viewport.requestFullscreen();
          }
        }
        // Desktop uchun hech narsa qilinmaydi
      }
    }
    initTg();
  }, []);

  // Geolocation logic
  useEffect(() => {
    function requestGeolocation() {
      setGeoLoading(true);
      if (!navigator.geolocation) {
        setGeoDenied(true);
        setGeoLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGeoDenied(false);
          setGeoLoading(false);
        },
        (err) => {
          setGeoDenied(true);
          setGeoLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
    requestGeolocation();
  }, []);

  // User data fetching - only run when geolocation is not denied and not loading
  useEffect(() => {
    if (geoLoading || geoDenied) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const profileData: UserProfileResponse = await getUserProfile();
        const user = profileData.user;
        const rentals = user.rentals;

        // Set user name
        const fullName = `${user.first_name}`;
        setUserName(fullName);

        // Get user's car image from their active rental
        if (rentals.length > 0) {
          const activeRental = rentals.find(
            (r) => r.status === "handed_over" || r.is_paid === false
          );
          if (activeRental?.car_id) {
            try {
              const { fetchCarById } = await import("@/lib/api");
              const carDetails = await fetchCarById(activeRental.car_id);
              if (carDetails.image) {
                setUserCarImage(carDetails.image);
              }
            } catch (error) {
              console.error("Error fetching car image:", error);
              // Keep default image if car details fetch fails
            }
          }
        }

        // Process upcoming payments from monthly payments
        const upcomingPaymentsList: PaymentDisplay[] = [];
        const finesList: PaymentDisplay[] = [];
        const currentDate = new Date();

        rentals.forEach((rental) => {
          if (rental.monthly_payments) {
            // Check if user has a full and confirmed payment
            const hasFullConfirmedPayment = profileData.user.payments?.some(
              (payment) =>
                payment.type === "full" &&
                payment.status === "confirmed" &&
                payment.rental_id === rental.id
            );

            // If user has full and confirmed payment, skip showing upcoming payments for this rental
            if (hasFullConfirmedPayment) {
              return;
            }

            rental.monthly_payments.forEach((monthlyPayment) => {
              const paymentDate = new Date(monthlyPayment.date);
              const isOverdue =
                paymentDate < currentDate && !monthlyPayment.is_paid;
              const isUpcoming =
                paymentDate >= currentDate &&
                !monthlyPayment.is_paid &&
                monthlyPayment.payment_status !== "confirmed";

              if (isUpcoming) {
                upcomingPaymentsList.push({
                  number: `Month ${monthlyPayment.month_number}`,
                  date: paymentDate.toLocaleDateString("ru-RU"),
                  name: fullName,
                  car: rental.car_name || "N/A",
                  amount: monthlyPayment.amount.toString(),
                  status: monthlyPayment.payment_status,
                });
              } else if (isOverdue) {
                finesList.push({
                  number: `Month ${monthlyPayment.month_number}`,
                  date: paymentDate.toLocaleDateString("ru-RU"),
                  name: fullName,
                  car: rental.car_name || "N/A",
                  amount: monthlyPayment.amount.toString(),
                  status: "overdue",
                });
              }
            });
          }
        });

        setUpcomingPayments(upcomingPaymentsList);
        setFines(finesList);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to empty arrays if API fails
        setUpcomingPayments([]);
        setFines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [geoLoading, geoDenied]);

  // Retry handler
  const handleRetryGeo = () => {
    setGeoDenied(false);
    setGeoLoading(true);
    if (!navigator.geolocation) {
      setGeoDenied(true);
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoDenied(false);
        setGeoLoading(false);
      },
      (err) => {
        setGeoDenied(true);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Render loading state for geolocation
  if (geoLoading) {
    return (
      <Container padding={false}>
        <Container className="pb-12">
          <HeaderDashboard />
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Локация текширилмоқда...</div>
          </div>
        </Container>
      </Container>
    );
  }

  // Render geolocation denied dialog
  if (geoDenied) {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogTitle>Локацияга рухсат берилмади</AlertDialogTitle>
          <AlertDialogDescription>
            Иловани фойдаланиш учун жойлашувингизни аниқлашга рухсат беринг.
          </AlertDialogDescription>
          <AlertDialogAction asChild>
            <Button onClick={handleRetryGeo} className="w-full">
              Қайта уруниш
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Render loading state for user data
  if (loading) {
    return (
      <Container padding={false}>
        <Container className="pb-12">
          <HeaderDashboard />
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Загрузка...</div>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <Container padding={false}>
      <Container className="pb-12 pt-12">
        <HeaderDashboard />
        <div className="flex  items-center justify-between">
          <h1 className="font-bold text-3xl">Hush kelibsiz, {userName}</h1>
          <div className="bg-primary-50 h-full py-1.5 items-center gap-2 px-3  flex rounded-md text-primary-500">
            <Files size={16} />
            <span>Док</span>
          </div>
          <div className="bg-primary-50 h-full items-center gap-2 px-3 py-1.5  flex rounded-md text-primary-500">
            <CircleAlert className="text-primary-500" size={16} />
            <span>Штраф</span>
          </div>
        </div>
        <div className="mt-5 grid h-[90px]  grid-cols-4 gap-3">
          <div className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(88.46%_78.57%_at_67.53%_72.08%,_#074446_17.49%,_#48CD44_100%)]">
            <span className="text-[9px] font-semibold">Просрочка</span>
            <AlertCircle className="absolute bottom-4 right-4" />
          </div>
          <div className=" relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#224462_17.49%,_#2CB391_100%)]">
            <span className="text-[9px] font-semibold">возврат</span>
            <RefreshCw className="absolute bottom-4 right-4" />
          </div>
          <Link
            href={"/customer/close"}
            className=" col-span-2 w-full relative text-white  rounded-xl px-2 bg-[radial-gradient(63.25%_56.19%_at_69.59%_68.04%,_#F4BB34_17.49%,_#EC6B1D_100%)]"
          >
            <span className="text-[9px] font-semibold">Закрите</span>
            <Route className="absolute bottom-4 right-4" />
          </Link>
        </div>
        <div className="aspect-4/3 relative border-2 mt-5 border-gray-200 rounded-xl overflow-hidden">
          <Image src={userCarImage} className="object-contain" alt="" fill />
        </div>
        <Link
          href={"/customer/payment"}
          className="mt-5 p-3 rounded-2xl bg-primary-100 flex justify-between items-center"
        >
          <Icon name="favorite" size={34} />
          <span className="font-medium text-base">Оплата</span>
          <div className="bg-black text-white size-8 rounded-full flex justify-center items-center">
            <ArrowRight />
          </div>
        </Link>
        <div className="mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Ближайшие оплаты
              </h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Номер
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                    Дата оплаты
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                    Фио
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Авто
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Сумма
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingPayments.length > 0 ? (
                  upcomingPayments.map((payment, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
                    >
                      <TableCell className="font-medium text-gray-900 px-4 py-4 text-sm">
                        {payment.number}
                      </TableCell>
                      <TableCell className="text-gray-700 px-2 py-4 text-sm">
                        {payment.date}
                      </TableCell>
                      <TableCell className="text-gray-700 px-2 py-4 text-sm">
                        {payment.name}
                      </TableCell>
                      <TableCell className="text-gray-700 px-4 py-4 text-sm">
                        {payment.car}
                      </TableCell>
                      <TableCell className="text-gray-700 px-4 py-4 text-sm">
                        ${payment.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      Нет предстоящих платежей
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Мои Штрафы{" "}
              </h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Номер
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                    Дата оплаты
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-2 py-3">
                    Фио
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Авто
                  </TableHead>
                  <TableHead className="text-gray-500 font-normal text-sm px-4 py-3">
                    Сумма
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fines.length > 0 ? (
                  fines.map((payment, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50"
                    >
                      <TableCell className="font-medium text-gray-900 px-4 py-4 text-sm">
                        {payment.number}
                      </TableCell>
                      <TableCell className="text-gray-700 px-2 py-4 text-sm">
                        {payment.date}
                      </TableCell>
                      <TableCell className="text-gray-700 px-2 py-4 text-sm">
                        {payment.name}
                      </TableCell>
                      <TableCell className="text-gray-700 px-4 py-4 text-sm">
                        {payment.car}
                      </TableCell>
                      <TableCell className="text-gray-700 px-4 py-4 text-sm">
                        ${payment.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      Нет штрафов
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
    </Container>
  );
}
