import ErrorState from "@/components/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      message="The page you are looking for does not exist."
    />
  );
}
