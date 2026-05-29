import { BottomNav } from "@/components/attendee/BottomNav";
import { DemoVisitorProvider } from "@/lib/demo-visitor/DemoVisitorProvider";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoVisitorProvider>
      <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col">
        <main className="flex-1 px-4 pb-24 pt-6">{children}</main>
        <BottomNav />
      </div>
    </DemoVisitorProvider>
  );
}
