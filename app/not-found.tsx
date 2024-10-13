import { InfoBlock } from "@/components/shared";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InfoBlock
        title="Страница не найдена"
        text="Проверьте корректность введённого адреса или повторите попытку позже"
        imageUrl="/assets/images/notFound.png"
      />
    </div>
  );
}
