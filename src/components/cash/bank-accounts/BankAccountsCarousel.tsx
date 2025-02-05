import type { BankAccount } from "@/server/infrastructure/models/bank-account.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BankAccountsCarousel({
  bankAccounts,
}: {
  bankAccounts: BankAccount[];
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {bankAccounts.map((bankAccount) => (
          <CarouselItem key={bankAccount.id}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{bankAccount.name}</CardTitle>
                  <CardDescription>
                    {bankAccount.isUSD ? "USD Account" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-start p-6">
                  Balance: {bankAccount.balance}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
