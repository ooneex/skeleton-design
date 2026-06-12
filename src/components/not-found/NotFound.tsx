import { Link, useRouter } from "@tanstack/react-router";
import { ArrowTriangleLineLeftIcon } from "@/icons/fill/arrows/sm/ArrowTriangleLineLeftIcon";
import { Button, buttonVariants } from "@/components/button/Button";
import { H1, Muted } from "@/components/typography";
import { NotFoundIcon } from "./NotFoundIcon";

export const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-12">
      <NotFoundIcon />
      <div className="flex flex-col items-center gap-2 text-center">
        <H1>404</H1>
        <Muted className="max-w-sm">The page you are looking for doesn't exist or has been moved.</Muted>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.history.back()}>
          <ArrowTriangleLineLeftIcon />
          Go back
        </Button>
        <Link to="/" className={buttonVariants()}>
          Go home
        </Link>
      </div>
    </div>
  );
};
