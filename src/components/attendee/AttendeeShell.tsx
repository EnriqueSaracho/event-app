import { AttendeeDesktopNav } from "@/components/attendee/AttendeeDesktopNav";
import { AttendeeMobileNav } from "@/components/attendee/AttendeeMobileNav";
import { AttendeeTopBar } from "@/components/attendee/AttendeeTopBar";

type AttendeeShellProps = {
  children: React.ReactNode;
  eventName?: string;
  startsOn?: string;
  endsOn?: string;
  venueName?: string;
};

export function AttendeeShell({
  children,
  eventName,
  startsOn,
  endsOn,
  venueName,
}: AttendeeShellProps) {
  return (
    <div className="flex min-h-full w-full flex-1">
      <AttendeeDesktopNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <AttendeeTopBar
          eventName={eventName}
          startsOn={startsOn}
          endsOn={endsOn}
          venueName={venueName}
        />
        <main className="flex-1 px-4 pb-20 pt-4 lg:px-8 lg:pb-8 lg:pt-6">
          {children}
        </main>
      </div>
      <AttendeeMobileNav />
    </div>
  );
}
