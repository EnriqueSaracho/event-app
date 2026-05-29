type ErrorMessageProps = {
  title?: string;
  message?: string;
};

export function ErrorMessage({
  title = "Something went wrong",
  message = "We could not load this page. Please try again later.",
}: ErrorMessageProps) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center"
      role="alert"
    >
      <p className="font-medium text-red-800">{title}</p>
      <p className="mt-1 text-sm text-red-700">{message}</p>
    </div>
  );
}
